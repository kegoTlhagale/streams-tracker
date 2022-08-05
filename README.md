# streams-tracker
A service that prevents a user from watching more than 3 video streams concurrently.

### Dependencies

* Have Node installed
* Run command below to add dependencies
```
npm i
```

### Executing program

* To run in dev
```
npm run start:dev
```

* To run in production mode
```
npm run start

```

* To run with Docker


```
docker build . -t streams-tracker

```

```
docker run -p 8080:8080 streams-tracker
```

Swagger Documentation url: http://localhost:8080/api-docs (the port could be different depending)