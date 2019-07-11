require_relative '../database'

class Documents
	attr_reader :data

	private def initialize data
		fail "'data' doesn't contain an 'id': #{data}" unless data['id']
		@data = data
	end

	def id; @data['id'] end

	def delete
		result = Database::delete(table_name, id) or return
		puts "[LOG] #{self.class.name} deleted. result=#{result}, id=#{id}" if $DEBUG
		@data = nil
		true
	end

	def inspect
		"#{self.class.name}(#{id}, #@data)"
	end

	def to_h
		@data.clone
	end
end



class << Documents
	def table_name
		const_get :TABLE
	end

	def exists? id:
		!!from_id(id)
	end

	def from_id id
		new (db_get id or return)
	end

private

	def db_find selector=nil, fields=nil
		query = {}

		query['selector'] = selector if selector
		query['fields'] = fields if fields

		data = Database::curl(table_name + '/_find', Database::POST, query)['docs']
		data.map(&method(:sanitize_doc))
	end

	def sanitize_doc doc
		doc['id'] = doc.delete '_id'
		doc.delete '_rev'
		doc
	end

	def db_get id
		return if id.nil? || id.empty?
		data = Database::get(table_name, id) and sanitize_doc data
	end
end