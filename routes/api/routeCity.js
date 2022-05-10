// Imports

const express = require("express")

const router = express.Router()

const Parent = require("../../parentSchema")

const Sitter = require("../../sitterSchema")

const data = require("../../Data")


/**=============================================SITTER ROUTES==================================================== */


// 1. CREATE NEW SITTER
// users/	POST	create	CREATE initiates a post request through postman with action = http://localhost:3000/users/ and allows the application the ability to Create a user

router
.route("/sitter/new")
.post((req,res)=>{
    const newEntry = req.body
    Sitter.create([newEntry], (err,sitter)=>{
        if (err){
            res.status(400).json({msg: err.message})
        } else {
            res.status(201).json({sitter})
        }
        console.log("create new sitter was run- check status code to confirm success.")
    })
})



// 2. users/GET	index	INDEX when a user types localhost:3000/users this route shows a list or index of all users


// 3. users/:id	GET	show	SHOW when a user types localhost:3000/users/:idOfUser shows the user an Individual user.


// 4. users/:id	PUT	update	UPDATE initiates a PUT request through postman with action = http://localhost:3000/users/:idOfUser and allows the application the ability to update data about a user

// 5. users/:id	DELETE	delete	DELETE initiates a delete request through postman with action = http://localhost:3000/users/:idOfUser and allows the application the ability to delete a user













































/**=============================================PARENT ROUTES============================================== */
// 1. CREATE NEW PARENT
router
.route("/parent/new")
.post((req,res)=>{
    const newEntry = req.body
    Parent.create([newEntry], (err,parent)=>{
        if (err){
            res.status(400).json({msg: err.message})
        } else {
            res.status(201).json({parent})
        }
        console.log("create new sitter was run- check status code to confirm success.")
    })
})



// 2. products/	GET	index	INDEX when a user types localhost:3000/products this route shows a list or index of all products


// 3. products/:id	GET	show	SHOW when a user types localhost:3000/products/:idOfProduct shows the user an Individual product


// 4. products/:id	PUT	update	UPDATE initiates a put request through a postman with action = http://localhost:3000/products/:idOfProductand allows the application the ability to Update data about a product


// 5. products/:id	DELETE	delete	DELETE initiates a delete request through a form submission with action = http://localhost:3000/products/:idOfProductand allows the application the ability to delete a product









module.exports = router