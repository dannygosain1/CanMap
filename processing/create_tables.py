#Takes in a CSV file and creates + populates a mysql database with the values
import argparse
import csv
import MySQLdb
import os

def parse_args():
	"""
	Parses the arguments passed to the script if none are passed through the function call
	Returns an object containing the argument values
	"""
	parser = argparse.ArgumentParser(description='Generate a sql table from the csv file')
	parser.add_argument('--csv', help="location of the csv file")
	return parser.parse_args()

def read_data(csvFile: str):
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

def insert_data(table_name, data):
	rows = [];
	for row in data:
		row_statement = "(%s)" %(", ".join(row.values()))
		rows.append(row_statement)
	return "INSERT INTO %s VALUES %s;" %(table_name, ", ".join(rows))

def main():
	db = MySQLdb.connect(
		host="localhost", port=3306, user=os.environ['CANMAP_DB_USER'], passwd=os.environ['CANMAP_DB_PASS'],
		db=os.environ['CANMAP_DB_NAME']
		)
	cursor = db.cursor()
	args = parse_args()
	data_rows = read_data(args.csv)

	#gets the csv name without the extension from the path to the file provided
	table_name = os.path.splitext(os.path.basename(args.csv))[0]

	table_statement = create_table(table_name, data_rows[0])
	insert_statement = insert_data(table_name, data_rows)

	cursor.execute(table_statement)
	cursor.execute(insert_statement)
	db.commit()
	cursor.close()
	db.close()

if __name__ == "__main__":
    main()