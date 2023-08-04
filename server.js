//load env var
if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}   
//import depevedencies
const express=require("express");
const connecttoDb=require("./config/connecttoDb.js");
const Note=require("./models/note.js");
const cors=require("cors")


//create an express app
const app= express();
app.use(express.json());
app.use(cors()); 

//connect to Db
connecttoDb();


//routing
app.get("/",(req,res)=>{
    res.json({hello:"world"});
})
app.get('/notes',async (req,res)=>{
    //find 
    const notes=await Note.find();
    //notes contains an array of all  the notes
    res.json({notes:notes})
    //and res
})
app.get('/notes/:id',async (req,res)=>{
    //get id 
    const id=req.params.id;
    const note=await Note.findById(id);
    //find corresponding note
    res.json({notes:note})
})
app.post('/notes', async(req,res)=>{
    //get data
    const title=req.body.title;
    const body=req.body.body;

    //create note
    const note=await Note.create({
        title:title,body:body,
    });
    //respond with 
    res.json({note:note});
})
app.put('/notes/:id',async(req,res)=>{
    //get id 
    const title=req.body.title;
    const body=req.body.body;

    const id=req.params.id;
    const notes=await Note.findByIdAndUpdate(id, (
        {
            title:title,
            body:body
        }
    ));
    
    res.json({note:notes});
    //notes contains an array of all  the notes
     //find 

    //update
})
app.delete('/notes/:id',async(req,res)=>{
    const nid=req.params.id;
    await Note.deleteOne({_id:nid});
    
    res.json({success: "deleted"});
})

//start our server
app.listen(process.env.PORT,()=>{
    console.log("server 3000 active");
})