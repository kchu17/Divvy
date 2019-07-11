__END__
require 'uri'
require 'json'

API_KEY = 'AIzaSyAxk8cjmtF9oJUngRMLKxsovb02XEwrEo4'
BASE_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json'

class Object
	def to_uri_params
		URI::encode to_s
	end
end

class Array
	def to_uri_params
		map(&:to_uri_params).join(first.is_a?(Array) ? '|' : ',')
	end
end

class Hash
	def to_uri_params
		URI::encode map{ |key, val| "#{key.to_s}=#{val.to_uri_params}"}.join('&')
	end
end


args = {
	units: 'imperial',
	origins: [37.275167,-121.891223], #mexico lindo
	key: API_KEY,
	destinations: [
		[37.335240,-121.892711], # nick the greek
		[37.308648,-121.900458], # willow street pizza
	],

	arrival_time: (Time.now + 21*60*60).to_i
}

def get_url args
	BASE_URL + '?' + args.to_uri_params
end


p get_url args
puts `curl -s '#{get_url args}'`
__END__

https://maps.googleapis.com/maps/api/distancematrix/json?parameters?


?units=imperial
&origins=40.6655101,-73.89188969999998
&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626
&key=AIzaSyAxk8cjmtF9oJUngRMLKxsovb02XEwrEo4

bailey = 41.557396,-72.802959




{
   "destination_addresses" : [
      "141 W Santa Clara St, San Jose, CA 95113, USA",
      "1062 Willow St, San Jose, CA 95125, USA"
   ],
   "origin_addresses" : [ "1401 Foxworthy Ave, San Jose, CA 95118, USA" ],
   "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "5.2 mi",
                  "value" : 8325
               },
               "duration" : {
                  "text" : "10 mins",
                  "value" : 620
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "2.9 mi",
                  "value" : 4733
               },
               "duration" : {
                  "text" : "9 mins",
                  "value" : 538
               },
               "status" : "OK"
            }
         ]
      }
   ],
   "status" : "OK"
}