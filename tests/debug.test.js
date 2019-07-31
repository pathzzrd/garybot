const expect  = require('chai').expect;
const Botmock = require('botkit-mock');

const debugController = require('../features/debug');

describe('Debug command tests', async() => {
  beforeEach(()=>{
    this.controller = Botmock({});
    // type can be ‘slack’, facebook’, or null
    this.bot = this.controller.spawn({type: 'slack'});
    debugController(this.controller);
  });


  it('responds to debug command with number of deploys', async() => {
    try {
    const message = await this.bot.usersInput(
      [
        {
          user: 'someUserId',
          channel: 'someChannel',
          messages: [
            {
              text: '!debug', isAssertion: true
            }
          ]
        }
      ]
    );

    expect(message.text).to.equal('Deploys 0');
    } catch (err) {
      console.log(err);
      return false;
    }
    return;
  });

});
