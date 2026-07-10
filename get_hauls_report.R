# ============================================================================
# NewCamp Hauls Report API Query - R Function
# ============================================================================
# Simple, focused function to query the hauls report endpoint

library(httr)
library(readr)

# ============================================================================
# Get Hauls Report
# ============================================================================

get_hauls_report <- function(acronym, base_url = "http://127.0.0.1:8000") {
  """
  Download the hauls report from the API for a given survey
  
  Args:
    acronym: Survey acronym (e.g., "PQ2023")
    base_url: API server URL (default: local development server)
    
  Returns:
    Data frame containing hauls report with columns:
      LANCE, FECHA, ARTE, VALIDEZ, HORA_L, LATITUD_L, NSL, LONGITUD_L, EWL,
      PROF_L, HORA_V, LATITUD_V, NSV, LONGITUD_V, EWV, PROF_V, RUMBO,
      VELOCIDAD, CABLE, MALLETAS, DISTA_P, ABERT_H, ABERT_V, CUADRICULA,
      RECORRIDO, DIR_VIENTO, VEL_VIENTO, EST_MAR, SECTOR, ESTRATO, TEMP,
      SALI, ESTN, OBSERV
    
  Examples:
    # Get hauls for survey PQ2023
    hauls <- get_hauls_report("PQ2023")
    head(hauls)
    
    # Get hauls from remote server
    hauls <- get_hauls_report("PQ2023", base_url = "http://example.com")
  """
  
  # Build URL
  url <- paste0(base_url, "/api/reports/hauls/", acronym, "/")
  
  cat("Fetching hauls report from:", url, "\n")
  
  # Make GET request
  response <- GET(url)
  
  # Check if request was successful
  if (status_code(response) != 200) {
    stop(paste("API Error:", status_code(response), "\n", content(response, as = "text")))
  }
  
  # Parse CSV content (using semicolon delimiter)
  content_text <- content(response, as = "text", encoding = "UTF-8")
  
  # Read as data frame
  hauls_df <- read_delim(
    content_text,
    delim = ";",
    col_types = cols(.default = col_character())
  )
  
  cat("✓ Downloaded", nrow(hauls_df), "hauls with", ncol(hauls_df), "columns\n")
  
  return(hauls_df)
}

# ============================================================================
# Usage Examples
# ============================================================================

# Example 1: Basic query
hauls <- get_hauls_report("PQ2023")
head(hauls)

# Example 2: View column names
names(hauls)

# Example 3: Data types
str(hauls)

# Example 4: Filter by sector
hauls_sector_1 <- hauls %>%
  filter(SECTOR == "1")

# Example 5: Filter by validity
valid_hauls <- hauls %>%
  filter(VALIDEZ == "1")

# Example 6: Basic statistics
hauls_summary <- hauls %>%
  summarise(
    total_hauls = n(),
    valid_hauls = sum(VALIDEZ == "1", na.rm = TRUE),
    invalid_hauls = sum(VALIDEZ == "0", na.rm = TRUE)
  )

# Example 7: Group by sector
hauls_by_sector <- hauls %>%
  group_by(SECTOR) %>%
  summarise(
    count = n(),
    avg_depth_shooting = mean(as.numeric(PROF_L), na.rm = TRUE),
    avg_depth_hauling = mean(as.numeric(PROF_V), na.rm = TRUE)
  )

# Example 8: Export to CSV
write_csv(hauls, "hauls_report_PQ2023.csv")

# Example 9: Export to Excel
# install.packages("openxlsx")
# openxlsx::write.xlsx(hauls, "hauls_report_PQ2023.xlsx")
