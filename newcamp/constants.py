"""
Shared constants and configuration for the NewCamp project
"""

# ============================================================================
# SECTORS
# ============================================================================
# Maps sector IDs to their names (geographic regions)
SECTORS = {
    1: "MIÑO-FINISTERRE",
    2: "FINISTERRE-ESTA",
    3: "ESTACA-PEÑAS",
    4: "PEÑAS-AJO",
    5: "AJO-BIDASOA"
}

# Reverse mapping: sector name to ID
SECTORS_REVERSE = {v: k for k, v in SECTORS.items()}

# List of sector IDs (for iteration)
SECTOR_IDS = [1, 2, 3, 4, 5]

# List of sector names (for iteration)
SECTOR_NAMES = list(SECTORS.values())


# ============================================================================
# DEPTHS
# ============================================================================
# Depth categories and their ranges
DEPTH_CODES = ["A", "B", "C", "D", "E"]
DEPTH_RANGES = [
    "70-120",
    "120-200",
    "200-500",
    "without depth 1",
    "without depth 2"
]

# Depth mapping: code to range
DEPTHS = {code: depth_range for code, depth_range in zip(DEPTH_CODES, DEPTH_RANGES)}

DEPTHS_REVERSE = {v: k for k, v in DEPTHS.items()}
