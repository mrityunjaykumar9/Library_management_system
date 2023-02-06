const express = require("express");
const app = express();
require("./db/conn");
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 3000;

const Register = require("./models/register");
const RegisterAdmin = require("./models/registerAdmin");
const Bookdata = require("./models/book");
const IssueBook = require("./models/issueBook");


const public_path = path.join(__dirname, "../public");
app.use(express.static(public_path));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const view_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");
// console.log(partial_path);
app.set("views", view_path);
app.set("view engine", "hbs");

hbs.registerPartials(partial_path);

//home page

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/admin", (req, res) => {
    res.render("index_admin");
})


//singin/signup page 

app.get("/register", (req, res) => {
    res.render("registration");
})

app.post("/register", async (req, res) => {
    try{
       const passw = req.body.password;
       const cpassw = req.body.cpassword;
       if(passw === cpassw){
         const user = new Register({
            email:req.body.email,
            password:req.body.password
         })
         const registered =  await user.save();
         res.status(200).render("signin");
       }
       else{
         res.send("password are not same");
       }
    }
    catch(err){
        console.log(err);
    }
    
    
})

app.get("/registeradmin", (req, res) => {
    res.render("regis_admin");
})

app.post("/registeradmin", async(req, res) => {
    try{
        const passw = req.body.password;
        const cpassw = req.body.cpassword;
        if(passw === cpassw){
          const user = new RegisterAdmin({
             email:req.body.email,
             password:req.body.password
          })
          const registered =  await user.save();
          res.status(200).render("signin_admin");
        }
        else{
          res.send("password are not same");
        }
     }
     catch(err){
         console.log(err);
     }
})

app.get("/signin", (req, res) => {
    res.render("signin");
})

app.post("/signin", async (req, res) => {
    
    try{
        const eml = req.body.email;
        const passw = req.body.password;
        const data = Register.find({$and:[{email:eml},{password:passw}]}, (err, result) => {
            if(!result.length){
                res.send("Invalid email id or password!");
            }
            else{
                res.status(200).render("index");
            }
        });
        
        
    }
    catch(err){
        res.send(err);
        // res.send("Invalid email id or password!");
    }
    
})

app.get("/signinadmin", (req, res) => {
    res.render("signin_admin");
})

app.post("/signinadmin", async (req, res) => {
    
    try{
        const eml = req.body.email;
        const passw = req.body.password;
        const data = RegisterAdmin.find({$and:[{email:eml},{password:passw}]}, (err, result) => {
            if(!result.length){
                res.send("Invalid email id or password!");
            }
            else{
                res.status(200).render("index_admin");
            }
        });
        
        
    }
    catch(err){
        res.send("Invalid email id or password");
    }
    
})


//function perform by user

app.get("/searchbook", (req, res) => {
    res.render("search");
})


app.get("/searchbookname", (req, res) => {
    res.render("search")
})

app.get("/searchauthorname", (req, res) => {
    res.render("search");
})

app.post("/searchbookname", async (req, res) => {
    try{
        const bookname = req.body.name.trim();
        const bookdata = Bookdata.find({name:bookname}, (err, result) =>{
            console.log(result);
            if(!result.length){
                res.render("search_fail");
            }
            else{
                res.render("search_success");
            }
        });
    }
    catch(err){
        res.send("Invalid data");
        console.log(err);
    }
})

app.post("/searchauthorname", async (req, res) => {
    try{
        const authorname = req.body.aname;
        console.log(authorname);
        const authordata =  Bookdata.find({author: authorname }, (err, result) =>{
            if(!result.length){
                res.render("search_fail_author");
            }
            else{
                res.render("search_success_author");
            }
        });
    }
    catch(err){
        res.status(400).send("Invalid data");
        console.log(err);
    }
})

//issue book 

app.get("/issuebook", (req, res) => {
    res.render("issue");
})

app.post("/issuebook", async (req, res) => {
    try{
        const bname = req.body.bname;
        const aname = req.body.aname;

        const bookdata = Bookdata.find({$and : [{name:bname}, {author:aname}]}, (err, result) => {
            if(!result.length){
                res.send("Entered book is not available");
            }
            else{
                const issuedBook = new IssueBook({
                    name:result[0].name,
                    author:result[0].author,
                    price:result[0].price,
                    quantity:1
                })
                try{
                    issuedBook.save();
                    console.log(result[0].quantity > 1)
                    if(result[0].quantity > 1){
                       
                        const updatedData = Bookdata.updateOne({$and : [{name:result[0].name}, {author:result[0].author}]},
                        {
                           quantity: result[0].quantity - 1
                        }, (err, docs) => {
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("issued successful");
                            }
                        } )

                        
                    }
                    else{
                        Bookdata.deleteOne({$and : [{name:result[0].name}, {author:result[0].author}]}, (err) => {
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("book data deleted");
                            }
                        });
                    }

            
                    
                }
                catch(e){
                    res.send("Invalid book information");
                    console.log(e);
                }

                res.render("issue_success");
                
            }
        })

        
    }
    catch(err){
        res.send("Invalid book information!");
    }
})

//return book

app.get("/returnbook", (req, res) => {
    res.render("return");
})


app.post("/returnbook", async(req, res) => {
    try{
        const bname = req.body.bname;
        const aname = req.body.aname;
        const price = req.body.price;
        const quantity = req.body.quantity;

        const bookdata = Bookdata.find({$and : [{name : bname}, {author :aname}]}, (err, result) => {
            if(!result.length){
                const bookdata = new Bookdata({
                    name : bname,
                    author : aname,
                    price : price,
                    quantity : quantity
                })

                
            }
        })

        

        


    }
    catch(err){
        console.log(err);
    }
})


//function perform by admin

// add book record

app.get("/addbook", (req, res) => {
    res.render("add_book");
})

app.post("/addbook", async (req, res) => {
    try{
        const bname = req.body.bname;
        const aname = req.body.aname;
        const price = req.body.price;
        const quantity = req.body.quantity;
        
        const bookdata =  new Bookdata({
            name:bname,
            author:aname,
            price:price,
            quantity:quantity
        });

        const bkdata = await bookdata.save();

        res.render("add_book_success");
    }
    catch(err){
        res.send("invalid data");
        console.log(err);
    }
})


//delete book
app.get("/deletebook", (req, res) => {
    res.render("delete_book");
})

app.post("/deletebook", async (req, res) =>{
    try{
        const bname = req.body.bname;
        const aname = req.body.aname;
    
        const deletedbook = Bookdata.deleteOne({$and : [{name:bname}, {author:aname}]}, (err, result) => {
            if(!result.deletedCount){
                res.send("Related book is not Available");
            }
            else{
                res.render("delete_book_success");
            }
        }, {new : true})

        res.render("delete_book_success");
    }
    catch(err){
        res.status(404).send("Invalid book record");
    }
})










app.listen(port, () => {
    console.log("server is running at port : 3000");
})