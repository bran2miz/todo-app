# ToDo App

## Author: Brandon Mizutani

## Version: 1.0.0

## Overview: 

Project that will add hard-wired, default context settings to the application so that the user can view three incomplete todo tasks. In addition, the user will have the option of viewing any additional incomplete tasks by using pagination functionality.

![lab 31](./todo.png)

What it looks like:

![lab 31 expected](./screen-shot1.png)

### Lab 32:

Phase 2 incorporates configuration settings to the application.

Main Page: 

![lab 32](./todo-1.png);

Settings Configuration page:

![lab 32](./settings.png);


# Lab 33: 

In this final phase, we’ll be requiring that users be logged in, in order to see the to do items. Additionally, based on their user type, they will be allowed (or denied) to perform actions such as editing or deleting them.

Capabilities: 

As a user, I want to provide a way for other users to create new accounts.
As a user, I want to provide a way for all users to login to their account.
As a user, I want to make sure that my To Do items are only viewable to users that have logged in with a valid account.
As a user, I want to ensure that only fellow users that are allowed to “create”, based on their user type, can add new To Do Items.
As a user, I want to ensure that only fellow users that are allowed to “update”, based on their user type, can mark To Do Items complete.
As a user, I want to ensure that only fellow users that are allowed to “delete”, based on their user type, can delete new To Do Items.

# Lab 34: 

IMPORTANT: to deploy on Render:

create a postgres SQL service on render
Copy and paste url db to env value: postgres://username:password@dpg-cocmioq1hbls73cttgh0-a.oregon-postgres.render.com/bearer_auth?ssl=true

(needs to have ssl=true otherwise provides SSL errors with sequelize)

Connect other env variables like secret key and PORT. 

Should be ready to connect to front end!

[Render Site](https://bearer-auth-2-8fbj.onrender.com)

![What the site looks like](./lab-34.png)

![Settings if you are authorized](./lab-34-settings.png)

Make sure that onRender is working. 

## Notes: 

useContext method has context is basically declaring some state at a high level

wrap it around a component 
able to access it at any point below (any child of app)

example:

user = {
    first: "brandon",
    last: "m",
    email: "bran2miz@gmail.com"
}
this goes into....

<app> </app>

then can go to:

<header></header> (child component of app as a prop can grab it without having to pass it down as props)

small amount of global state -- use the context provider

state that only one branch or one component needs - useState

complex local state -- useReducer;