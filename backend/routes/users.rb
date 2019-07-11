require_relative '../user'
require_relative '../classes/user'
require 'sinatra'
require 'sinatra/json'

get '/user/:id' do
	json (User::from_id(params['id']) or return status 404).to_json_for_user
end

get '/user/username/:username' do
	json (User::from_username(params['username']) or return status 404).to_json_for_user
end


# post '/user' do 
# 	begin
# 		data = JSON.parse(raw = request.body.read) or fail JSON::ParserError # just to break into rescue
# 	rescue JSON::ParserError
# 		status 400
# 		return json ok: false, cause: 'Bad Body', raw: raw
# 	end

# 	result = User__::post data
# 	status 201
# 	json result
# end


put '/user/:id' do 
	begin
		updates = JSON.parse(raw = request.body.read) or fail JSON::ParserError # just to break into rescue
	rescue JSON::ParserError
		status 400
		return json ok: false, cause: 'Bad Body', raw: raw
	end

	User__::put params['id'], updates

	status 200
	body 'Updated'
end


delete '/user/:id' do
	User__::delete(params['id']) or return 404

	status 200
	body 'Deleted'
end