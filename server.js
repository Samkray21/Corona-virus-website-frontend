//Install express server    
const express = require('express');
const path = require('path');   

// var cors = require('cors');
const app = express();   


// app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

  
// Serve only the static files form the dist directory    
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {  
    res.sendFile(path.join(__dirname+'/dist/index.html'));   
});  


app.listen(process.env.PORT || 8080);
