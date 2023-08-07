const fs = require('fs');

const readMessagesFromFile = () => {
    try {
        const data = fs.readFileSync('messages.txt', 'utf8');
        return data.split('\n').filter((message) => message.trim() !== '');
    } catch (err) {
        return [];
    }
};

const appendMessageToFile = (message) => {
    fs.appendFileSync('messages.txt', message + '\n');
};

// res.setHeader('Content-Type', 'text/html');

const  requestHandler=(req,res)=>{
    const url = req.url;
const method = req.method;
    if (url === '/') {
        // Read messages from the file
        const messages = readMessagesFromFile();
        
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body>');

        res.write('<div>');
        messages.forEach((message) => {
            res.write(`<p>${message}</p>`);
        });
        res.write('</div>');

        res.write("<form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form>");
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];

            
            appendMessageToFile(message);

            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    } else {
        res.statusCode = 404;
        res.write('<html><body><p>Page not found erro</p></body></html>');
        return res.end();
    } 
    
    
}


module.exports=requestHandler;

// modulele.exports={
//     handler:requestHandler,
//     sometext:"some test is written";

// };
// module.exports.handler=requestHandler;
// module.exports.someText='some text is written';
// exports.handler= requestHandler;
// exports.someText='some text is writetn';