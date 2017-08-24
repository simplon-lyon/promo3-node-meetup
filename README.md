# promo3-node-meetup
A Meetup application using Node, Mustache Template, Bootstrap and a database. 

## Starting The Project

We are going to implement a simple fork of Meetup using Node and the Mustache template engine:

1. create a new repository
2. initialize npm and install `Express`
3. create a new script `index.js` which start a webserver and serves a `public` folder
4. check that the can serve an index page
5. install `Mustache`
6. configure the template engine of `Express` (https://github.com/simplon-lyon/promo3-node-template)
7. create a `template` folder and an `index.html` file in the folder
8. try to serve `template/index.htlm` using the template engine

## Adding Event

We are going to create an in-memory database to store event:

1. edit `index.js` to:
    - create an `events` variable which will store all the events
    - add the `/event/add` handler to add an event to the `events` variable
    - edit the `/` handler to pass the `events` to your template
2. edit `template/index.html` to:
    - add a form to submit an event to `event/add`
   - display all the events on the page (edited)

## Removing Event

We are going to delete information from the database:

1. in `index.js` add the `/event/del` handler to delete an event from the `events` variable
2. in `template/index.html`:
    - add for each event a link to delete the event
    - replace the default reaction of the form by an AJAX request to `/event/add`
   - replace the default reaction of the links by an AJAX request to `/event/del`
5. in `index.js` add the `/event/get` handler to get all events as JSON
6. in `template/index.html` update the event list after each AJAX request using `/event/get`