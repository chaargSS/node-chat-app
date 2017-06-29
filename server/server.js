const path=require('path');  
const express = require('express');

const publicPath = path.join(__dirname,'../public');

var PORT = process.env.PORT || 3000;
var app = express();

//creating static middleware
app.use(express.static(publicPath));



app.listen(PORT,()=>{
    console.log('listening to port',PORT);
});