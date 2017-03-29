#Takes in a CSV file and creates + populates a mysql database with the values
import argparse
import csv
import MySQLdb
import os
import processing_utils

def parse_args():
	"""
	Parses the arguments passed to the script if none are passed through the function call
	Returns an object containing the argument values
	"""
	parser = argparse.ArgumentParser(description='Generate a sql table from the csv file')
	parser.add_argument('--csv', help="location of the csv file", required=True)
	return parser.parse_args()

def main():
	db = MySQLdb.connect(
		host="localhost", port=3306, user=os.environ['CANMAP_DB_USER'], passwd=os.environ['CANMAP_DB_PASS'],
		db=os.environ['CANMAP_DB_NAME']
	)
	cursor = db.cursor()
	args = parse_args()
	data_rows = processing_utils.read_csv_data(args.csv)

	#gets the csv name without the extension from the path to the file provided
	table_name = os.path.splitext(os.path.basename(args.csv))[0]

	table_statement = processing_utils.create_table(table_name, data_rows[0])
	insert_statement = processing_utils.insert_data_into_table(table_name, data_rows)

	cursor.execute(table_statement)
	cursor.execute(insert_statement)
	db.commit()
	cursor.close()
	db.close()

if __name__ == "__main__":
    main()