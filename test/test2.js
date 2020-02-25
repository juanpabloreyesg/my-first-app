const nock = require('nock')
const http = require('http');
const https = require('https');

const myProbotApp = require("..")
const {Probot, createProbot } = require('probot')

const payload = require('./fixtures/commentmade')
const issueCreatedBody = { body: 'Thanks for opening this issue!' }
/**

const requestListener = function (req, res) {
  res.writeHead(200);
  probot = createProbot({ id: 1, cert: 'test', githubToken: 'test' })
  probot.load(myProbotApp)
  /**
  const route = app.route('/probot');
  route.use(require('express').static(__dirname + '/public'));
  route.get('/hello-world', (req, res) => {
    res.end('Hello World');
  });
   
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8885);
**/

var myExample = function(){
	nock.disableNetConnect()
	probot = createProbot({ id: 1, cert: 'test', githubToken: 'test' });
	probot.load(myProbotApp);
	
	
	nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, { token: 'test' })
	  


	probot.receive({ name: 'commit_comment', payload })
	  
	
}

myExample()