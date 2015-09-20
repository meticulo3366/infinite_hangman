#MAC INSTRUCTIONS WITH DOCKER

#MAC INSTRUCTIONS NO DOCKER

##BEFORE YOU BEGIN
* use home brew!
* install redis
** `brew install redis`
* install nginx
** brew install nginx
* install mongo
** brew install mongo
* install node modules globally 
** sudo npm install pm2 mocha npm -g

##BEGIN
* `CD to project directory`

##configure NGINX
*cp nginx/loadbalancer.conf /usr/local/etc/nginx/servers/.

## TURN ON SLAVE SERVERS
* sudo NODE_PORT=6008 pm2 start app.js -x -i 1 -f --name "Server8"

