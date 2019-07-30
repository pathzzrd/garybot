
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

        let response = await fetch(`${uri}?q=${str}&APPID=${process.env.openWeatherApiKey}`);
        let data = await response.json();

        await bot.reply(message,{ text: data });
    });

}
