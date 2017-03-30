import unittest
import re
import processing_utils as actual
class TestCreateTables(unittest.TestCase):
	def test_filter_list_by_regex_test(self):
		regex = re.compile('raunaq.+')
		test_data = ['raunaq1', 'raunaq 5', 'rauna']
		self.assertEqual(['raunaq1', 'raunaq 5'], actual.filter_list_by_regex(regex, test_data))
		regex = re.compile('^[0-9]+$')
		test_data = ['1123123', '12331ssse', 'hel001d']
		self.assertEqual(['1123123'], actual.filter_list_by_regex(regex, test_data))
		regex = re.compile('.*')
		self.assertEqual(test_data, actual.filter_list_by_regex(regex, test_data))

	def test_get_column_values(self):
		test_data = [('colName', 'Val'), ('colName2', 'Val2')]
		self.assertEqual(['colName', 'colName2'], actual.get_column_values(0, test_data))
		test_data = [('col_name', 'aaaa', 'bbb'), ('colN_ss', 'ssss', 'sssss')]
		self.assertEqual(['aaaa', 'ssss'], actual.get_column_values(1, test_data))
		test_data = [('a_col'), ()]
		self.assertRaises(IndexError, actual.get_column_values, 1, test_data)

	def test_describe_table(self):
		self.assertTrue('DESCRIBE HELLO', actual.describe_table('hello').upper())

	def test_get_sql_type(self):
		self.assertTrue("INT", actual.get_sql_type('20'))
		self.assertTrue("FLOAT", actual.get_sql_type('-2.1'))
		self.assertTrue("INT", actual.get_sql_type('-23'))
		self.assertTrue("VARCHAR(255)", actual.get_sql_type('TESTTT'))
		self.assertTrue("VARCHAR(255)", actual.get_sql_type('23.1AA'))
		self.assertTrue("INT", actual.get_sql_type('10e4'))

	def test_create_table(self):
		test_table_name = "TEST"
		test_data_row = {'Col1': 'Data1', 'Col2':'100', 'Col3':'100.3'}
		test_statement = "CREATE TABLE TEST (Col1 VARCHAR(255), Col2 INT, COL3 FLOAT);"
		self.assertTrue(test_statement, actual.create_table(test_table_name, test_data_row))

	def test_insert_data_into_table(self):
		test_table_name = "TEST"
		test_data = [{'Col1': 'Data1', 'Col2':'42', 'Col3':'23.3'}, {'Col1': 'Data2', 'Col2':'100', 'Col3':'100.3'}]
		test_statement = "INSERT INTO TEST VALUES ((Data1, 42, 23.3), (Data2, 100, 100.3));"


if __name__ == '__main__':
    unittest.main()