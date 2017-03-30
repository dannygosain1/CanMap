import unittest
import generate_dataset_list as actual
class TestCreateTables(unittest.TestCase):
	def test_get_dataset_list(self):
		test_data = ['col1', 'col2', 'col_1994']
		self.assertEqual(['col_1994'], actual.get_dataset_list(test_data))
		test_data = ['col1', '19994', '235ss_1']
		self.assertEqual([], actual.get_dataset_list(test_data))
		test_data = ['col', 'col', 'col']
		self.assertEqual([], actual.get_dataset_list(test_data))
		#not common column name, so should not be detected as data column
		test_data = ['Population_Data']
		self.assertEqual([], actual.get_dataset_list(test_data))
		test_data = ['data_1123', 'data_1233', 'data_1223333']
		self.assertEqual(['data_1123', 'data_1233'], actual.get_dataset_list(test_data))

	def test_get_tables_list(self):
		test_data = [('colName', 'Val'), ('colName2', 'Val2')]
		self.assertEqual(['colName', 'colName2'], actual.get_tables_list(test_data))
		test_data = [('col_name', 'aaaa', 'bbb'), ('colN_ss', 'ssss')] 
		self.assertEqual(['col_name', 'colN_ss'], actual.get_tables_list(test_data))
		test_data = [(), ()]
		self.assertRaises(IndexError, actual.get_tables_list, test_data)

	def test_generate_dataset_config(self):
		test_str = "TEST"
		test_data = ['data1', 'data2', 'data3']
		self.assertEqual({'data1':"TEST", 'data2':"TEST", 'data3':"TEST"}, 
			actual.generate_dataset_config(test_data, test_str))
		test_data = []
		self.assertEqual({}, actual.generate_dataset_config(test_data, test_str))


if __name__ == '__main__':
    unittest.main()