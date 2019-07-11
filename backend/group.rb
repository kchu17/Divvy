require 'sinatra'
require 'sinatra/json'

require_relative 'database'
require_relative 'user'

module Group
module_function
	GROUP = 'groups'
		
	def exist? id
		!!get(id)
	end

	def get id
		return if id.nil? || id.empty?
		group = Database::get(GROUP, id) or return

		group.delete '_id'
		group.delete '_rev'

		group
	end

	def find body
		Database::curl(GROUPS + '/_find', Database::POST, body)['docs']
	end

	def post data
		result = Database::post GROUP, data

		puts "[LOG] New group created. result=#{result}, data=#{data}" if $DEBUG

		result.delete 'ok'
		result.delete 'rev'

		result
	end

	def put id, updates
		result = Database::put GROUP, id, updates
		puts "[LOG] Group Updated. result=#{result}, updates=#{updates}" if $DEBUG
		true
	end

	def delete id
		result = Database::delete GROUP, id
		puts "[LOG] Group deleted. result=#{result}, id=#{id}" if $DEBUG
		true
	end

	def add_user group_id, user_id
		return [404, 'User__ not found'] unless User__::exist? user_id
		group = Database::get(GROUP, group_id) or return [404, 'Group not found']
		
		group['users'] ||= []
		return [200, 'User__ already in group, nothing added'] if group['users'].include? user_id
		group['users'].push user_id 
		Database::put GROUP, group_id, group
	
		puts "[LOG] Added user to group. user_id=#{user_id}, group_id=#{group_id}" if $DEBUG
		true
	end

	def remove_user group_id, user_id
		group = Database::get(GROUP, group_id) or return [404, 'Group not found']
		
		return [200, "User__ isn't in the group"] unless group['users']&.include? user_id
		group['users'].delete user_id
		Database::put GROUP, group_id, group
	
		puts "[LOG] Removed user from group. user_id=#{user_id}, group_id=#{group_id}" if $DEBUG
		true
	end
end
