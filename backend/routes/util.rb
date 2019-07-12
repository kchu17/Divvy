require 'json'

def parse_body raw
	JSON.parse raw or fail JSON::ParserError # just to break into rescue
rescue JSON::ParserError
	yield [400, {ok: false, cause: 'Bad Body', raw: raw}.to_json]
end

GROUP_DOESNT_EXIST = [404, {ok: false, cause: "Group doesn't exist"}.to_json]
USER_DOESNT_EXIST = [404, {ok: false, cause: "User doesn't exist"}.to_json]
