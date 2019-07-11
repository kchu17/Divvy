require_relative 'documents'

class User < Documents
	TABLE = 'users'

	def username
		@data['username']
	end

	def to_json_for_user
		data = @data.dup
		data.delete 'password'
		data.delete 'salt'
		data
	end
end

class << User
	def from_username username
		users = db_find({ username: username }) or return

		user = users.shift or return
		warn "Multiple users found for username #{username}. extra_users=#{users}" unless users.empty?

		new user
	end

	def username_exists? username; !!from_username(username) end
end