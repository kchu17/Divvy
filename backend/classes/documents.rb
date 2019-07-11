require_relative '../database'

class Document
	attr_reader :data

	private def initialize data
		fail "'data' doesn't contain an 'id': #{data}" unless data['id']
		@data = data
	end

	def id
		@data['id']
	end

	def delete
		result = Database::delete(table_name, id) or return
		puts "[LOG] #{self.class.name} deleted. result=#{result}, id=#{id}" if $DEBUG
		@data = nil
		true
	end

	def update updates
		@data.update updates
		result = self.class.db_put id, @data

		puts "[LOG] Updated user. result=#{result}, updates=#{updates}" if $DEBUG
		true
	end

	def inspect
		"#{self.class.name}(#{id}, #@data)"
	end

	def [] val
		@data[val]
	end

	def to_h
		@data.clone
	end
end



class << Document
	def table_name
		const_get :TABLE
	end

	def exists? id
		!!from_id(id)
	end

	def from_id id
		new (db_get id or return)
	end

	def create data
		result = db_post data
		puts "[LOG] New user created. result=#{result}, data=#{data}" if $DEBUG
		from_id result['id']
	end


	def db_post data
		Database::post table_name, data
	end

	def db_put id, data
		Database::put table_name, id, data
	end

	def db_find selector=nil, fields=nil
		query = {}

		query['selector'] = selector if selector
		query['fields'] = fields if fields

		data = Database::curl(table_name + '/_find', Database::POST, query)['docs']
		data.map(&method(:standardize_doc))
	end

	def db_get id
		return if id.nil? || id.empty?
		data = Database::get(table_name, id) and standardize_doc data
	end

private
	def standardize_doc doc
		doc['id'] = doc.delete '_id'
		doc.delete '_rev'
		doc
	end

end