#!/bin/bash

# add the below line to crontab
# */1 * * * * cd /home/ubuntu/code/server_planes && ./auto_deploy.sh > /dev/null

git remote update

LOCAL=$(git rev-parse @)

REMOTE=$(git rev-parse "origin/master")

if [ $LOCAL = $REMOTE ];then
 echo "up-to-date" > /dev/null
else
 git checkout master
 git pull && npm install && sudo pm2 reload server_planes
fi
