require 'sinatra'
require 'sinatra/json'

require_relative 'database'


get '/users/:id' do
	data = Database::get 'users', params['id']
	
	return status 404 if data['error'] == 'not_found'

	data.delete '_id'
	data.delete '_rev'

	json data
end

post '/users' do 
	begin
		body = JSON.parse raw = request.body.read
	rescue JSON::ParseError
		status 400
		json error: true, cause: 'Bad Body', raw: raw
	end

	response = Database::post 'users', body

	puts "[LOG] New user created. response=#{response}, body=#{body}" if $DEBUG

	response.delete 'ok'
	response.delete 'rev'

	status 201
	json response
end


put '/users/:id' do 
	begin
		body = JSON.parse raw = request.body.read
	rescue JSON::ParseError
		status 400
		json error: true, cause: 'Bad Body', raw: raw
	end

	response = Database::put 'users', params['id'], body

	puts "[LOG] User Updated. response=#{response}, body=#{body}" if $DEBUG

	status 200
	body 'Updated'
end


delete '/users/:id' do
	response = Database::delete 'users', params['id']
	p response
	status 200
	body 'Deleted'
	# body 'hi'
	# p methods - Object.new.methods
	# exit
end
