
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
module.exports = function(controller) {

    const fetch = require('node-fetch');

    const uri = 'http://api.openweathermap.org/data/2.5/weather';

    // !weather
    controller.hears(/^!weather/i, ['message','direct_message'], async function(bot, message) {
        // removes command
        let tokens = message.text.split(' ')
        tokens.shift();
        let str = tokens.join(' ').trim();

        let response = await fetch(`${uri}?q=${str}&APPID=${process.env.openWeatherApiKey}&units=metric`);
        let data = await response.json();



        await bot.reply(message,{
            blocks: [
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `Weather for *${data.name}*\n${data.main.temp}ºC ${data.weather.description}\n`
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": `http://openweathermap.org/img/wn/${data.weather.icon}@2x.png`,
                        "alt_text": `${data.weather.main}`
                    }
                }
            ]
        });

    });

}
