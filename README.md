# vue-tsoa-template

This is a standard template for starting a web project with a vue frontend and a tsoa backend.

## Components

- Vue will be used for the frontend
- Tailwind css will be added for convenience
- PrimeVue and PrimeIcons will also be included as a starting point
- Tsoa with a test controller will be set up on the backend with a test endpoint
- Prisma will be included off the bat as an ORM
   - It will be set up for postgres, but could be modified to handle other DBs
- A sample deploy script will be included for convenience as well

## Using npm workspaces

The app you want to build may contain multiple frontend or backend apps. To declare additional apps (or npm workspaces), just modify `package.json` at the root. Add or rename the modules included in `workspaces`.
