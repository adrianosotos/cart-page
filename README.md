# Cart Page Project

This is a cart page simulation app that reads data from an API and renders in a React App.

## Design Points

Backend: Data is served by an node express API.
Frontend: Data is rendered by a React App (create-react-app) using SASS pre-processors.


## How to run

```bash
# Start server.
node server/index.js 

#Start client APP
npm start --prefix client

```

http://localhost:3000/frete-gratis runs cart page with free delivery options and http://localhost:3000/sem-frete-gratis runs without. By default root page runs with free delivery options.

Just go to [http://localhost:3000](http://localhost:3000) and have fun!

## This project is coverage by component tests

```bash
npm run test
```


