require 'sinatra'
require 'json'
require 'sequel'
require 'yaml'
require 'json'

database_config = YAML.load_file('database.yaml')
dataset_list = YAML.load_file('dataset_list.yaml')

CACHE_TIMEOUT = 60 * 60 #cache expires every hour for queries
DB = Sequel.connect(database_config["development"],
                    :database => ENV['CANMAP_DB_NAME'],
                    :username => ENV['CANMAP_DB_READ_ONLY_USER'],
                    :password => ENV['CANMAP_DB_READ_ONLY_PASS'],
                   )

before do
  #http://stackoverflow.com/questions/17027117/jquery-ajax-request-to-sinatra-app-blocked-by-cors
  headers['Access-Control-Allow-Origin'] = "*"
  headers['Access-Control-Allow-Methods'] = "GET, OPTIONS"
  headers['Access-Control-Allow-Headers'] ="accept, authorization, origin"
  
  cache_control :public, :must_revalidate, :max_age => 60
  content_type 'application/json'
end

get '/datasets' do
  data = dataset_list.keys.dup.map{|dataset| dataset.dup.gsub! '_', ' '}
  data.to_json
end

get '/canada/:dataset_name/:fcn' do
  fcn = params['fcn']
  dataset_name = params['dataset_name']
  table = dataset_list[dataset_name]

  raw_data = DB.from(table)
  dataset = case fcn.to_sym
    when :sum
      raw_data.select{[Sequel.as(:Provincial_geographic_Code, :'hc-key'), Sequel.as(sum(dataset_name.to_sym), :value)]}
    when :max
      raw_data.select{[Sequel.as(:Provincial_geographic_Code, :'hc-key'), Sequel.as(max(dataset_name.to_sym), :value)]}
    when :min
      raw_data.select{[Sequel.as(:Provincial_geographic_Code, :'hc-key'), Sequel.as(min(dataset_name.to_sym), :value)]}
    else
      raw_data.select{[Sequel.as(:Provincial_geographic_Code, :'hc-key'), Sequel.as(avg(dataset_name.to_sym), :value)]}
  end
  dataset = dataset.group(:'hc-key')
  #convert to float for aggregate functions instead of BigDecimal
  data = dataset.all.each do |row|
    row[:value] = row[:value].to_f
  end
  data.to_json

end

get '/province/:map_id/:dataset_name' do
  dataset_name = params['dataset_name']
  map_id = params['map_id']
  table = dataset_list[dataset_name]
  dataset = DB.from(table)
              .where(:Provincial_geographic_Code => map_id)
              .select(Sequel.as(:Geographic_code, :'hc-key'), Sequel.as(dataset_name.to_sym, :value))
  dataset.all.to_json
end
