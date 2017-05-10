if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('botkit');
var os = require('os');
var _ = require('lodash');
var mongoStorage = require('botkit-storage-mongo')({ mongoUri: 'mongodb://localhost:27017', tables: ['learns'] });

var controller = Botkit.slackbot({
    debug: true,
    storage: mongoStorage,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

const LEARN = 'learn';
const UNLEARN = 'unlearn';

controller.hears(['(.*)'], 'mention', function(bot, message) {
    console.log('gary hear');
    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'gary',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });


    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Meow.');
        }
    });
});

controller.hears([/^\?(\w+)\s+(\w+)\s*(.+)?/], 'direct_message,ambient', function(bot, message) {
    if (message.match[1] === LEARN && message.match.length > 3) {
        learn(bot, message);
    } else if (message.match[1] === UNLEARN) {
        unlearn(bot, message);
    } else {
        fetch(bot, message);
    }
});


controller.hears([/^\?(\w+)\s*/], 'direct_message,ambient', function(bot, message) {
    // I don't think this gate is required.
    if (message.match[1] !== LEARN && message.match[1] !== UNLEARN) {
        fetch(bot, message);
    }
});


controller.hears(['call me (.*)', 'my name is (.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
    var name = message.match[1];
    controller.storage.users.get(message.user, function(err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.name = name;
        controller.storage.users.save(user, function(err, id) {
            bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
        });
    });
});

controller.hears(['what is my name', 'who am i'], 'direct_message,direct_mention,mention', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name);
        } else {
            bot.startConversation(message, function(err, convo) {
                if (!err) {
                    convo.say('I do not know your name yet!');
                    convo.ask('What should I call you?', function(response, convo) {
                        convo.ask('You want me to call you `' + response.text + '`?', [{
                                pattern: 'yes',
                                callback: function(response, convo) {
                                    // since no further messages are queued after this,
                                    // the conversation will end naturally with status == 'completed'
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'no',
                                callback: function(response, convo) {
                                    // stop the conversation. this will cause it to end with status == 'stopped'
                                    convo.stop();
                                }
                            },
                            {
                                default: true,
                                callback: function(response, convo) {
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        convo.next();

                    }, { 'key': 'nickname' }); // store the results in a field called nickname

                    convo.on('end', function(convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'OK! I will update my dossier...');

                            controller.storage.users.get(message.user, function(err, user) {
                                if (!user) {
                                    user = {
                                        id: message.user,
                                    };
                                }
                                user.name = convo.extractResponse('nickname');
                                controller.storage.users.save(user, function(err, id) {
                                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                                });
                            });



                        } else {
                            // this happens if the conversation ended prematurely for some reason
                            bot.reply(message, 'OK, nevermind!');
                        }
                    });
                }
            });
        }
    });
});


controller.hears(['shutdown'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.startConversation(message, function(err, convo) {

        convo.ask('Are you sure you want me to shutdown?', [{
                pattern: bot.utterances.yes,
                callback: function(response, convo) {
                    convo.say('Bye!');
                    convo.next();
                    setTimeout(function() {
                        process.exit();
                    }, 3000);
                }
            },
            {
                pattern: bot.utterances.no,
                default: true,
                callback: function(response, convo) {
                    convo.say('*Phew!*');
                    convo.next();
                }
            }
        ]);
    });
});


controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention',
    function(bot, message) {

        var hostname = os.hostname();
        var uptime = formatUptime(process.uptime());

        bot.reply(message,
            ':robot_face: I am a bot named <@' + bot.identity.name +
            '>. I have been running for ' + uptime + ' on ' + hostname + '.');

    });

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}

function learn(bot, message) {
    var id = message.match[2],
        value = message.match[3];

    controller.storage.learns.get(id, function(error, currentValue) {
        if (error) {
            currentValue = [];
        } else {
            try {
                currentValue = JSON.parse(currentValue.value);
            } catch (e) {
                console.error('#learn JSON.parse ', e);
                bot.reply('Uh-oh no no!')
            }
        }

        var newValue = JSON.stringify(currentValue.concat([value]));

        controller.storage.learns.save({ id: id, value: newValue }).then(function() {
            bot.reply(message, 'Okay, learned "' + value + '" to ' + id + '.');
        });
    });
}

function fetch(bot, message) {
    var id = message.match[1],
        response_id = message.match[2];

    console.log('getting ' + id + ',' + response_id);
    controller.storage.learns.get(id, function(error, value) {
        console.log(value, error);
        if (error) {
            bot.reply(message, "Sorry, I don't know anything about \"" + id + ".\"");
            return;
        }
        var responses = [];
        try {
            responses = JSON.parse(value.value);
        } catch (e) {
            console.error('#fetch JSON.parse ', e);
            bot.reply('Uh-oh no no!')
        }
        if (isNaN(response_id)) {
            bot.reply(message, _.sample(responses));
        } else {
            bot.reply(message, responses[response_id - 1]);
        }
    });
}

function unlearn(bot, message) {
    var id = message.match[2],
        response_id = message.match[3];

    if (typeof response_id === 'undefined') {
        bot.reply(message, "Sorry, I need to know what to forget about \"" + id + ".\"");
        return;
    }

    controller.storage.learns.get(id, function(error, value) {
        if (error) {
            bot.reply(message, "Sorry, I can't unlearn things that I don't know!");
            return;
        }

        var responses = [];
        try {
            responses = JSON.parse(value.value);
        } catch (e) {
            console.error('#unlearn JSON.parse ', e);
            bot.reply('Uh-oh no no!')
            return;
        }

        if (isNaN(response_id)) {
            responses = responses.filter(function(response) {
                return response !== response_id;
            });
        } else {
            responses.splice(response_id - 1, 1);
        }

        var responses_json = JSON.stringify(responses);
        controller.storage.learns.save({ id: id, value: responses_json }).then(function() {
            bot.reply(message, "Okay, I've forgotten that about \"" + id + ".\"")
        });
    });

}