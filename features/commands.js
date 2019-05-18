/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    controller.hears(/^!\w+/, ['message','direct_message'], async function (bot, message) {
        regex = /^!(\w+) ?(.*)$/;
        var text = message.text;
        var matches = [...text.matchAll(regex)];
        console.log(matches);
        await bot.reply(message, `lol ${matches.join()}`);
    });

    function getCommand(message) {

    }
}
