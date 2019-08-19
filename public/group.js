'use strict';

// 订单提示分组
exports.groupDisplay = (parameter) => {
    let userID = '';
    if (parameter === '运营一组') {
        userID = 'manager1170|2156526054947871|216039696838983459|21565119341042799|215741075732367681|21573503281225898|211219156426276550|290856165835430277';
    } else if (parameter === '运营二组') {
        userID = 'manager1170|2156526054947871|216039696838983459|21565119341042799|215741075732367681|152263051426467241|220034443029640124';
    } else if (parameter === '运营三组') {
        userID = 'manager1170|2156526054947871|216039696838983459|21565119341042799|215741075732367681|2169332642841261';
    } else if (parameter === '运营四组') {
        userID = 'manager1170|2156526054947871|216039696838983459|21565119341042799|215741075732367681';
    } else {
        userID = 'manager1170|2156526054947871|216039696838983459|21565119341042799|215741075732367681';
    }
    return userID;
};
// 物流消息分组
exports.matchGroupDisplay = (contentStr) => {
    let userID = '';
    if (contentStr.match(/<运营一组>/g) !== null) {
        userID = 'manager1170|2156526054947871|216039696838983459|21565119341042799|21573503281225898|211219156426276550|290856165835430277';
    } else if (contentStr.match(/<运营二组>/g) !== null) {
        userID = 'manager1170|2156526054947871|216039696838983459|21565119341042799|152263051426467241|220034443029640124';
    } else if (contentStr.match(/<运营三组>/g) !== null) {
        userID = 'manager1170|2156526054947871|216039696838983459|21565119341042799|2169332642841261';
    } else if (contentStr.match(/<运营四组>/g) !== null) {
        userID = 'manager1170|2156526054947871|216039696838983459|21565119341042799';
    } else {
        userID = 'manager1170|2156526054947871|216039696838983459|21565119341042799';
    }
    return userID;
};
