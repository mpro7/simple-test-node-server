var http = require('http');
var formidable = require("formidable");
var util = require('util');

var server = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method.toLowerCase() == 'post') {
        processForm(req, res);
        return;
    }

    if (req.method.toLowerCase() == 'get') {
        var data = {
            data: {
                languages: [
                    'English',
                    'Spanish',
                    'German',
                    'Other'
                ]
            }
        };

        var responseData = JSON.stringify(data);
        res.end(responseData);
        console.log("get: ", responseData);
        return;
    }

    res.end();
});


function processForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {

        fields.id = 'ABC123';

        res.writeHead(400, {
            'content-type': 'text/plain'
        });

        // res.end(util.inspect({
        //   fields: fields
        // }));
    
        // console.log('posted fields:\n');
        // console.log(util.inspect({
        //   fields: fields
        // }));
        
        var data = JSON.stringify({
            fields: fields
        });

        res.end(data);

        console.log("posted fields:");
        console.log(data);
    });
}

var port = 3100;
server.listen(port);
console.log("server listening on port " + port);