const express = require('express');
const router = express.Router();
const DingTalk = require('node-dingtalk');
const Promise = require("bluebird");
const options = require('../public/config');
const dingtalk = new DingTalk(options);
const Group = require('../public/group');
const shield = require("../public/shield");

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
        if (messageData.content.match(/监控平台发货单号\([A-Z]{2}[0-9]{9}[A-Z]{2}\)与工厂发货单号\([A-Z]{2}[0-9]{9}SG\)不符/g) !== null) {
            console.log(messageData.content, "新加坡小包修改，不提示!!!");
            return;
        }
        let orderID = messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0];
        if (shield.shieldList.indexOf(orderID) > -1) {
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
        if (Number(messageData.content.数量) > 1) {
            temp.oa.body.form.push({
                key: "数量：",
                value: Number(messageData.content.数量)
            })
        }
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
// 添加入库提示
router.post('/receiveMessage', (req, res) => {
    let dingData = req.body;
    let temp = {
        touser: Group.warehouseDisplay(),
        agentid: '210810582',
        msgtype: 'oa',
        oa: {
            head: {
                bgcolor: 'FFBBBBBB',
                text: 'FBA提交入库'
            },
            body: {
                title: `FBA入库：${dingData['账号名称']} (${dingData['所属组']})`,
                form: [
                    {
                        key: 'SKU：',
                        value: dingData['SKU']
                    }, {
                        key: 'ASIN：',
                        value: dingData['ASIN']
                    }, {
                        key: '产品名称：',
                        value: dingData['产品名称']
                    }, {
                        key: '新增或补仓：',
                        value: dingData['新增或补仓']
                    }, {
                        key: '数量：',
                        value: dingData['数量']
                    }
                ],
                image: dingData['产品图片'],
                author: '销售监控平台'
            }
        }
    };
    dingtalk.message.send(temp).then(msg => {
        res.send(`ok: ${msg.message}`);
    }).catch(err => {
        res.send(`error: ${err.message}`);
    })
})

module.exports = router;