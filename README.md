## Reactive RESTful Angular 2 application with ngrx store and Falcor

A RESTful master-detail application built using Angular 2 and [ngrx store](https://github.com/ngrx/store) + [Falcor](http://netflix.github.io/falcor/).

### Getting Started

There are two main parts to this application. The first is the server which is in `server/index.js` and uses mock data to create a Falcor model. The second part is the Angular 2 application which we will use `webpack-dev-server` to display.  

To get started run the commands below.

```
$ git clone https://github.com/simpulton/ng2-falcor-app.git
$ cd ng2-falcor-app
$ npm install
$ npm start
```

Then navigate to [http://localhost:3001](http://localhost:3001) in your browser.
