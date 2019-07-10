require 'sinatra'
require 'sinatra/json'

require_relative 'database'

USERS = 'users'

module User
	module_function

	def get id
		user = Database::get(USERS, id) or return

		user.delete '_id'
		user.delete '_rev'

		user
	end

	def post data
		result = Database::post USERS, data

		puts "[LOG] New user created. result=#{result}, data=#{data}" if $DEBUG

		result.delete 'ok'
		result.delete 'rev'

		result
	end
end

get '/users/:id' do
	user = User::get(params['id']) or return status 404
	json user
end

post '/users' do 
	begin
		data = JSON.parse raw = request.body.read
	rescue JSON::ParserError
		status 400
		json error: true, cause: 'Bad Body', raw: raw
	end

	result = User::post data
	status 201
	json result
end


put '/users/:id' do 
	begin
		updates = JSON.parse raw = request.body.read
	rescue JSON::ParserError
		status 400
		json error: true, cause: 'Bad Body', raw: raw
	end

	result = Database::put USERS, params['id'], updates

	puts "[LOG] User Updated. result=#{result}, updates=#{updates}" if $DEBUG

	status 200
	body 'Updated'
end


delete '/users/:id' do
	result = Database::delete USERS, params['id']
	puts "[LOG] User deleted. result=#{result}, id=#{id}" if $DEBUG

	status 200
	body 'Deleted'
end