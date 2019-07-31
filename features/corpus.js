
const Process = require('../lib/sub_process');
/**
 * Copyright (c) My Dick Corporation. All rights reserved.
 */
module.exports = (controller) =>{

    controller.hears(/^!corpus/i, ['message','direct_message'], async (bot, message) => {
        // removes command
        const tokens = message.text.split(' ')
        tokens.shift();
        let str = tokens.join(' ').trim().toLowerCase();
        if (str == '') {
          str = "i dont know";
        }
        let response = "";
        console.log("calling corpus with " + str);
        try {
          const result = await Process.execute('python', ['/gary/scripts/brain.py', ""+str]);
          console.log("result " , result);
          const items = result.stdout.split("\n");
          for(i in items) {
            if (items[i] !== 'None') {
              response = items[i];
              break;
            }
          }
        } catch (e) {
          console.log(e);
          response = "brain fault";
        }
        if (!response) {
          response = "empty";
        }

        await bot.reply(message, { text: response });
    });

}
