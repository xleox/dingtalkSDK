const express = require('express');
const router = express.Router();
const DingTalk = require('node-dingtalk');
const options = require('../public/config');
const dingtalk = new DingTalk(options);

router.get('/',(req,res)=>{
    res.send('node-dingtalk Sever Start');
});

var addSendMessageMission = function(message){
    dingtalk.message.send({
        touser: message.senduserId,
        agentid: "210810582",
        msgtype: "link",
        link: {
            messageUrl: message.messageUrl,
            picUrl: message.picUrl,
            title: '####账号：' + message.messageName + ' (' + message.messagePrincipal + ')',
            text: '######订单编号：' + message.messageOrderNumber + ' \n' + message.messageShopName.slice(0, 80) + '... \n' + '######SKU：' + message.messageShopSku + ' \n' + '######金额：' + message.messageShopPrice + ' \n' + '销售渠道：' + message.messageSaleDitch,
            file_count: "7",
        }
    }).then(msg=>{
        console.log('消息发送', msg);
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

module.exports = router;