const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./utils/message');

describe('generateMessage',()=>{

        it("should generate right message object",()=>{
             var from='juli';
             var text='wana meet at evening';
            var message = generateMessage(from,text);

            expect(message.from).toBe('juli'); //expect(message.from).toBe(from);//expect(message.from).toinclude({ from,text});
             expect(message.text).toBe(text);
             expect(message.createdAt).toBeA('number');
             
        });
});

describe('generateLocationMessage',()=>{

        it('should generate correct location message',()=>{

                var from='juli';
             var latitude=1;
             var longitude=1;
             var url = 'https://www.google.com/maps?q=1,1';
            var message = generateLocationMessage(from,latitude,longitude);

            expect(message.from).toBe(from); 
             expect(message.url).toBe(url);
             expect(message.createdAt).toBeA('number');
        });
})

