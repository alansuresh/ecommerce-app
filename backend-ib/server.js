const express = require('express')
const app = require('./app')




app.get('/',(req,res)=>{
    res.send ('Backend running');
});

app.listen(4000,()=>{
    console.log('running on port 4000');
});