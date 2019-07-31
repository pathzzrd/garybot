const expect  = require('chai').expect;
const Botmock = require('botkit-mock');

const corpusController = require('../features/corpus');

describe('Corpus command tests', () => {
  afterEach(() => {
		//clean up botkit tick interval
		this.controller.shutdown();
	});


  beforeEach(()=>{
    this.controller = Botmock({});
    // type can be ‘slack’, facebook’, or null
    this.bot = this.controller.spawn({type: 'slack'});
    corpusController(this.controller);
  });


  it('responds with a jons brain mock', async(done) => {
    try {
    const message = await this.bot.usersInput(
      [
        {
          user: 'someUserId',
          channel: 'someChannel',
          messages: [
            {
              text: '!corpus hell world', isAssertion: true
            }
          ]
        }
      ]
    );
    console.log(message.text);
    expect(message.text).to.equal(undefined);
    done();
    } catch (err) {
      console.log(err);
      done(err);
      return false;
    }
    return;
  });

});
