# SIMPLE SELF CONTAINED VERSION

`npm install`
`SIMPLE=true node app.js`

now open browser to http://192.168.0.17:3000 or your ip address

# MAC INSTRUCTIONS WITH DOCKER
* to be finished later..

# MAC INSTRUCTIONS for full solution

## BEFORE YOU BEGIN
* use home brew!
* install redis
** `brew install redis`
* install nginx
** brew install nginx
* install mongo
** brew install mongo
* install node modules globally 
** sudo npm install pm2 mocha npm -g

## BEGIN
* `CD to project directory`

## configure NGINX
* `cp -f nginx/nginx.conf /usr/local/etc/nginx/nginx.conf`

#Turn on Server
* `HOST=192.168.0.17 PORT=3000 node app.js`

## TURN ON SLAVE SERVERS
* `./launch10.sh`

# how to run the tests

## running just 1 load test
`env SOCKET_SERVER=192.168.0.17 SOCKET_PORT=3000 mocha`
or can be run as...
`HOST=192.168.0.17 mocha`


## running the load testers as a server farm
SOCKET_SERVER=192.168.0.17 SOCKET_PORT=3000 vagrant up