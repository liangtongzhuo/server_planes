#!/bin/bash
# 自动部署
# 1.录下执行 pm2 start index.js  --name server_planes
# 2.目录下执行下列语句，后台启动 shell，日志输出到 auto_deploy.log
# nohup ./auto_deploy.sh > auto_deploy.log 2>&1 &
# jobs -l 查看后台运行的脚步的 id，
# kill id 杀死脚本

while true
do
  git remote update
	LOCAL=$(git rev-parse @)
	REMOTE=$(git rev-parse "origin/master")
	if [ $LOCAL = $REMOTE ];then
	  echo "up-to-date"
	else
	  git checkout master
	  git pull && npm install && pm2 reload server_planes #当前 pm2 运行的名字
	fi	
  sleep 30 #每 30 秒循环一次
done

