def filter_list_by_regex(regex, unfiltered_list):
    return list(filter(regex.match, unfiltered_list))

def get_column_values(columnIndex: int, table_data):
    values = list(map(lambda row: row[0], table_data))
    return values

def get_tables():
    return "SHOW tables;"

def describe_table(table_name):
    """ 
    Returns a SQL statement that describes the table
    """
    return "Describe %s;" %(table_name)

def read_csv_data(csvFile: str):
    """
    Reads data from a csv file and returns the rows as a list of OrderedDicts
    Input: path of csv file
    Raises error if issues arise due to accessing the file
    """
    data_rows = []
    with open(csvFile) as data:
        reader = csv.DictReader(data)
        for row in reader:
            data_rows.append(row)
    return data_rows

def create_table(table_name, data_row):
    """
    Generates a create table sql statement from the provided data row and table name
    """
    table_columns = []
    for (k, v) in data_row.items():
        columnName = k.replace(" ", "_")
        table_columns.append("%s %s" %(columnName, get_sql_type(v)))
    
    return "CREATE TABLE %s (%s);" %(table_name, ", ".join(table_columns))

def get_sql_type(val: str):
    """
    Gets the SQL type for the data from a string
    Checks to see if the string is an integer or a float and returns
    the respective type, defaults to returning VARCHAR
    """
    try:
        i = int(val)
        return "INT"
    except ValueError:
        try:
            i = float(val)
            return "DOUBLE"
        except ValueError:
            pass
    return "VARCHAR(255)"

def insert_data_into_table(table_name, data):
    rows = [];
    for row in data:
        row_statement = "(%s)" %(", ".join(row.values()))
        rows.append(row_statement)
    return "INSERT INTO %s VALUES %s;" %(table_name, ", ".join(rows))