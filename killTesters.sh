#!/bin/bash

# This script is run in the auto deployed 
# Test runners

# POWER SHELL COMMANDS TO HELP
# i also hate windows...
# Set-Item Env:SOCKET_SERVER 192.168.0.17
# Set-Item Env:SOCKET_PORT 3000

# Run the following command to start the servers...

# vagrant reload --provision

# now shutdown

vagrant global-status | grep virtualbox | cut -c 1-9 | while read line; do echo $line; vagrant halt $line; done;