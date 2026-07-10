# ============================================================================
# NewCamp Reports API Queries - R Implementation
# ============================================================================
# This script demonstrates how to query the report endpoints from the 
# Django REST API using R's httr and readr packages

# Install required packages (uncomment if needed)
# install.packages("httr")
# install.packages("readr")
# install.packages("tidyverse")

library(httr)
library(readr)
library(tidyverse)  # Optional: for data manipulation

# ============================================================================
# API Configuration
# ============================================================================

BASE_URL <- "http://127.0.0.1:8000/api/reports"  # Update if server is on different host
DELIMITER <- ";"  # Reports use semicolon delimiter

# ============================================================================
# Helper Function: Download Report as Data Frame
# ============================================================================

get_report <- function(report_type, acronym = NULL) {
  """
  Download a report from the API and return as data frame
  
  Args:
    report_type: One of 'fauna', 'lengths', 'hauls', 'hydrography', 'species'
    acronym: Survey acronym (required for all except 'species')
    
  Returns:
    Data frame containing the report data
  """
  
  # Build URL
  if (report_type == "species") {
    url <- paste0(BASE_URL, "/species/")
  } else {
    if (is.null(acronym)) {
      stop(paste("acronym required for", report_type, "report"))
    }
    url <- paste0(BASE_URL, "/", report_type, "/", acronym, "/")
  }
  
  cat("Downloading from:", url, "\n")
  
  # Make GET request
  response <- GET(url)
  
  # Check if request was successful
  if (status_code(response) != 200) {
    stop(paste("API Error:", status_code(response), content(response, as = "text")))
  }
  
  # Parse CSV content (using semicolon delimiter)
  content_text <- content(response, as = "text", encoding = "UTF-8")
  
  # Read as data frame
  df <- read_delim(
    content_text,
    delim = DELIMITER,
    col_types = cols(.default = col_character())  # Read all as character first
  )
  
  cat("Downloaded", nrow(df), "rows,", ncol(df), "columns\n")
  return(df)
}

# ============================================================================
# Query Examples
# ============================================================================

# 1. Get Fauna Report
fauna_report <- get_report("fauna", acronym = "PQ2023")
head(fauna_report)

# 2. Get Lengths Report
lengths_report <- get_report("lengths", acronym = "PQ2023")
head(lengths_report)

# 3. Get Hauls Report
hauls_report <- get_report("hauls", acronym = "PQ2023")
head(hauls_report)

# 4. Get Hydrography Report
hydro_report <- get_report("hydrography", acronym = "PQ2023")
head(hydro_report)

# 5. Get Species Report (no acronym needed)
species_report <- get_report("species")
head(species_report)

# ============================================================================
# Data Processing Examples
# ============================================================================

# Example: Convert numeric columns in fauna report
fauna_processed <- fauna_report %>%
  mutate(
    LANCE = as.integer(LANCE),
    GRUPO = as.integer(GRUPO),
    ESP = as.integer(ESP),
    PESO_GR = as.integer(PESO_GR),
    NUMERO = as.integer(NUMERO)
  )

# Example: Filter hauls by sector
hauls_sector1 <- hauls_report %>%
  filter(SECTOR == 1)

# Example: Aggregate catches by species
fauna_by_species <- fauna_report %>%
  group_by(ESP) %>%
  summarise(
    total_weight = sum(as.numeric(PESO_GR), na.rm = TRUE),
    catches = n()
  ) %>%
  arrange(desc(total_weight))

# ============================================================================
# Export Results
# ============================================================================

# Save to CSV
write_csv(fauna_processed, "fauna_report_processed.csv")

# Save to Excel (requires openxlsx package)
# install.packages("openxlsx")
# openxlsx::write.xlsx(list(
#   fauna = fauna_processed,
#   hauls = hauls_report,
#   species = species_report
# ), "NewCamp_Reports.xlsx")

# ============================================================================
# Advanced: Batch Download Multiple Survey Reports
# ============================================================================

# List of survey acronyms to download
survey_acronyms <- c("PQ2023", "PQ2024")  # Update with actual survey codes
report_types <- c("fauna", "lengths", "hauls", "hydrography")

# Batch download (warning: may take time for large datasets)
all_reports <- list()

for (acronym in survey_acronyms) {
  for (report_type in report_types) {
    tryCatch({
      cat("\nDownloading", report_type, "for", acronym, "...\n")
      key <- paste(acronym, report_type, sep = "_")
      all_reports[[key]] <- get_report(report_type, acronym = acronym)
    }, error = function(e) {
      cat("Error downloading", report_type, "for", acronym, ":", e$message, "\n")
    })
  }
}

# Access individual reports
# all_reports$PQ2023_fauna
# all_reports$PQ2023_hauls

# ============================================================================
# Using httr2 package (modern alternative to httr)
# ============================================================================

# install.packages("httr2")
# library(httr2)

# req <- request(BASE_URL) %>%
#   req_url_path_append("fauna") %>%
#   req_url_path_append("PQ2023") %>%
#   req_perform()
# 
# fauna_data <- resp_body_string(req) %>%
#   read_delim(delim = DELIMITER)
