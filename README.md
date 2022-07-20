# Naginata Notes
A notebook to contain practice notes that can be added, updated, or deleted. Displayed as note cards that you can filter or search by title fragment.

**Tech used**: CSS, JavaScript, Node.js, Express, MongoDB, some EJS.

**Live**: https://naginata-notes.herokuapp.com/

![heroku-db-naginata_v3](https://user-images.githubusercontent.com/102257735/179806708-cf5e67e0-1824-4ee8-86fd-58ac0e119723.png)

## Current state
Naginata-focused CRUD app with ejs.
- Tags can now be added as array elements if comma+1 space separated, in preparation for search/filter functionality.
- Major category tags can now be used to filter results using the filter icon.
- Scroll to top added on click of main nav title ("Naginata").
- Update and delete buttons are moved into each notecard. Update still triggers a form at top with auto scroll to top.
- Video: Youtube allows only httpspages to stream with embeds/iframes so need to launch out of local host and it also depends on the settings applied by the video manager. So, sadly, videos are all just links for now. 
- Might be abusing data attributes a bit. Some cleanup is warranted in the future.

**Bugs**: 
- When an img url exists on file/in the document, for some reason, not checking the "is this a non-img link" still assigns the asset link to "vidURL" rather than updating the image.
- The auto scroll up when a form appears makes sense, but sometimes odd behavior results since the showForm is on a toggle. I'd like to be able to let the user hide the form again (currently on second click) but this means, along with the batch-applied event handler, sometimes you go to the top but the form is hidden (you may have clicked update on one entry and decided to click update on another entry. Even number of clicks = form is hidden).

**Optimizations** (in roughly prioritized order): 
- Make it possible to update more than one field at a time, and clicking into the existing text or information.
- Rebuild any and all of the functionality in React. It will be easier to handle data client side for the desired search functionality.
- Autocomplete for title search?
- Consider whether this app becomes more like an Anki vs regular notebook.
- Try autodeployment setup.
- Update stack (apparently current heroku stack is now behind).

**Priorty level**: Low, as I'm focusing on React for next few works. However, bug fix may get prioritized.

### Learnings
In general, nothing has given me more appreciation for how inaccessible even a very simple-looking app can be than the effort of making sure all menu items could be navigated with a keyboard (specifically Tab, and "clicking" on Enter and spacebar). 

- Working with arrays as values for document keys in MongoDB: although there's dot notation in use and superficial similarity (e.g., .find()) parameters and syntax can be very different. Need a refresher on operators. May attempt with the Travel app built using React.
- The value of a checkbox input is whatever you set as its value in the input attribute. This value is actualized only when the checkbox is checked.
- Moving delete and update buttons to entries
  - Getting title text must be done through `textContent` rather than `innerText` since the current styles applied to the text prevents a match from being found in the db. 
  - Also, keep track of what each button is actually doing (the delete button of the form vs. the delete button in the nav that showed the form)...
  - The broader do-somethings event handler may no longer make sense with the individualized button functions.
- Prior to working on tag filters (using params), linking to CSS and JS files (in the 'public' folder) from index.ejs was fine without a forward slash (express.static was enabled server-side). However, once I started working with params, the CSS and JS files were blocked with the warning "MIME mismatch" regardless of specified attributes. This was solved once a forward slash was prepended to the href values.
- Making results filterable based on filter keywords: Current setup means reloading the full page with a new url with new filter params applied and uses `window.location.assign(/*path with params variable*/)` which is set up on server side as a read req. However, along with planned rebuild with React, I would probably want to not use EJS and just have a component update upon receiving a fragment of the data to be handled client side.
- In React, listening to change of input value is "onChange"; here, equivalent event for input with `type="text"` would be "input". It is "change" for `<select>` element. I really like the visual effect of the rendered list updating as you type, but my current setup is not allowing for it (immediately redirects to search?term=TERM). And with the data being handled server side and fed into EJS template, this would be a ton of requests to the server. Looking forward to setting up for better handling client side.
- Searchable by title fragment: Syntax differences between MongoDB and Node can cause problems. I'm still using the .find().toArray() approach (.aggregate and $match seems like overkill but worth trying out sometime), but the key is when using regex, in Mongo shell you include forward slashes but you omit these in Node (else you get nothing but an empty array back as nothing will be found).
- Making filter and search options accessible. Specifying the only keys that should trigger, by keycode (Enter 13, spacebar 32). Because the actual input element is hidden, the listeners needed to be on the labels, but the check toggle had to target the input, which is selected using `nextElementSibling`. Making the actual filter options as well as making the scroll-to-top and reload functionality atteched to `<h1>` element accessible also required additional code. 
- The order in which one has to tab through previously hidden options, as well as the add/update forms, is extremely unintuitive for keyboard. But changing tabindex to something other than 0 is also strongly discouraged in all online best practices I've seen.

## Previous states
"It's a page". The skeletal structure of a to-do list that you can't update aside from adding more. I used this to test what went wrong with deployment using autodeploy from Github. Current/successful deployment is using Heroku CLI. My understanding of autodeploy is that pushing to the repo was also pushing to Heroku (and in both cases pushing to main branch).
Once switched over to Heroku CLI and with git push heroku main, things started working. At that time, this was not a real CRUD app, only a CRapp.

### Other quirks:
- Must whitelist all IP addresses
