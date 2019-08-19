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
        if (messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '302-9677440-1305137' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '408-8248200-8085958' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-8549315-1676240' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '404-9850279-8795565' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-0689075-8973830' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '403-0234167-5670757' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '305-6376198-9669109' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-6366273-7146654' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '408-8300315-9981132' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-0869055-4511420' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '304-1416554-3013113' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '114-3233816-4537044' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '701-8459698-6500207' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '404-4972388-6168347' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '114-6384645-5969048' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-9454993-1490635' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '701-7591250-2999402' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-9371013-2544224' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-0540016-9237823' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-4045605-4709055' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-3878244-5725033' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '250-4930076-9490257' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '112-8360987-9572265' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '204-5559000-7861942' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '701-7898641-1809050' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '303-3522036-9157167' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '503-8822073-9026259' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '503-2459336-9094238' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-2414689-5313838' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-8612719-3321049' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-6760316-6005866' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '112-6607167-7156228' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '112-1378634-6973058' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '701-6276844-7293045' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '206-3851290-0006739' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '112-0268793-0481004' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '408-2000089-1616338' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '407-0671379-4543562' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-9016991-9274651' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '114-1157992-0469845' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '304-4071056-2937932' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '305-5344244-0939512' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-7929044-1062613' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '114-2817611-7068261' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '249-0772245-9222209' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-3002215-5658603' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '112-0519706-6737052' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '114-5165110-3000209' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '114-4588824-7328241' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-7221421-9781811' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '112-2813891-7093851' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '112-2813891-7093851' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '112-2386352-6177801' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '114-7288755-4473814' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '408-8873578-2301122' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '405-6849664-1551554' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '402-6898352-2943507' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '304-2224691-0724343' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '403-0539134-5689968' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '205-1765819-9400327' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '701-4531865-8973043' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '112-6594469-2784236' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '112-1564002-4931464' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-8686970-3041862' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '702-1873782-6218649' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-3860863-3837836' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '403-7869299-4674767' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-5145878-5808219' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '114-6689804-4254646' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '205-5903421-0732302' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '026-2830535-2302738' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '304-9113333-8035503' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-5286408-2534640' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-0664689-3233029' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '112-4961615-1957811' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '203-9722466-3124322' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '112-6114728-9746663' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '206-2259189-2581132' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '113-6790444-3275438' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '114-7549353-5589814' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '111-2075374-6155460' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '702-0278899-7296208' || messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] === '303-7579710-7969942') {
            // console.log(messageData.content.match(/[0-9]{3}-[0-9]{7}-[0-9]{7}/g)[0] + ": 该订单编号数据不提示");
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