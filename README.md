# heroku-dbtest
"It's a page".
The skeletal structure of a to-do list that you can't update aside from adding more. Such is life.

Using this to test what went wrong with deployment using autodeploy from Github.
Current/successful deployment is using Heroku CLI.
My understanding of autodeploy is that pushing to the repo was also pushing to Heroku (and in both cases pushing to main branch).

Once switched over to Heroku CLI and with git push heroku main, things started working.

Live link: https://test-with-db.herokuapp.com/

Other quirks:
- Must whitelist all IP addresses
- still protect env variable (connection string) 

This is not a real CRUD app, only a CRapp.

## Warnings
Everything is different in the img-and-crud branch, including inputs and fields. Do not enter any new data from current heroku deployment.
Next up... autodeployment test. 
