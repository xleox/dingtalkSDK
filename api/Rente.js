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
        temp.link = {
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
    console.log('temp', temp);
    dingtalk.message.send(temp).then(msg=>{
        console.log('消息发送', msg);
        return new Promise(function(resolve, reject){resolve(msg);});
    }).catch(err=>{
        // console.log(err);
        return new Promise(function(resolve, reject){reject(err);});
    })
};

router.post('/sendMessage',(req,res)=>{
    console.log(req.body);
    if (req.body.userID === undefined || req.body.title === undefined || req.body.type === undefined || req.body.content === undefined) {
        res.send('格式错误');
        return;
    }
    if (req.body.userID === '' || req.body.title === '' || req.body.type === '' || req.body.content === '') {
        res.send('格式错误');
        return;
    }
    var messageData = {
        type: req.body.type,
        title: req.body.title,
        userID: req.body.userID,
    };
    if (req.body.type !== 'text') {
        messageData.content = JSON.parse(req.body.content);
    } else {
        messageData.content = req.body.content;
    }
    addSendMessageMission(messageData);

    // if (req.body.messageUrl === undefined || req.body.picUrl === undefined || req.body.messagePrincipal === undefined || req.body.messageName === undefined || req.body.messageOrderNumber === undefined || req.body.messageShopName === undefined || req.body.messageShopSku === undefined || req.body.messageShopPrice === undefined || req.body.messageSaleDitch === undefined || req.body.senduserId === undefined) {
    //     res.send('格式错误');
    //     return;
    // }
    // if (req.body.messageUrl === '' || req.body.picUrl === '' || req.body.messagePrincipal === '' || req.body.messageName === '' || req.body.messageOrderNumber === '' || req.body.messageShopName === '' || req.body.messageShopSku === '' || req.body.messageShopPrice === '' || req.body.messageSaleDitch === '' || req.body.senduserId === '') {
    //     res.send('格式错误');
    //     return;
    // }
    // var message = {
    //     messageUrl: req.body.messageUrl,
    //     picUrl: req.body.picUrl,
    //     messagePrincipal: req.body.messagePrincipal,
    //     messageName: req.body.messageName,
    //     messageOrderNumber: req.body.messageOrderNumber,
    //     messageShopName: req.body.messageShopName,
    //     messageShopSku: req.body.messageShopSku,
    //     messageShopPrice: req.body.messageShopPrice,
    //     messageSaleDitch: req.body.messageSaleDitch,
    //     senduserId: req.body.senduserId,
    // };
    // addSendMessageMission(message);
});


// 发送文本消息
// var addSendTextMessageMission = function(messageData){
//     dingtalk.message.send({
//         touser: messageData.userId,
//         agentid: "210810582",
//         msgtype: "link",
//         link: {
//             "title": messageData.textTitle,
//             "text": messageData.textContent
//          }
//     }).then(msg=>{
//         console.log('消息发送', msg);
//         dingtalk.message.listMessageStatus(msg.messageId)
//             .then(doc=>{
//                 console.log("消息状态", doc);
//             })
//         // return new Promise(function(resolve, reject){resolve(msg);});
//     }).catch(err=>{
//         console.log(err);
//         // return new Promise(function(resolve, reject){reject(err);});
//     })
// };
//
// router.post('/sendTextMessage',(req,res)=>{
//     if (req.body.userId === undefined || req.body.textTitle === undefined || req.body.textContent === undefined) {
//         res.send('格式错误');
//         return;
//     }
//     if (req.body.userId === '' || req.body.textTitle === '' || req.body.textContent === '') {
//         res.send('格式错误');
//         return;
//     }


// {
//     touser: messageData.userID,
//         agentid: "210810582",
//     msgtype: messageData.type,
//     oa: {
//     pc_message_url: message.messageUrl,
//         message_url: message.messageUrl,
//         head: {
//         bgcolor: "FFBBBBBB",
//             text: "账号出单"
//     },
//     body: {
//         title: '出单：' + message.messageName + ' (' + message.messagePrincipal + ')',
//             form: [{
//             key: "订单编号：",
//             value: message.messageOrderNumber
//         }, {
//             key: "SKU：",
//             value: message.messageShopSku
//         }, {
//             key: "销售渠道：",
//             value: message.messageSaleDitch
//         }, {
//             key: "金额：",
//             value: message.messageShopPrice
//         }],
//             content: message.messageShopName,
//             image: message.picUrl.replace(/SX55/, "SX500"),
//             author: "Amazon"
//     }
// }
// }


//
//     addSendTextMessageMission(messageData);
//     // res.send('ok');
// });

module.exports = router;