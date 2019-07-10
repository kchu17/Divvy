require 'sinatra'
require 'sinatra/json'

require_relative 'database'
GROUPS = 'groups'

get '/groups/:id' do
	user = Database::get(GROUPS, params['id']) or return status 404

	user.delete '_id'
	user.delete '_rev'

	json user
end

put '/groups/:id/add' do
	user_id = params['user'] or halt 400, "Missing the 'user' query field"
	group_id = params['id']
	return [404, 'User not found'] unless Database::get('users', user_id)

	group = Database::get(GROUPS, group_id) or return [404, 'Group not found']

	group['users'] ||= []
	group['users'].push(user_id)

	result = Database::put GROUPS, group_id, group
	puts "[LOG] Added user to group. user_id=#{user_id}, group_id=#{group_id}" if $DEBUG

	status 200
end

post '/groups' do 
	begin
		updates = JSON.parse raw = request.body.read
	rescue JSON::ParserError
		status 400
		json error: true, cause: 'Bad Body', raw: raw
	end

	response = Database::post GROUPS, updates

	puts "[LOG] New user created. response=#{response}, updates=#{updates}" if $DEBUG

	response.delete 'ok'
	response.delete 'rev'

	status 201
	json response
end

delete '/groups/:id' do
	response = Database::delete GROUPS, params['id']
	puts "[LOG] User deleted. response=#{response}, id=#{id}" if $DEBUG

	status 200
	body 'Deleted'
end
	
__END__
put '/join_group' do
	begin
		info = JSON.parse raw = request.body.read
	rescue JSON::ParserError
		status 400
		json error: true, cause: 'Bad Body', raw: raw
	end

halt 400
	user = info['user'] or halt 400


	# response = Database::put GROUPS, params['id'], updates

	# puts "[LOG] User Updated. response=#{response}, updates=#{updates}" if $DEBUG

	# status 200
	# body 'Updated'
end


put '/groups/:id' do 
	begin
		updates = JSON.parse raw = request.body.read
	rescue JSON::ParserError
		status 400
		json error: true, cause: 'Bad Body', raw: raw
	end

	response = Database::put GROUPS, params['id'], updates

	puts "[LOG] User Updated. response=#{response}, updates=#{updates}" if $DEBUG

	status 200
	body 'Updated'
end