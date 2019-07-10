require_relative '../user'
require 'sinatra'
require 'sinatra/json'

get '/user/:id' do
	user = User::get(params['id']) or return status 404
	json user
end

post '/user' do 
	begin
		data = JSON.parse(raw = request.body.read) or fail JSON::ParserError # just to break into rescue
	rescue JSON::ParserError
		status 400
		return json error: true, cause: 'Bad Body', raw: raw
	end

	result = User::post data
	status 201
	json result
end


put '/user/:id' do 
	begin
		updates = JSON.parse(raw = request.body.read) or fail JSON::ParserError # just to break into rescue
	rescue JSON::ParserError
		status 400
		return json error: true, cause: 'Bad Body', raw: raw
	end

	User::put params['id'], updates

	status 200
	body 'Updated'
end


delete '/user/:id' do
	User::delete params['id']

	status 200
	body 'Deleted'
end