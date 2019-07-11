require_relative 'util'
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

get '/users/:id' do
	user = User::from_id(params['id']) or return USER_DOESNT_EXIST
	json sanitize_user user
end

get '/users/username/:username' do
	user = User::from_username(params['username']) or return USER_DOESNT_EXIST
	json sanitize_user user
end


put '/users/:id' do 
	user = User::from_id(params['id']) or return USER_DOESNT_EXIST

	data = parse_body(request.body.read){ |err| return err }
	
	user.update! data or return

	status 200
	json ok: true
end


delete '/users/:id' do
	user = User::from_id(params['id']) or return USER_DOESNT_EXIST
	user.delete! or return

	status 200
	json ok: true
end