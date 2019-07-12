require_relative '../classes/ride'
require_relative 'util'
require 'sinatra'
require 'sinatra/json'

get '/rides/:id' do
	ride = Ride::from_id(params['id']) or return RIDE_DOESNT_EXIST
	json ride
end

post '/rides' do 
	data = parse_body(request.body.read){ |err| return err }
	ride = Ride::create data

	status 201
	json ok: true, id: ride.id
end

put '/rides/:id' do 
	ride = Ride::from_id(params['id']) or return RIDE_DOESNT_EXIST

	data = parse_body(request.body.read){ |err| return err }

	ride.update! data or return

	status 200
	json ok: true
end

delete '/rides/:id' do
	Ride::delete! params['id']

	status 200
	json ok: true
end

post '/rides/:id/add_user' do
	user = User::from_id(params['user_id'] || halt(400, "Missing the 'user_id' params field")) or return USER_DOESNT_EXIST
	ride = Ride::from_id(params['id']) or return RIDE_DOESNT_EXIST

	result = ride.add_user user
	if result.is_a? Array
		result
	else
		[200, {ok: true}.to_json]
	end
end

post '/rides/:id/remove_user' do
	user = User::from_id(params['user_id'] || halt(400, "Missing the 'user_id' params field")) or return USER_DOESNT_EXIST
	ride = Ride::from_id(params['id']) or return RIDE_DOESNT_EXIST

	result = ride.remove_user user
	if result.is_a? Array
		result
	else
		[200, {ok: true}.to_json]
	end
end
