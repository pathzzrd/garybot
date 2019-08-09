
/**
 * copyright (c) my diq 
 * licensed under the  my bolls.
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

        if (data.cod != "200") {
            await bot.reply(message, {text: data.message });
        } else {

            let far = data.main.temp * (9/5) + 32;
            let text = `${data.name} - ${data.weather[0].description}\n\n*${data.main.temp}ºC / ${far.toFixed(2)}ºF*\n ${data.main.humidity}% humidity`;
            let image_url = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            let alt_text = `${data.weather[0].main}`;

            await bot.reply(message,{
                blocks: [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": text
                        },
                        "accessory": {
                            "type": "image",
                            "image_url": image_url,
                            "alt_text": alt_text
                        }
                    }
                ]
            });
        }

    });
}
