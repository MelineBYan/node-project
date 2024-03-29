import * as http from 'node:http';
import * as fs from 'fs';

const mappedPages = {
    home: 'index.html',
    contact: 'contact.html',
    about: 'about.html'
}


const server = http.createServer((req, res) => {
    const url = req.url.split('/')[1];
    const page = mappedPages[url] || 'notFound.html';
    fs.readFile(page, 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('File Not found!');
            res.end();
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })

});

server.listen(3000);