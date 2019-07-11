echo '> Installing Ruby Dependencies'
gem install sinatra
gem install redis


echo '> Installing the `crl` command'
cat <<'EOF' >> ~/.bashrc
crl () 
{ 
    if [ $1 = "GET" ]; then
        curl -s $2;
    else
        curl -s -X $1 -H "Content-type: application/json" -d "$3" $2;
    fi
}
EOF
echo "export LOCAL='localhost:4567' # set the \$LOCAL variable" >> ~/.bashrc
echo '-w "\n"' >> ~/.curlc
source ~/.bashrc

echo <<'EOF'
USAGE: crl (GET/POST/PUT/DELETE) (URL) [DATA, in json format]
	DATA is not used for 'GET' posts
EXAMPLE:
	crl GET $LOCAL/auth
	crl POST $LOCAL/users/123456 '{"name": "hi", "age": 1234}'
EOF

# echo '    Installing Redis'
# echo '    Install from (http://download.redis.io/redis-stable.tar.gz)'
# echo '    Waiting for you to download it and put it in this directory...'
# read # and ignore it

# cd redis-stable || echo "    You didnt put it in the right location" && exit
# sudo make
# sudo make install

# echo "    Running Redis"
# redis-server &

# echo "    Checking to see if Redis is working... This should output PONG:"
# redis-cli ping