#!/bin/bash

# Ubuntu 定时执行 .sh 脚本
# sudo vim /etc/crontab
# 然后加入一下这行：
# */1 * * * * cd ubuntu /home/ubuntu/code/server_planes && ./auto_deploy.sh > /dev/null
# nohup ./auto_deploy.sh &

while true
do
  git remote update
	LOCAL=$(git rev-parse @)
	REMOTE=$(git rev-parse "origin/master")
	if [ $LOCAL = $REMOTE ];then
	 echo "up-to-date" > /dev/null
	else
	 git checkout master
	 git pull && npm install && pm2 reload server_planes #当前 pm2 运行的名字
	fi	
  sleep 30
done

