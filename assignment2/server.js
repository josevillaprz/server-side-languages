// library imports
const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

//creating the server
http.createServer((request, response)=>{
    // url.parse returns a url object with each part of the address as properties
    let parsed = url.parse(request.url)
    // path.parse returns an object of properties representing elements of the path
    let filename = path.parse(parsed.pathname)

    let file = filename.name == "" ? "index" : filename.name
    let ext = filename.ext == "" ? ".html" : filename.ext
    let dir = filename.dir == "/" ? "" : filename.dir + "/"
    let page = filename.name == "" ? "index.html" : filename.name

    let f = (dir + file + ext).replace("/", "") // removing the / and replacing with a blank

    //create object for the file types
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif'
    }

    if(f){
        fs.readFile(f, (err, data) => {
            if(err){
                console.log(err)
                response.writeHead(505)
                response.end("Crap, something went wrong")
            }
            if(page){
                if(mimeTypes.hasOwnProperty(ext)){
                    response.writeHead(200, { 'Content-Type': ext})
                }
                if(ext == ".html") {
                    response.write("<script> let page = '" + file + "'; </script>");
                }
                response.end(data, 'utf-8')
            }
        })
    }
}).listen("8080", () => {   
    console.log("info", "Server is on port: " + 8080);
})