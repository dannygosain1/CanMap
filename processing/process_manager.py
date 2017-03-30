import os
import create_tables
import generate_dataset_list
import argparse

def parse_args():
    """
    Parses the arguments passed to the script if none are passed through the function call
    Returns an object containing the argument values
    """
    parser = argparse.ArgumentParser(description='Map column names to data set names for API')
    parser.add_argument('--dir', help="location to create/update the yaml config", required=True)
    return parser.parse_args() 

def run_pipeline(dataset, pipeline):
	create_tables_args = argparse.Namespace(csv=dataset)
	pipeline[0]['args'] = create_tables_args

	for executable in pipeline:
		executable['func'](executable['args'])


def main():
	args = parse_args()
	initial_state = os.listdir(args.dir)
	pipeline = [{'func': create_tables.run, 'args': None}, 
				{'func': generate_dataset_list.run, 'args': argparse.Namespace(yaml='dataset_list.yaml')}
			   ]
	print("Starting Process Manager....")
	while True:
		if os.listdir(args.dir) != initial_state and len(os.listdir(args.dir)) > len(initial_state):
			print("New Dataset Found!")
			new_datasets = list(filter(lambda file: file not in initial_state, os.listdir(args.dir)))
			for dataset in new_datasets:
				run_pipeline(dataset, pipeline)
			initial_state = os.listdir(args.dir)
			print("Finished adding new dataset")

    

if __name__ == "__main__":
    main()