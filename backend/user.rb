require_relative 'database'

module User
module_function

	USERS = 'users'

	def exist? id
		!!get(id)
	end

	def get id
		return if id.nil? || id.empty?
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

	def put id, updates
		result = Database::put USERS, id, updates

		puts "[LOG] User Updated. result=#{result}, updates=#{updates}" if $DEBUG
		true
	end

	def delete id
		result = Database::delete USERS, params['id']
		puts "[LOG] User deleted. result=#{result}, id=#{id}" if $DEBUG
		true
	end
end