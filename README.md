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