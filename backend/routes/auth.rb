require 'sinatra'
require 'sinatra/json'
require 'digest'
require_relative '../user'

enable :sessions

USER_ID = :user_id
class String
	def hash_password salt
		Digest::SHA2.hexdigest salt + '$' + self
	end
end

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
	halt 400, 'Already logged in' if session.include? USER_ID

	begin
		body = JSON.parse(raw = request.body.read) or fail JSON::ParserError # just to break into rescue
	rescue JSON::ParserError
		status 400
		return json error: true, cause: 'Bad Body', raw: raw
	end

	username = body['username']&.to_s or halt 400, 'Username required'
	password = body['password']&.to_s or halt 400, 'Password required'

	users = User::find({ selector: { username: 'sam' }, fields: ['password', 'salt', '_id']})
		.select{|user| user['password'] == password.hash_password(user['salt']) }

	return [400, {success: false, cause: "Bad Credentials"}.to_json] if users.empty?
	warn "Multiple users found, using the first one. username=#{username}, users=#{users}" if users.length > 1

	session[USER_ID] = users.first['_id']

	status 200
	body 'Logged in'
end

post '/auth/register' do
	begin
		body = JSON.parse(raw = request.body.read) or fail JSON::ParserError # just to break into rescue
	rescue JSON::ParserError
		status 400
		return json error: true, cause: 'Bad Body', raw: raw
	end

	username = body['username']&.to_s or halt 400, 'Username required'
	password = body['password']&.to_s or halt 400, 'Password required'

	if User::exist? username
		status 400
		return json success: false, cause: "Username already exists", username: username
	end

	salt = rand(0xffff).to_s # generate a two-byte salt

	user = params.clone.update(
		username: username,
		password: password.hash_password(salt),
		salt: salt
	)

	id = User::post(user)['id']
	session[USER_ID] = id

	status 200
	json success: true, id: id
end

get '/auth/logout' do
	session.delete USER_ID
	status 200
	body 'Logged out'
end