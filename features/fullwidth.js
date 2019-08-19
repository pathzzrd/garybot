/**
 * Copyright my ass. All rights reserved.
 * Licensed under the MYASS License.
 */
module.exports = function(controller) {

    const fullwidth = (text) => {
        let output = ""
        for (let i = 0; i < text.length; i++) {
            let character = text.charCodeAt(i);
            if (character == 32) {
                output = output + String.fromCharCode(0x3000);
            } else if (character > 0x20  && character < 0x7F) {
                output = output + String.fromCharCode(0xFF00 - 0x20 + character);
            } else {
                output = output + String.fromCharCode(character);
            }
        }
        return output;
    }

    // !fullwidth
    controller.hears(/^!(fullwidth|fw)/i, ['message','direct_message'], async function(bot, message) {
        // removes command
        let tokens = message.text.split(' ')
        tokens.shift();
        let str = tokens.join(' ');

        await bot.reply(message,{ text: fullwidth(str) });
    });

}
