const express = require("express");
const app = express()
const { Server } = require('@tus/server');
const { FileStore } = require('@tus/file-store');
const path = require("path")
const morgan = require('morgan')

//////// view engine set up ///////////////////
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const tusServer = new Server({
    path: '/upload',
    datastore: new FileStore({
      directory: path.join(__dirname, '/files')
    }),
  });

app.use(morgan('dev'))
app.use('/upload', tusServer.handle.bind(tusServer));
//app.use('/files', express.static(path.join(__dirname, 'files')));


// configuration for serving static content in express 
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {

    res.render('index')
})


app.get("/features",(req,res) => {

    res.render('upload')
})

const PORT = 4000;

app.listen(PORT, () => {

    console.log(`Server listening on port ${PORT}`);

})