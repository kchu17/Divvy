require_relative '../classes/group'
require_relative 'util'
require 'sinatra'
require 'sinatra/json'

get '/groups/:id' do
	group = Group::from_id(params['id']) or return GROUP_DOESNT_EXIST
	json group
end

post '/groups' do 
	data = parse_body(request.body.read){ |err| return err }
	group = Group::create data

	status 201
	json ok: true, id: group.id
end

put '/groups/:id' do 
	group = Group::from_id(params['id']) or return GROUP_DOESNT_EXIST

	data = parse_body(request.body.read){ |err| return err }

	group.update! data or return

	status 200
	json ok: true
end

delete '/groups/:id' do
	Group::delete! params['id']

	status 200
	json ok: true
end

post '/groups/:id/add_user' do
	user = User::from_id(params['user_id'] || halt(400, "Missing the 'user_id' params field")) or return USER_DOESNT_EXIST
	group = Group::from_id(params['id']) or return GROUP_DOESNT_EXIST

	result = group.add_user user
	if result.is_a? Array
		result
	else
		[200, {ok: true}.to_json]
	end
end

post '/groups/:id/remove_user' do
	user = User::from_id(params['user_id'] || halt(400, "Missing the 'user_id' params field")) or return USER_DOESNT_EXIST
	group = Group::from_id(params['id']) or return GROUP_DOESNT_EXIST

	result = group.remove_user user
	if result.is_a? Array
		result
	else
		[200, {ok: true}.to_json]
	end
end
