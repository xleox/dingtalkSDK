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
var addSendMessageMission = function(messageData){
    var temp = {touser: messageData.userID, agentid: "210810582"};
    if (messageData.type === 'text') {
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
        // console.log('消息发送', msg);
        return new Promise(function(resolve, reject){resolve(msg);});
    }).catch(err=>{
        // console.log(err);
        return new Promise(function(resolve, reject){reject(err);});
    })
};

router.post('/sendMessage',(req,res)=>{
    // console.log(req.body);
    if (req.body.type === undefined || req.body.content === undefined || req.body.type === '' || req.body.content === '') {
        res.send('格式错误');
        return;
    }
    var messageData = {
        type: req.body.type,
        title: req.body.title,
        userID: req.body.userID || 'manager1170|2156526054947871|215741075732367681|216039696838983459|116234674436480417|21565119341042799|220034443029640124|152263051426467241|2169332642841261|1333115857853755|1329376335850257|21573503281225898|094367066829863680',
    };
    if (req.body.type !== 'text') {
        messageData.content = JSON.parse(req.body.content);
    } else {
        if (req.body.content.indexOf('等') !== -1) {
            console.log(req.body.content + "等物流单号状态，不提示！！！");
            return;
        } else {
            console.log("钉钉消息提示内容", req.body.content);
            messageData.content = req.body.content;
        }
        console.log("具体信息", messageData);
    }
    addSendMessageMission(messageData);
    res.send('ok');
});

module.exports = router;