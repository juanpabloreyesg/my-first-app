/**
 * This is the main entrypoint to your Probot app
 * PRUEBA IMPORTANTE
 * PRUEBA
 * @param {import('probot').Application} app
 */
var sleep = require('sleep');
const {createProbot} = require('probot')

const probot = createProbot({
  id: process.env.APP_ID,
  port: process.env.PORT || 3000,
  secret: process.env.WEBHOOK_SECRET,
  cert: process.env.PRIVATE_KEY
})


var lti = require("./lti");
var lti2 = require("./lti2");
const bodyParser = require('body-parser');

const probotAPP = app => {
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
  
  
 
  
route.post('/lti_access', function (req, res, next) {
    //app.log("Coursera response 2 POST:/access/", req.body);
    lti.registrarIngreso(req).then(function (resp) {
        app.log("LTI PARAMS: ", resp);
        var userId = resp.EstudianteId;
        var examenId = resp.actividad;
        app.log("USUARIO DE COURSERA ID: ", userId, "INGRESANDO AL EXAMEN", examenId);
        
        var grade= 0.84
        
        res.send("Se envió la nota: "+grade);
        setTimeout(function(){
          lti.sendResultToCoursera(resp,grade).then(function(outcome){
          app.log(outcome);
        })},1000*60*60*1.05);
      
    }).catch(next);
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
probot.load(probotAPP)

const expressApp = probot.server;
expressApp.enable('trust proxy');

probot.start()

