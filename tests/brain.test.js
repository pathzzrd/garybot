const expect  = require('chai').expect;
const Botmock = require('botkit-mock');

const Process = require('../lib/sub_process');

describe("Brain Test", () => {

  it("is able to call brain.py with nonzero exit", async()=>{
    try {
      const result = await Process.execute('python', ['/gary/scripts/brain.py', "hell world"]);
      console.log(result);
      expect (result.stdout).to.not.be.null;
      const items = result.stdout.split("\n");
      console.log(items);
      for (i in items) {
        if (items[i] !== 'None') {
          response = items[i]; 
          break;
        }
      }
      console.log('response', response);
    } catch (err) {
      console.log(err);
      expect(err).to.be.null;
    }

  });

});
