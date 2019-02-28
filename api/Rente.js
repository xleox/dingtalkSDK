const express = require('express');
const router = express.Router();
const DingTalk = require('node-dingtalk');
const options = require('../public/config');
const dingtalk = new DingTalk(options);
const Promise = require("bluebird");

router.get('/',(req,res)=>{
    res.send('node-dingtalk Sever Start');
});
// 发送出单消息提醒
var addSendMessageMission = function(message){
    dingtalk.message.send({
        touser: message.senduserId,
        agentid: "210810582",
        msgtype: "oa",
        oa: {
            pc_message_url: message.messageUrl,
            message_url: message.messageUrl,
            head: {
                bgcolor: "FFBBBBBB",
                text: "账号出单"
            },
            body: {
                title: '出单：' + message.messageName + ' (' + message.messagePrincipal + ')',
                form: [{
                        key: "订单编号：",
                        value: message.messageOrderNumber
                    }, {
                        key: "SKU：",
                        value: message.messageShopSku
                    }, {
                        key: "销售渠道：",
                        value: message.messageSaleDitch
                    }, {
                        key: "金额：",
                        value: message.messageShopPrice
                }],
                content: message.messageShopName,
                image: message.picUrl.replace(/SX55/, "SX500"),
                author: "Amazon"
            }
        }
    }).then(msg=>{
        // console.log('消息发送', msg);
        return new Promise(function(resolve, reject){resolve(msg);});
    }).catch(err=>{
        // console.log(err);
        return new Promise(function(resolve, reject){reject(err);});
    })
};

router.post('/sendMessage',(req,res)=>{
    if (req.body.messageUrl === undefined || req.body.picUrl === undefined || req.body.messagePrincipal === undefined || req.body.messageName === undefined || req.body.messageOrderNumber === undefined || req.body.messageShopName === undefined || req.body.messageShopSku === undefined || req.body.messageShopPrice === undefined || req.body.messageSaleDitch === undefined || req.body.senduserId === undefined) {
        res.send('格式错误');
        return;
    }
    if (req.body.messageUrl === '' || req.body.picUrl === '' || req.body.messagePrincipal === '' || req.body.messageName === '' || req.body.messageOrderNumber === '' || req.body.messageShopName === '' || req.body.messageShopSku === '' || req.body.messageShopPrice === '' || req.body.messageSaleDitch === '' || req.body.senduserId === '') {
        res.send('格式错误');
        return;
    }
    var message = {
        messageUrl: req.body.messageUrl,
        picUrl: req.body.picUrl,
        messagePrincipal: req.body.messagePrincipal,
        messageName: req.body.messageName,
        messageOrderNumber: req.body.messageOrderNumber,
        messageShopName: req.body.messageShopName,
        messageShopSku: req.body.messageShopSku,
        messageShopPrice: req.body.messageShopPrice,
        messageSaleDitch: req.body.messageSaleDitch,
        senduserId: req.body.senduserId,
    };
    addSendMessageMission(message);
});


// 发送文本消息
var addSendTextMessageMission = function(messageData){
    dingtalk.message.send({
        touser: messageData.userId,
        agentid: "210810582",
        msgtype: "link",
        link: {
            "title": messageData.textTitle,
            "text": messageData.textContent
         }
    }).then(msg=>{
        console.log('消息发送', msg);
        return new Promise(function(resolve, reject){resolve(msg);});
    }).catch(err=>{
        // console.log(err);
        return new Promise(function(resolve, reject){reject(err);});
    })
};

router.post('/sendTextMessage',(req,res)=>{
    if (req.body.userId === undefined || req.body.textTitle === undefined || req.body.textContent === undefined) {
        res.send('格式错误');
        return;
    }
    if (req.body.userId === '' || req.body.textTitle === '' || req.body.textContent === '') {
        res.send('格式错误');
        return;
    }
    var messageData = {
        userId: req.body.userId,
        textTitle: req.body.textTitle,
        textContent: req.body.textContent,
    };
    addSendTextMessageMission(messageData);
});

module.exports = router;