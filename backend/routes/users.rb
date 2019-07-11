require_relative '../classes/user'
require 'sinatra'
require 'sinatra/json'

def sanitize_user user
	user = user.to_h
	user['sanitized'] = true;
	# user.delete 'password'
	# user.delete 'salt'
	user
end

get '/user/:id' do
	user = User::from_id(params['id']) or return status 404
	json sanitize_user user
end

get '/user/username/:username' do
	user = User::from_username(params['username']) or return status 404
	json sanitize_user user
end

require_relative 'util'

put '/user/:id' do 
	updates = parse_body(request.body.read) or return

	user = User::from_id(params['id']) or return status 404
	user.update updates or return

	status 200
	body 'Updated'
end


delete '/user/:id' do
	User::delete(params['id']) or return 404

	status 200
	body 'Deleted'
end