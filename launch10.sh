#!/bin/bash

#redis-server /usr/local/etc/redis.conf

sudo pm2 kill
sudo NODE_PORT=6001 pm2 start app.js -x -i 1 -f --name "Server1"
sudo NODE_PORT=6002 pm2 start app.js -x -i 1 -f --name "Server2"
sudo NODE_PORT=6003 pm2 start app.js -x -i 1 -f --name "Server3"
sudo NODE_PORT=6004 pm2 start app.js -x -i 1 -f --name "Server4"
sudo NODE_PORT=6005 pm2 start app.js -x -i 1 -f --name "Server5"
sudo NODE_PORT=6006 pm2 start app.js -x -i 1 -f --name "Server6"
sudo NODE_PORT=6007 pm2 start app.js -x -i 1 -f --name "Server7"
sudo NODE_PORT=6008 pm2 start app.js -x -i 1 -f --name "Server8"
sudo NODE_PORT=6009 pm2 start app.js -x -i 1 -f --name "Server9"
sudo NODE_PORT=6010 pm2 start app.js -x -i 1 -f --name "Server10"

#NODE_PORT=