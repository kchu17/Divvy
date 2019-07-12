require_relative 'document'

class String
	def salt_password
		salt = rand(0xffff).to_s
		[salt, hash_password(salt)]
	end

	def hash_password salt
		Digest::SHA2.hexdigest salt + '$' + self
	end
end

class User < Document
	TABLE = 'users'

	def username
		@data['username']
	end

	def update! updates
		updates.delete 'salt'
		if updates.include? 'password'
			salt, password = updates['password'].salt_password
			updates['salt'] = salt
			updates['password'] = updates['password'].hash_password updates['salt']
		end
		super(updates)
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