# Naginata Notes
A notebook to contain practice notes that can be added, updated, or deleted. Displayed as note cards.

**Tech used**: CSS, JavaScript, Node.js, Express, MongoDB, some EJS.

**Live**: https://naginata-notes.herokuapp.com/

![screenshot of notebook](https://i.postimg.cc/bvhCsZkF/heroku-db-naginata.png)

**Optimizations and next steps**: 
- Make searchable by title fragment, autocomplete.
- Try autodeployment setup.
- Should probably retitle this web app.

**Priorty level**: Low, as I'm focusing on React for next few works.

## Current state
Naginata-focused CRUD app with ejs
Video: Youtube allows only httpspages to stream with embeds/iframes so need to launch out of local host and it also depends on the settings applied by the video manager. So, sadly, videos are all just links for now. 

### Minor reminders
The value of a checkbox input is whatever you set as its value in the input attribute. This value is actualized only when the checkbox is checked.

## Previous states
"It's a page". The skeletal structure of a to-do list that you can't update aside from adding more. I used this to test what went wrong with deployment using autodeploy from Github. Current/successful deployment is using Heroku CLI. My understanding of autodeploy is that pushing to the repo was also pushing to Heroku (and in both cases pushing to main branch).
Once switched over to Heroku CLI and with git push heroku main, things started working. At that time, this was not a real CRUD app, only a CRapp.

### Other quirks:
- Must whitelist all IP addresses
