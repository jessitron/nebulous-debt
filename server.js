// server.js
// where your node app starts

// init project
const express = require('express');
var browserify = require('browserify-middleware');
var automationClient = require('@atomist/automation-client');
var antlr = require('@atomist/antlr');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.


//provide browserified versions of all the files in the script directory
app.use('/js', browserify(__dirname + '/script'));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


function stn(tn) {
    const children = (tn.$children || []).map(stn);
    return {
        name: tn.$name,
        children,
        value: children.length > 0 ? undefined : tn.$value
    }
}

app.post('/parse/', async function(request, response) {
  console.log("I got something");
  console.log(request.body);
  
  const content = request.body.fileContent;
  const pxe = request.body.pxe;
  
  const f = new automationClient.InMemoryProjectFile("src/main/java/Foo.java", content);
        let terminalCount = 0;
        const ast = await antlr.JavaFileParser.toAst(f)
  
  
  response.send({ data: stn(ast) });
}); 

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
