# To Do

This web application is a simple application to manage a list of things to do.

## Features ✨

The application has few main features:

1. Create a todo
2. Create a todo with a due due date
3. Filter the to do list by the current date.

## Infrastructure

This applications consists of two parts:

1. Frontend: Single Page Application built with: React and Material.
2. Backend: HTTP REST API built with Node.js, Express and MongoDB.

## How to run

to start the application use docker compose:

`docker-compose up --build`

once the app is running you can open:

http://localhost:3000

on your browser.

## Future works

Provided more time, there are a few things are need improving.

1. Complete the implementation of the auto scroll on the frontend, the backend has an implementation on pagination using the `{page, pageSize}` method to load the todos and a default of 20 records on each request.
2. Add more tests and fixing the failing tests on both the frontend and the backend.
3. More error handling on the frontend when the user enters a numeric value. The backend doesn't accept numeric values but the frontend doesn't not display that correctly.
4. Add version Control.
5. Again, add more tests!!

## Enjoy! 🚀
