/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')
  app.log('This is a test')

  
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
	
	app.post('/access', function (req, res, next))
	{
		app.log("Hello")
	}

  
}



