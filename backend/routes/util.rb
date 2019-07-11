def parse_body raw
	JSON.parse raw or fail JSON::ParserError # just to break into rescue
rescue JSON::ParserError
	status 400
	json ok: false, cause: 'Bad Body', raw: raw
	return false
end