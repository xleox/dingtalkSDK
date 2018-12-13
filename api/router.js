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
            title: message.messageInfo.名称 + ' (' + message.messageInfo.负责人 + ')',
            text: message.messageInfo.订单编号 + ' \n' + message.messageInfo.商品详情[0].商品名称.slice(0, 20) + '... \n' + message.messageInfo.商品详情[0].SKU + ' \n' + message.messageInfo.金额 + ' \n' + message.messageInfo.销售渠道
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
    console.log(req.body, req.body.messageInfo);
    if (req.body.messageUrl === undefined || req.body.picUrl === undefined || req.body.messageInfo === undefined || req.body.senduserId === undefined) {
        res.send('格式错误');
        return;
    }
    if (req.body.messageUrl === '' || req.body.picUrl === '' || req.body.messageInfo === '' || req.body.senduserId === '') {
        res.send('格式错误');
        return;
    }
    var message = {
        messageUrl: req.body.messageUrl,
        picUrl: req.body.picUrl,
        messageInfo: req.body.messageInfo,
        senduserId: req.body.senduserId,
    };
    addSendMessageMission(message);
});

module.exports = router;