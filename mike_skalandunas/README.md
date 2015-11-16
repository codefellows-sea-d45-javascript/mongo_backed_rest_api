###Docs

To use:

```npm install -g superagent-cli```

Run the mongo server and then the node server:

```mongod --dbpath=./db --smallfiles``

```node server.js```


Add a tapir with superagent-cli:

```superagent localhost:3000/api/tapirs post '{"name":"goofer"}'```
