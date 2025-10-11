# TaskApp

## Run tasks
* .env file should go in the root folder
* Ensure you have PostgreSQL installed on your machine

To run both the Full stack application:

```sh
npx nx run-many --target=serve --all
```
--> Open up the application on **localhost:4200**

To run just the backend:
```sh
npx nx serve api
```
--> Send requests to **localhost:3004**

## API Endpoints

### POST /tasks – Create Task

Body:
{
  "title": "Task Title Here",
  "todo": "something here",
  "dueDate": "2025-12-12"
}
--> 201 OK

Body:
{
  "title": "Incomplete task"
  "todo": "Hello"
}
--> 400 Bad Request

### GET /tasks – List accessible tasks scoped to role/org
Authorization: None
--> 401 Unauthorized (User hasn't registered or logged in)

Authorization: Bearer ....
--> 200 OK (Lists all the tasks in the user's org scope)

### PUT /tasks/:id – Edit task (if permitted)

Role: Owner

Body:
{
  "title": "New Title",
  "todo": "same todo, with a greater amount of details",
  "dueDate": "2025-10-10"
}
--> 200 OK

Role: 

Body:
{
  "title": "New Title",
  "todo": "same todo, with a greater amount of details",
  "dueDate": "2025-10-10"
}
--> 200 OK

Role: User

Body:
{
  "title": "New Title",
  "todo": "same todo, with a greater amount of details",
  "dueDate": "2025-10-10"
}
--> 403 Forbidden

### DELETE /tasks/:id – Delete task (if permitted)
Role: User
--> 403 Forbidden

Role: Admin
--> 200 OK

Role: Owner
--> 200 OK

## Architecture Overview
### Apps

* api (backend application)
* Task-app (frontend application)

### Libs

* auth (all the logic for authorization handled here
  * Guards
  * Custom decorators
  * User login
* data (data structure and declaring elements)
  * Interfaces
  * Entities
  * DTOs
 
Rationale to be explained in video

## Access Control Implementation
* User (Child Organization) – Can view all the tasks in their respective organization and create new tasks
* Owner (Child Organization) - [INHERIT EVERYTHING FROM ABOVE] and can edit or delete tasks that THEY have created
* Admin (Child Organization) - [INHERIT EVERYTHING FROM ABOVE] and can edit or delete ANY tasks in their organization

[INHERIT EVERYTHING FROM ABOVE, for child organization(s)]
* User (Parent Organization) - Can view all tasks and create new tasks
* Owner (Parent Organization) - [INHERIT EVERYTHING FROM ABOVE] and can edit or delete tasks that THEY have created
* Admin (Child Organization) - [INHERIT EVERYTHING FROM ABOVE] and can edit or delete ANY tasks

Jwt Auth integration to be explained in video

## Data Model Explanation & Future Considerations
To be explained in video
