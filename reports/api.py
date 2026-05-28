import csv
import pandas as pd
import numpy as np

from typing import List, Tuple, Optional, Any
from django.http import HttpResponse
from rest_framework.views import APIView

from species.models import MeasurementType

from .config import ColumnConfig, ReportConfig, REPORT_CONFIGS 


def get_column_value(row, col_config: ColumnConfig) -> Any:
    """Extract value from row based on column configuration"""
    # If no df_column specified, use default value
    if col_config.df_column is None:
        return col_config.default
    
    # Get value from row, use default if not present
    value = getattr(row, col_config.df_column, col_config.default)
    
    # Apply transformation if provided
    if col_config.transform:
        value = col_config.transform(value)
    
    # Cast type if needed
    if col_config.cast and value is not None:
        try:
            value = col_config.cast(value)
        except (ValueError, TypeError):
            value = col_config.default
    
    return value


def generate_csv_response(filename: str, headers: List[str]) -> Tuple[HttpResponse, csv.writer]:
    """Generate HTTP response and CSV writer for streaming"""
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    writer = csv.writer(response, delimiter=';')
    writer.writerow(headers)
    return response, writer


def process_report_data(config: ReportConfig, acronym: Optional[str] = None) -> pd.DataFrame:
    """
    Process data according to report configuration
    """

    # Get data using the configured getter function
    if config.data_getter:
        if acronym:
            merged_df = config.data_getter(acronym, **config.data_getter_kwargs)
        else:
            merged_df = config.data_getter(**config.data_getter_kwargs)
              
    # Post-processing if needed
    if config.post_process:
        merged_df = config.post_process(merged_df)
    
    return merged_df


# ============================================================================
# API VIEWS (Refactored)
# ============================================================================

class ReportCampFaunaCSVApi(APIView):

    def get(self, request, acronym):
        config = REPORT_CONFIGS['fauna']
        headers = [col.csv_header for col in config.columns]
        response, writer = generate_csv_response('report.csv', headers)
        
        merged_df = process_report_data(config, acronym)
        
        # Group and aggregate (fauna-specific logic)
        grouped_df = merged_df.groupby(['acronym', 'station', 'haul', 'group', 'sp_code', 'category']).agg({
            'weight': 'first',
            'not_measured_individuals': 'first',
            'number_individuals': 'sum',
            'sampled_weight': 'first'
        }).reset_index()
        
        # Calculate individuals with scaling
        needs_scaling = (
            pd.notnull(grouped_df['sampled_weight']) &
            (grouped_df['sampled_weight'] != 0) &
            (grouped_df['sampled_weight'] != grouped_df['weight']) &
            pd.notnull(grouped_df['number_individuals'])
        )
        
        has_measured = pd.notnull(grouped_df['number_individuals'])
        
        grouped_df['individuals'] = np.where(
            needs_scaling,
            (grouped_df['number_individuals'] *
             (grouped_df['weight'] / grouped_df['sampled_weight'])).round(),
            np.where(
                has_measured,
                grouped_df['number_individuals'].round(),
                grouped_df['not_measured_individuals'].fillna(0)
            )
        )
        
        grouped_df['individuals'] = grouped_df['individuals'].fillna(0).astype(int)
        
        grouped_df = grouped_df.groupby(['acronym', 'station', 'haul', 'group', 'sp_code']).agg({
            'weight': 'sum',
            'not_measured_individuals': 'first',
            'individuals': 'sum'
        }).reset_index()
        
        # Write rows using configuration
        for row in grouped_df.itertuples(index=False):
            row_data = [get_column_value(row, col) for col in config.columns]
            writer.writerow(row_data)
        
        return response


class ReportCampLengthsCSVApi(APIView):
    def get(self, request, acronym):
        config = REPORT_CONFIGS['lengths']
        headers = [col.csv_header for col in config.columns]
        response, writer = generate_csv_response('report.csv', headers)
        
        merged_df = process_report_data(config, acronym)
        
        # Get measurements
        measurements = MeasurementType.objects.all()
        measurements_df = pd.DataFrame(list(measurements.values()))
        
        merged_df = pd.merge(merged_df, measurements_df, left_on='measurement_type_id', right_on='id', how='left',
                             suffixes=('', '_measurement'))
        
        merged_df['length_converted'] = (merged_df['length'].fillna(0) / merged_df['conversion_factor']).fillna(0)
        merged_df['number_individuals'] = merged_df['number_individuals'].fillna(0)
        merged_df['sampled_weight'] = np.where(
            merged_df['sampled_weight'].isnull(),
            merged_df['weight'].fillna(0).astype(int),
            merged_df['sampled_weight'].fillna(0).astype(int)
        )
        
        # Write rows using configuration
        for row in merged_df.itertuples(index=False):
            row_data = [get_column_value(row, col) for col in config.columns]
            writer.writerow(row_data)
        
        return response


class ReportCampHaulsCSVApi(APIView):
    def get(self, request, acronym):
        config = REPORT_CONFIGS['hauls']
        headers = [col.csv_header for col in config.columns]
        response, writer = generate_csv_response('report.csv', headers)
        
        merged_df = process_report_data(config, acronym)
        
        # Write rows using configuration
        for row in merged_df.itertuples(index=False):
            row_data = [get_column_value(row, col) for col in config.columns]
            writer.writerow(row_data)
        
        return response


class ReportCampHydrographyCSVApi(APIView):
    def get(self, request, acronym):
        config = REPORT_CONFIGS['hydrography']
        headers = [col.csv_header for col in config.columns]
        response, writer = generate_csv_response('report.csv', headers)
        
        merged_df = process_report_data(config, acronym)
        
        # Write rows using configuration
        for row in merged_df.itertuples(index=False):
            row_data = [get_column_value(row, col) for col in config.columns]
            writer.writerow(row_data)
        
        return response
    

class ReportCampSpeciesCSVApi(APIView):
    def get(self, request):
        config = REPORT_CONFIGS['species']
        headers = [col.csv_header for col in config.columns]
        response, writer = generate_csv_response('report.csv', headers)
        
        # Get species data
        merged_df = process_report_data(config)
        
        # Write rows using configuration
        for row in merged_df.itertuples(index=False):
            row_data = [get_column_value(row, col) for col in config.columns]
            writer.writerow(row_data)
        
        return response
