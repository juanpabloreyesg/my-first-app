/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

var lti = require("./lti");
var lti2 = require("./lti2");
const bodyParser = require('body-parser');


var cors = require('cors');
    

module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')
  app.log('This is a test')
  app.log(app.router)
  
  app.on('installation_repositories', async context => {app.log('A new repo has been made')})
  app.on('commit_comment', async context => {app.log('A comment has been made')
                        app.log(context.payload.comment.body)
                        app.log(context.github)
  api = context.github;})


  app.on('issues.opened', async context => {
  
  app.log("I heard that")
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    return context.github.issues.createComment(issueComment)

  })
  const route = app.route('/probot');
  
  route.use(bodyParser.urlencoded({extended: false}));
  
  route.use(cors({
        origin: [ '172.17.0.22:8080', '172.17.0.22:8081', 'http://172.17.0.22:3000'],
        credentials: true
    }));

  
  route.post('/lti_access',  (req, res, next) =>{
  app.log(req.headers);
  lti2.handleLaunch(req,res, next);
});
  /**
  route.post('/lti_access', function (req, res, next)

{
  app.log("Hello")
  app.log(req.body)
  lti.registrarIngreso(req).then(function(resp){
        var userId = resp.userId;
        var examenId = resp.examenId;
        app.log("USUARIO DE COURSERA ID: ", userId, "INGRESANDO AL EXAMEN", examenId);

  }

    )

  res.end('Hello World');

  next();
})

  **/
}



