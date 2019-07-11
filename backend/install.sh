echo '    Installing Ruby Dependencies'
gem install sinatra
gem install redis

echo '    Installing Redis'
echo '    Install from (http://download.redis.io/redis-stable.tar.gz)'
echo '    Waiting for you to download it and put it in this directory...'
read # and ignore it

cd redis-stable || echo "    You didnt put it in the right location" && exit
sudo make
sudo make install

echo "    Running Redis"
redis-server &

echo "    Checking to see if Redis is working... This should output PONG:"
redis-cli ping