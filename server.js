"use strict";
// server.js
// where your node app starts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// init project
const express_1 = __importDefault(require("express"));
const browserify_middleware_1 = __importDefault(require("browserify-middleware"));
const automationClient = __importStar(require("@atomist/automation-client"));
const antlr = __importStar(require("@atomist/antlr"));
const app = express_1.default();
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
//provide browserified versions of all the files in the script directory
app.use('/js', browserify_middleware_1.default(__dirname + '/script'));
// http://expressjs.com/en/starter/static-files.html
app.use(express_1.default.static('public'));
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
    };
}
app.post('/parse/', async function (request, response) {
    console.log("I got something");
    console.log(request.body);
    if (!request.body) {
        response.send(500);
    }
    const content = request.body.fileContent;
    const pxe = request.body.pxe;
    const f = new automationClient.InMemoryProjectFile("src/main/java/Foo.java", content);
    let terminalCount = 0;
    const ast = await antlr.JavaFileParser.toAst(f);
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
