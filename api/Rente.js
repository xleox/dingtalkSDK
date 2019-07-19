const express = require('express');
const router = express.Router();
const DingTalk = require('node-dingtalk');
const options = require('../public/config');
const Group = require('../public/group');
const dingtalk = new DingTalk(options);
const Promise = require("bluebird");

router.get('/',(req,res)=>{
    res.send('node-dingtalk Sever Start');
});
// 发送出单消息提醒
var addSendMessageMission = function(messageData){
    var temp = {touser: messageData.userID, agentid: "210810582"};
    if (messageData.type === 'text') {
        if (messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g) === null) {
            console.log(messageData.content, "数据格式错误");
            return;
        }
        if (messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '302-9677440-1305137' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '408-8248200-8085958' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-8549315-1676240' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '404-9850279-8795565' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-0689075-8973830' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '403-0234167-5670757' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '305-6376198-9669109' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-6366273-7146654' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '408-8300315-9981132' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-0869055-4511420' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '304-1416554-3013113' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '114-3233816-4537044' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '701-8459698-6500207' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '404-4972388-6168347' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '114-6384645-5969048' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-9454993-1490635' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '701-7591250-2999402' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-9371013-2544224' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-0540016-9237823' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-4045605-4709055' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-3878244-5725033' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '250-4930076-9490257' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '112-8360987-9572265' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '204-5559000-7861942' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '701-7898641-1809050') {
            console.log(messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] + ": 该订单编号数据不提示");
            return;
        }
        temp.msgtype = 'text';
        temp.text = {
            "content": messageData.content
        };
    } else {
        temp.msgtype = 'oa';
        temp.oa = {
            pc_message_url: 'https://www.'+ messageData.content.销售渠道 + '/gp/product/' + messageData.content.ASIN,
            message_url: 'https://www.'+ messageData.content.销售渠道 + '/gp/product/' + messageData.content.ASIN,
            head: {
                bgcolor: "FFBBBBBB",
                text: "账号出单"
            },
            body: {
                title: '出单：' + messageData.content.名称 + ' (' + messageData.content.负责人 + ')',
                form: [{
                    key: "订单编号：",
                    value: messageData.content.订单编号
                }, {
                    key: "SKU：",
                    value: messageData.content.SKU
                }, {
                    key: "销售渠道：",
                    value: messageData.content.销售渠道
                }, {
                    key: "金额：",
                    value: messageData.content.金额
                }],
                content: messageData.content.商品名称,
                image: messageData.content.商品图片.replace(/SX55/, "SX500"),
                author: "Amazon"
            }
        };
    }
    dingtalk.message.send(temp).then(msg=>{
        return new Promise(function(resolve, reject){resolve(msg);});
    }).catch(err=>{
        return new Promise(function(resolve, reject){reject(err);});
    })
};

router.post('/sendMessage',(req,res)=>{
    if (req.body.type === undefined || req.body.content === undefined || req.body.type === '' || req.body.content === '') {
        res.send('格式错误');
        return;
    }
    var messageData = {
        type: req.body.type,
        title: req.body.title,
    };
    if (req.body.type !== 'text') {
        messageData.userID = Group.groupDisplay(JSON.parse(req.body.content).负责人);
        messageData.content = JSON.parse(req.body.content);
    } else {
        if (req.body.content.match(/等/g) === null) {
            messageData.userID = Group.matchGroupDisplay(req.body.content);
            messageData.content = req.body.content;
        }
    }
    addSendMessageMission(messageData);
    res.send('ok');
});

module.exports = router;