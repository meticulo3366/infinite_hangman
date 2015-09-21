#!/bin/bash

#cat <(crontab -l) <(echo "1 2 3 4 5 scripty.sh") | crontab -

vagrant ssh /tester[0-9]/ -c cd /vagrant; env HOST=192.168.0.17 mocha