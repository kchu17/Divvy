require 'sinatra'
require 'sinatra/json'
require 'digest'
require_relative '../classes/user'
require_relative 'util'
enable :sessions

USER_ID = :user_id

# def validate_user_params params
# 	return {
# 		username: params['username'] or return nil,
# 		password: params['password'] or return nil,
# 		email: params['email'] or return nil,
# 		venmo: params['venmo'],
# 		home_addres: params['home_addres'],
# 		work_address: params['work_address'],
# 	}
# end

get '/auth' do
	body session.to_hash.to_s
end

post '/auth/login' do
	return [400, {ok: false, cause: 'Already logged in'}.to_json] if session.include? USER_ID

	data = parse_body(request.body.read){ |err| return err }

	username = data['username']&.to_s or halt 400, "'username' required"
	password = data['password']&.to_s or halt 400, "'password' required"

	user = User::from_username username

	if !user || user['password'] != password.hash_password(user['salt'])
		status 400
		return json ok: false, cause: "Bad Credentials"
	end

	session[USER_ID] = user.id

	status 200
	json ok: true
end

post '/auth/register' do
	data = parse_body(request.body.read){ |err| return err }

	username = data['username']&.to_s or halt 400, "'username' required"
	password = data['password']&.to_s or halt 400, "'password' required"

	if User::username_exists? username
		status 400
		return json ok: false, cause: "'username' already exists", username: username
	end

	salt, password = password.salt_password

	user = data.clone
	user.update username: username, password: password, salt: salt

	id = User::create(user).id
	session[USER_ID] = id

	status 201
	json ok: true, id: id
end

get '/auth/logout' do
	return [200, {ok: true, comment: "You werent logged in"}.to_json] unless session.include? USER_ID
	session.delete USER_ID
	status 200
	json ok: true
end