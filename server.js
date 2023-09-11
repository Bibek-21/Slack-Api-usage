const axios=require('axios').default
const { log } = require('console');
const dotenv=require('dotenv')
dotenv.config();
const express= require('express')
const  app  = express()
const port = 3000;
app.set('view engine','ejs');
app.set('views','views')
app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.get('/',(req,res)=>{
    res.render('index.ejs',{
        status:null
    })
})

app.post('/postmessage',(req,res)=>{
    axios.post('https://hooks.slack.com/services/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',{
    text:`
    Name: ${req.body.name}
    Email: ${req.body.email}
    Message: ${req.body.message}
    `
})

.then(response=>{
    const data= response.data;
    if(data){
        
        res.render('index.ejs',{
            status:true
        })
    }
    else{
        resMessage=false
        res.render('index.ejs',"notok")
    }
// res.status(200).send("Successfuly posted")    
    })
    .catch(err=>{
        console.log(err);

        res.status(500).send("error request")
    })
})

app.listen(port,()=>{
    console.log(`Listening on  port ${port}`);
})
