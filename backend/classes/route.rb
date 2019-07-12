require_relative 'document'
require_relative 'user'

class Route < Document
	TABLE = 'routes'

	def self.db_post data
		data['users'] ||= []
		super(data)
	end

	def add_user user
		return [200, {ok: true, comment: "User already in group, nothing added"}.to_json] if self['users'].include? user.id

		self['users'].push user.id
		update! # we've already updated on the last line, so this just pushes the current version to the server

		puts "[LOG] Added user to group. user.id=#{user.id}, group.id=#{self.id}" if $DEBUG
		true
	end

	def remove_user user
		return [200, {ok: true, comment: "User wasn't in group, nothing removed"}.to_json] unless self['users'].include? user.id

		self['users'].delete user.id
		update!

		puts "[LOG] Removed user from group. user.id=#{user.id}, group__d=#{group__d}" if $DEBUG
		true
	end
end