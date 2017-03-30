#Generates a yaml config for the API which maps data list name to table and column in table
import argparse
import csv
import MySQLdb
import os
import processing_utils
import re
import yaml
def create_api_dataset_list(file_name: str, dataset):
    """
    Generates a new dataset list for the api mapped to the table names
    """
    with open(file_name, 'w') as config:
        yaml.dump(dataset, config, default_flow_style=False)

def generate_dataset_config(dataset_names, table: str):
    """
    Maps the dataset name to the table which it will be found in
    """
    return {name: table for name in dataset_names} 
def get_dataset_list(table_columns):
    """
    Returns the columns which are data values
    These columns end with a four digit year number
    """
    regex = re.compile('.+_\d{4}$')
    return processing_utils.filter_list_by_regex(regex, table_columns)

def get_tables_list(tables):
    """
    Gets a list of tables from the describe query
    """
    return processing_utils.get_column_values(0, tables)

def get_columns(table_description_data):
    """
    Returns a list of column names
    """
    return processing_utils.get_column_values(0, table_description_data)

def parse_args():
    """
    Parses the arguments passed to the script if none are passed through the function call
    Returns an object containing the argument values
    """
    parser = argparse.ArgumentParser(description='Map column names to data set names for API')
    parser.add_argument('--yaml', help="location to create/update the yaml config", required=True)
    return parser.parse_args()

def run(args):
    db = MySQLdb.connect(
        host="localhost", port=3306, user=os.environ['CANMAP_DB_USER'], passwd=os.environ['CANMAP_DB_PASS'],
        db=os.environ['CANMAP_DB_NAME']
    )
    cursor = db.cursor()
    cursor.execute(processing_utils.get_tables())
    tables_list = get_tables_list(cursor.fetchall())
    aggregated_datasets = {}
    for table in tables_list:
        describe_table_statement = processing_utils.describe_table(table)
        cursor.execute(describe_table_statement)
        table_description_data = cursor.fetchall()
        table_columns = get_columns(table_description_data);
        dataset_list = get_dataset_list(table_columns)
        aggregated_datasets.update(generate_dataset_config(dataset_list, table))
    
    db.commit()
    cursor.close()
    db.close()
    create_api_dataset_list(args.yaml, aggregated_datasets)


def main():
    args = parse_args()
    run(args)

if __name__ == "__main__":
    main()