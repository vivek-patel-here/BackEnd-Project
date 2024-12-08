const express=require("express")
const app=express();
const path= require("path")
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');

//Accepting data into jason formate
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//accepting all types of request from html forms
app.use(methodOverride('_method'))

//Serving the static files to ejs Routes
app.use(express.static(path.join(__dirname,"/public/css")))
app.use(express.static(path.join(__dirname,"/public/js")))

//using Ejs for templating
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))

let db=[
    {
        id:uuidv4(),
        name:"kailash kher",
        post: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, totam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, ut?"
    },
    {
        id:uuidv4(),
        name:"Ambresh puri",
        post: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, aliquid atque! Ratione corrupti exercitationem placeat perspiciatis omnis fuga sed, soluta voluptatem reprehenderit porro nulla nam reiciendis sunt rem consectetur culpa consequuntur ipsum quaerat vel."
    },{
        id:uuidv4(),
        name:"RajNath Govind",
        post: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, aliquid atque! Ratione corrupti exercitationem placeat perspiciatis omnis fuga sed, soluta voluptatem reprehenderit porro nulla nam reiciendis sunt rem consectetur culpa consequuntur ipsum quaerat vel."
    },{
        id:uuidv4(),
        name:"manoj Vaajpayee",
        post: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, aliquid atque! Ratione corrupti exercitationem placeat perspiciatis omnis fuga sed, soluta voluptatem reprehenderit porro nulla nam reiciendis sunt rem consectetur culpa consequuntur ipsum quaerat vel."
    },

]   //This array replicates the database part for now as we are currently lacking the concepts of db.

//All post Route ************************************
app.get("/posts",(req,res)=>{
    res.render("home.ejs",{db})
})


// add new post using this form route*************
app.get("/posts/form",(req,res)=>{
    res.render("form.ejs")
})

//new post Req.*******************
app.post("/posts",(req,res)=>{
    let {username,post}=req.body;
    let newpost={
        id:uuidv4(),
        name:username,
        post:post
    }
    db.push(newpost);
    res.redirect("/posts")
})

//post detail route*****************
app.get("/posts/:id/details",(req,res)=>{
    let {id}=req.params;
    let post=null;
    for(let data of db){
        if(data.id==id){
            post=data;
        }
    }
    if(post){
        res.render("view.ejs",{post});
    }
    else{
        res.send("some Error Occur!!")
    }
})

//edits post route using this edit form****************
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=null;
    for(let data of db){
        if(data.id==id){
            post=data;
        }
    }
    if(post){
    res.render("edit.ejs",{post});
    }
    else{
        res.send("some Error Occur!!")
    }
})

//edit patch req*******************************
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let {changedpost}=req.body;
    for(let data of db){
        if(data.id==id){
            data.post=changedpost;
        }
    }
    res.redirect("/posts");
})


//delete req***********
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    db=db.filter((post)=>{
        if(post.id!=id){
            return post
        }
    })
    res.redirect("/posts");
})

app.listen(8080,()=>{
    console.log("listening at port 8080");
})