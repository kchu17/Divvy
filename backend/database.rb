require 'json'
URL='https://82f959e5-2061-4139-bae0-af44d0cb2e8c-bluemix:b763e742c383dbc471456ea31a61ceb3b9695faf82c113711229650c657b06bd@82f959e5-2061-4139-bae0-af44d0cb2e8c-bluemix.cloudantnosqldb.appdomain.cloud'

module Database
module_function

	class DatabaseError < StandardError
	end
	
	def post database, data
		curl database, POST, data
	end

	def put database, document, data
		data.delete '_id'
		data.delete '_rev'

		response = get database, document
		response.update data

		curl "#{database}/#{document}", PUT, response
	end

	def get database, document, data=nil
		result = curl "#{database}/#{document}", GET, data
		return if result['error'] == 'not_found'
		result
	rescue JSON::ParserError
		raise DatabaseError, raw
	end

	def delete database, document
		rev = (get(database, document) or return)['_rev']
		curl "#{database}/#{document}?rev=#{rev}", DELETE
	end


	GET, PUT, POST, DELETE = %w(GET PUT POST DELETE)

	def curl endpoint, meth, data=nil
		data &&= "-d '#{data.to_json}'"
		header = data && '-H "Content-type: application/json"'
		JSON.parse raw = `curl -s -X#{meth} #{header} #{data} #{URL}/#{endpoint}`
	end
end

