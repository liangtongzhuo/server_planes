'use strict'

let g_data = { arr: [] }; //全局数据保存
const ws = require('ws');
const wss = new ws.Server({ port: 4001 }, () => {
  console.log('服务器启动');
});

wss.on('headers', (params, req) => {
  // console.log('headers:', params);
  // console.log('req:', req);
});

wss.on('error', (params) => {
  console.log('服务器 error:', params);
});

// socket
wss.on('connection', (ws, req) => {
  // console.log('有 Socket 来了');
  // console.log('ip:', req.headers.host);
  // console.log('url:', req.url);

  ws.on('message', (newData) => {
    //更新状态
    idUpdateAircraft(newData)
  });

  ws.on('error', (params) => {
    console.log('wsError:', params);
  });

  ws.on('close', (params) => {
    console.log('wsClose:', params);
    g_data.close = true;
  });

  ws.on('headers', (params) => {
    console.log('wsHeaders:', params);
  });

  //发送消息
  // ws.send('连接成功', (error) => {
  //   if (error) console.log('发送 error:', error);
  // });
});

// 广播
function broadcast() {
  wss.clients.forEach((ws) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(g_data));
    }
  });

  // 清空飞机
  g_data.enemy = undefined;
  // 清空用户飞机
  g_data.arr = [];
  
  g_data.close = false;
};

setInterval(broadcast, 1000 / 30);

// 创建飞机
setInterval(() => {
  g_data.enemy = {
    time: new Date().getTime(),
    speed: parseInt(5 + Math.random() * 10),
    x: Math.random() * 0.8 + 0.1
  }
}, 1000);

/**
 * 判断 id 是否存在，设置飞机参数
 */
function idUpdateAircraft(newData) {
  newData = JSON.parse(newData);
  for (let i = 0; i < g_data.arr.length; i++) {
    if (g_data.arr[i].id === newData.id) {
      g_data.arr[i] = newData;
      return;
    }
  }
  g_data.arr.push(newData);
}


