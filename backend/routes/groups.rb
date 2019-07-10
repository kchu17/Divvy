require_relative '../group'
require 'sinatra'
require 'sinatra/json'

get '/group/:id' do
	group = Group::get(params['id']) or return status 404
	json group
end

post '/group' do 
	begin
		data = JSON.parse(raw = request.body.read) or fail JSON::ParserError # just to break into rescue
	rescue JSON::ParserError
		status 400
		return json error: true, cause: 'Bad Body', raw: raw
	end

	result = Group::post data
	status 201
	json result
end

put '/group/:id' do 
	begin
		updates = JSON.parse(raw = request.body.read) or fail JSON::ParserError # just to break into rescue
	rescue JSON::ParserError
		status 400
		return json error: true, cause: 'Bad Body', raw: raw
	end

	Group::put params['id'], updates

	status 200
	body 'Updated'
end

delete '/group/:id' do
	Group::delete params['id']

	status 200
	body 'Deleted'
end

put '/group/:id/add' do
	user_id = params['user'] or halt 400, "Missing the 'user' query field"
	group_id = params['id']
	result = Group::add group_id, user_id

	if result == true
		status 200
		body 'Added'
	else
		result
	end
end
