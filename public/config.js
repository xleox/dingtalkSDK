'use strict';

module.exports = {
    "host": "https://oapi.dingtalk.com",
    "corpid": process.env.NODE_DINGTALK_TEST_CORPID || "dinge92817500342721c35c2f4657eb6378f",
    "corpsecret": process.env.NODE_DINGTALK_TEST_CORPSECRET || "U7hsfyqEbf5x4oFqFtq55O9rmX9TdMltrwNK7Sjs6gfuuaDYEyt-OhNVfwR6k3dF",
    "agentid": process.env.NODE_DINGTALK_TEST_AGENTID || "210810582",
    "appid": process.env.NODE_DINGTALK_TEST_APPID || 'dingo7i9yamlwkxx2h2t',
    "appsecret": process.env.NODE_DINGTALK_TEST_APPSECRET || 'b0SaOn9puowh3VMfhY6pa1cAziERxtR7Wo5ePLjXXAyk1mdjNfDanCwiemt77DjS',
    "requestOpts": {
        "timeout": 60000
    }
};
