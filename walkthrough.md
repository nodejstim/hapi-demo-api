
### node & npm

node >= 4   
npm >= 2


#### nvm 

node version manager

https://github.com/creationix/nvm

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
```

```
$ nvm install 4
$ nvm use 4
```


#### essential modules

underscore - utility library  
lodash - utility library, functional patterns   
async - async patterns   
bluebird, q - promises   
yargs - option parsing library    
request - simplified http requests  
moment - date library  


#### tooling and testing modules

grunt  
gulp  
lab    
code  
mocha    
chai  
eslint     
jshint  
jslint


#### bundler modules

webpack  
browserify   


### application frameworks

express   
hapi   
meteor


### hapi 

- configuration over code
- plugins: middleware evolved
- built in key functionality: validation, caching, compression
- reusability
- modularization      
- secure, robust, stable, reliable 
- 100% code coverage
- designed for Walmart scale

http://hueniverse.com/2012/12/20/hapi-a-prologue     
https://medium.com/@dstevensio/manifests-plugins-and-schemas-organizing-your-hapi-application-68cf316730ef   
http://hapijs.com/styleguide     
https://github.com/jedireza/generator-hapi-style      


#### hapi eco-system

- lab - testing utility with linting and code coverage analysis
- joi - object validation 
- nes - web sockets, hapi adapter and browser client
- boom - HTTP-friendly error objects
- hoek - general purpose utilities 
- ...

http://hapijs.com/plugins


### RethinkDB

- NoSQL distributed database
- database for realtime web 
- changefeeds let you build scalable, realtime apps

```
$ docker run -d -P --name rethink1 rethinkdb
```

### Penseur

- A lightweight RethinkDB wrapper
- Simplified database access 


### nes

- native WebSocket support for hapi
- browser client

https://github.com/hapijs/nes


### Building the application

###### Create the API module: 
```
$ mkdir hapi-demo-api
$ cd hapi-demo-api
$ npm init
```

###### Add dependencies:
```
$ npm install --save hapi hoek joi
```

###### Create a server:
```
const Hapi = require('hapi');   
  
const server = new Hapi.Server();
   
server.connection({
    host: 'localhost',
    port: 3000
});
           
server.start();
```

###### Set up database access:    

```
$ npm install --save penseur
```

```
const Penseur = require('penseur');
  
const db = new Penseur.Db('hapi-demo', {
    host: 'localhost',
    port: 28015
});
      
db.establish(['messages'], (err) => {
  
    ...
});

```

###### Add a route for and implement the add message endpoint:
     
```           
const Joi = require('joi');
  
server.route({ 
    method: 'POST', 
    path: '/message', 
    config: {
        validate: {
            payload: {
                from: Joi.string().required(),
                msg: Joi.string().required()
            }
        }
    },
    handler: (request, reply) => { 
     
       this.db.messages.insert(request.payload, reply); 
    }
});
```   

###### Register nes and create subscription endpoint:  

```
$ npm install --save nes
```

```
const Nes = require('nes');
  
server.register(Nes, (err) => {  
  
    server.subscription('/messages');
});    
```

###### Publish database changes: 

```
db.messages.changes('*', function(err, change) {
    
    server.publish('/messages', change.after);
};
```

###### Add the npm start command:

In package.json add:

```
"scripts": {
    "start": "node ./lib/start.js"
}
```



### Writing API tests

###### Lab dependencies:

```
npm install --save-dev lab code
```

###### Add the npm test command:

In package.json add:

```
"scripts": {
    ...,
    "test": "lab -a code -t 100 -L"
}
```

To run lab with reporting options:

```
$ lab -a code -t 100 -L -r console -o stdout -r junit -o results.xml -r html -o coverage.html
```


###### Add a test for the endpoint:

```              
const API = require('../lib');
  
it('adds a message', (done) => {
  
    API.init((server) => {
  
        const options = {
            method: 'POST',
            url: '/message',
            payload: {
                from: 'A User',
                msg: 'Hello'
            }
        };
  
        server.inject(options, (res) => {
  
            expect(res.statusCode).to.equal(200);  
            expect(res.result).to.exist();
  
            server.stop(done);
        });
    });
});
```


### hapi-demo-api

https://github.com/nodejstim/hapi-demo-api
                    

### hapi-demo-client         

https://github.com/nodejstim/hapi-demo-client




























    







 












