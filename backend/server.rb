require 'sinatra'
require 'json'

set :show_exceptions, false

error do
	warn "Internal error: #{$!}"
	status 500
	json error: true, cause: 'Internal Server Error'
end

require_relative 'users'
require_relative 'groups'