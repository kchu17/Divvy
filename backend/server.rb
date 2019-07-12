#!/usr/bin/ruby

require 'sinatra'
require 'json'

set :show_exceptions, false
set :host, `hostname -i` # allows everyone to connect


error do
	warn "Internal error: #{$!}"
	status 500
	json error: true, cause: 'Internal Server Error'
end

require_relative 'routes/users'
require_relative 'routes/groups'
require_relative 'routes/auth'