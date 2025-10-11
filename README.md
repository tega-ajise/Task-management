# TaskApp

## Run tasks
* .env file should go in the root folder

To run both the application:

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

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
