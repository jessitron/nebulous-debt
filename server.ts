// server.js
// where your node app starts

// init project
import express from 'express';
import browserify from 'browserify-middleware';
import * as automationClient from '@atomist/automation-client';
import * as antlr from '@atomist/antlr';

const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.


//provide browserified versions of all the files in the script directory
app.use('/js', browserify(__dirname + '/script'));

app.use(express.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
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

app.post('/parse/', async function (request, response) {
  console.log("I got something");
  console.log(request.body);
  if (!request.body) {
    response.sendStatus(500);
  }

  const content = request.body.fileContent;
  const pxe = request.body.pxe;

  const f = new automationClient.InMemoryProjectFile("src/main/java/Foo.java", content);
  let terminalCount = 0;
  const ast = await antlr.JavaFileParser.toAst(f)


  response.send({ data: stn(ast) });
});

// listen for requests :)
const listener = app.listen(53661, function () {
  const addr = listener.address();
  if (typeof addr === "string") {
    return;
  }
  console.log('Your app is listening on port ' + addr.port);
});
