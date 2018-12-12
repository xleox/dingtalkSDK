const express = require('express');
const router = express.Router();
const DingTalk = require('node-dingtalk');
const options = require('../public/config');
const dingtalk = new DingTalk(options);

router.get('/',(req,res)=>{
    res.send('node-dingtalk Sever Start');
});



var addSendMessageMission = function(message){

    dingtalk.client.getAccessToken().then(tokRet =>{
        message.sendDepartmentId.forEach(depId=>{
            dingtalk.user.list(depId, [false], [tokRet]).then(use=>{
                use.userlist.forEach(userItem=>{
                    if (userItem.userid === '2156526054947871') {
                        return;
                    }
                    dingtalk.message.send({
                        touser: userItem.userid,
                        agentid: "210810582",
                        msgtype: "link",
                        link: {
                            messageUrl: message.messageUrl,
                            picUrl: message.picUrl,
                            title: message.messageTitle,
                            text: message.messageText
                        }
                    }).then(msg=>{
                        // console.log('消息发送', msg);
                        return new Promise(function(resolve, reject){resolve(msg);});
                    }).catch(err=>{
                        // console.log(err);
                        return new Promise(function(resolve, reject){reject(err);});
                    })
                });
            })
        })
    });
};

router.post('/sendMessage',(req,res)=>{
    // console.log(req.body);
    if (req.body.messageUrl === undefined || req.body.picUrl === undefined || req.body.messageTitle === undefined || req.body.messageText === undefined || req.body.sendDepartmentId === undefined) {
        res.send('格式错误');
        return;
    }
    if (req.body.messageUrl === '' || req.body.picUrl === '' || req.body.messageTitle === '' || req.body.messageText === '' || req.body.sendDepartmentId === '') {
        res.send('格式错误');
        return;
    }
    var message = {
        messageUrl: '',
        picUrl: '',
        messageTitle: '',
        messageText: '',
        sendDepartmentId: [],
    };
    message.messageUrl = req.body.messageUrl;
    message.picUrl = req.body.picUrl;
    message.messageTitle = req.body.messageTitle;
    message.messageText = req.body.messageText;
    message.sendDepartmentId = req.body.sendDepartmentId;
    addSendMessageMission(message);
});

module.exports = router;