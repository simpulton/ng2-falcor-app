var falcor = require('falcor');
var FalcorServer = require('falcor-express');
var Router = require('falcor-router');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var model = new falcor.Model({
    cache: {
        'items': [
            {
                'id': 1,
                'name': 'Item 1',
                'description': 'This is a description'
            },
            {
                'id': 2,
                'name': 'Item 2',
                'description': 'This is a description'
            },
            {
                'id': 3,
                'name': 'Item 3',
                'description': 'This is a lovely item'
            }
        ]
    }
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/model.json', FalcorServer.dataSourceRoute(function(req, res) {
    return model.asDataSource();
}));

app.use(express.static('.'));

var server = app.listen(9090, function(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("navigate to http://localhost:9090")
});
