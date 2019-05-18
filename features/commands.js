/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    controller.hears(/^!\w+/, ['message','direct_message'], async function (bot, message) {
        var c = /^!(\w+) ?(.*)$/.matchAll(message.text);
        await bot.replyEphemeral(message, `lol ${c[1]}`);
    });

    function getCommand(message) {

    }
}
