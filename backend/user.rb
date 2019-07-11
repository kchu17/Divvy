require_relative 'database'

#ed7f4acaa55c949d92408178ffe06fa0
module User__
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

	def find body
		Database::curl(USERS + '/_find', Database::POST, body)['docs']
	end


	def post data
		result = Database::post USERS, data

		puts "[LOG] New user created. result=#{result}, data=#{data}" if $DEBUG

		result.delete 'rev'

		result
	end

	def put id, updates
		result = Database::put USERS, id, updates

		puts "[LOG] User__ Updated. result=#{result}, updates=#{updates}" if $DEBUG
		true
	end

	def delete id
		result = Database::delete(USERS, id) or return
		puts "[LOG] User__ deleted. result=#{result}, id=#{id}" if $DEBUG
		true
	end
end
