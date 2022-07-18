# Naginata Notes
A notebook to contain practice notes that can be added, updated, or deleted. Displayed as note cards.

**Tech used**: CSS, JavaScript, Node.js, Express, MongoDB, some EJS.

**Live**: https://naginata-notes.herokuapp.com/

![heroku-db-naginata_v2](https://user-images.githubusercontent.com/102257735/179071686-f38e16f3-67f3-47bb-b964-63527430a348.png)

## Current state
Naginata-focused CRUD app with ejs.
- Tags can now be added as array elements if comma+1 space separated, in preparation for search/filter functionality.
- Scroll to top added on click of main nav title ("Naginata").
- Update and delete buttons are moved into each notecard. Update still triggers a form at top with auto scroll to top.
- Video: Youtube allows only httpspages to stream with embeds/iframes so need to launch out of local host and it also depends on the settings applied by the video manager. So, sadly, videos are all just links for now. 
- Might be abusing data attributes a bit. Some cleanup is warranted in the future.

**Bugs**: 
- When an img url exists on file/in the document, for some reason, not checking the "is this a non-img link" still assigns the asset link to "vidURL" rather than updating the image.
- The auto scroll up when a form appears makes sense, but sometimes odd behavior results since the showForm is on a toggle. I'd like to be able to let the user hide the form again (currently on second click) but this means, along with the batch-applied event handler, sometimes you go to the top but the form is hidden (you may have clicked update on one entry and decided to click update on another entry. Even number of clicks = form is hidden).

**Optimizations**: 
- **[IN PROGRESS]** Make filterable by tag. Currently works with params (/tags/:tag) but still deciding on the UI.
- Searchable by title fragment, autocomplete.
- Create filter by subject (similar to tag, essentially). Maybe break out category vs tag and consider whether it becomes more like an Anki vs regular notebook.
- Make it possible to update more than one field at a time, and clicking into the existing text or information.
- Try autodeployment setup.
- Update stack (apparently current heroku stack is now behind).
- Rebuild any and all of the functionality in React.

**Priorty level**: Low, as I'm focusing on React for next few works. However, bug fix may get prioritized.

### Learnings
- Working with arrays as values for document keys in MongoDB: although there's dot notation in use and superficial similarity (e.g., .find()) parameters and syntax can be very different. Need a refresher on operators. May attempt with the Travel app built using React.
- The value of a checkbox input is whatever you set as its value in the input attribute. This value is actualized only when the checkbox is checked.
- Moving delete and update buttons to entries
  - Getting title text must be done through `textContent` rather than `innerText` since the current styles applied to the text prevents a match from being found in the db. 
  - Also, keep track of what each button is actually doing (the delete button of the form vs. the delete button in the nav that showed the form)...
  - Change event listener writing as there are multiples of the button
  - The broader do-somethings event handler may no longer make sense with the individualized button functions.
- Prior to working on tag filters (using params), linking to CSS and JS files (in the 'public' folder) from index.ejs was fine without a forward slash (express.static was enabled server-side). However, once I started working with params, the CSS and JS files were blocked with the warning "MIME mismatch" regardless of specified attributes. This was solved once a forward slash was prepended to the href values.
- Thinking about rebuild in React and how separate the front end dev can end up feeling in that scenario with additional steps to integrate and relaunch.

## Previous states
"It's a page". The skeletal structure of a to-do list that you can't update aside from adding more. I used this to test what went wrong with deployment using autodeploy from Github. Current/successful deployment is using Heroku CLI. My understanding of autodeploy is that pushing to the repo was also pushing to Heroku (and in both cases pushing to main branch).
Once switched over to Heroku CLI and with git push heroku main, things started working. At that time, this was not a real CRUD app, only a CRapp.

### Other quirks:
- Must whitelist all IP addresses
