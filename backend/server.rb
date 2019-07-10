require 'sinatra'
require 'json'

set :show_exceptions, false

require_relative 'users'

error do
	warn "Internal error: #{$!}"
	status 500
	json error: true, cause: 'Internal Server Error'
end