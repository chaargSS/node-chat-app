const expect = require('expect');
const {generateMessage} = require('./utils/message');

describe('generateMessage',()=>{

        it("should generate right message object",()=>{
             var from='juli';
             var text='wana meet at evening';
            var message = generateMessage(from,text);

            expect(message.from).toBe('juli'); //expect(message.from).toBe(from);//expect(message.from).toinclude({ from,text});
             expect(message.text).toBe(text);
             expect(message.createdAt).toBeA('number');
             
        });
})

