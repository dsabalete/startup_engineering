var http = require("http");
var url = require("url");
var port = process.env.PORT;

function iniciar(route, handle) 
{
    function onRequest(request, response) 
    {
        var pathname = url.parse(request.url).pathname;
        console.log("Petición para " + pathname + " recibida.");
        
        route(handle, pathname);
        
        response.writeHead(200, {"Content-Type": "text/html"});
        var content = route(handle, pathname);
        response.write(content);
        response.end();
    }
    
    http.createServer(onRequest).listen(port);
    console.log("Servidor Iniciado.");
}

exports.iniciar = iniciar;