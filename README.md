# heroku-dbtest
"It's a page".
The skeletal structure of a to-do list that you can't update aside from adding more.

Deployment: use Heroku CLI until you figure out what went wrong with autodeploy from Git repo.
Possibly it's assuming when you push to the repo, you push to Heroku. That seems logical but could be wrong.
Once switched over to Heroku CLI and explicit git push heroku main, things started working.
Same thing with jargonauts.

Live link: https://test-with-db.herokuapp.com/

Other quirks:
- Must whitelist all IP addresses
- still protect env variable (connection string) - maybe that's enough

This is not a real CRUD app, only a CRapp.
