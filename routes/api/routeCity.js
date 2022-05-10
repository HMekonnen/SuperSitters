// Imports

const express = require("express")

const router = express.Router()

const Parent = require("../../parentSchema")

const Sitter = require("../../sitterSchema")

const data = require("../../Data")


/**=============================================SITTER ROUTES==================================================== */

/**=============================================CREATE NEW SITTER ==================================================== */

// 1. CREATE NEW SITTER
// users/	POST	create	CREATE initiates a post request through postman with action = http://localhost:3000/users/ and allows the application the ability to Create a user

router
.route("/sitters/new")
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
/**==================================DISPLAY ALL SITTERS ===================================== */
// 2. users/GET	index	INDEX when a user types localhost:3000/users this route shows a list or index of all users

router // WORKS- BUT DISPLAYS SITTERS BY SPECS, PAY, ETC FIRST- TREND = ARRAY PROPERTIES ARE DISPLAYING FIRST. 
.route("/sitters")
.get((req,res)=>{
    Sitter.find((err, sitters)=>{
        if (err){
            res.status(400).json({msg: err.message})
        } else {
            res.status(201).json({sitters})
        }
        console.log(" Index/ Display all sitters route was run")
    })
})

/**=============================================DISPLAY SITTER BY ID==================================================== */

// 3. users/:id	GET	show	SHOW when a user types localhost:3000/users/:idOfUser shows the user an Individual user.

// Works- but same as #2 - arrays/ objects appear first then name, bio, etc
router
.route("/sitters/:id")
.get((req,res)=>{
    const sitterID = req.params.id
    Sitter.findOne({sitterID},(err, sitter)=>{
        if (err){
            res.status(400).json({msg: err.message})
        } else {
            res.status(201).json({sitter})
        }
        console.log(" Display sitter by ID route was run")
    })
})

/**=============================================UPDATE SITTER BY ID==================================================== */

// 4. users/:id	PUT	update	UPDATE initiates a PUT request through postman with action = http://localhost:3000/users/:idOfUser and allows the application the ability to update data about a user

router
.route("/sitters/:id")
.put((req,res)=>{
    const sitterID = req.params.id
    const updatedSitter = req.body
    Sitter.findByIdAndUpdate(sitterID, updatedSitter,{new:true},(err, updatedSitter)=>{
        if (err){
            res.status(400).json({msg: `No sitter with the ID ${sitterID} found. Please check the ID number and try again.`, msg2: err.message})
        } else {
            res.status(201).json({msg: "Update Successful!", display: {updatedSitter}})
        }
        console.log(" Update one sitter by ID route was run")
    })
})
/**=============================================DELETE SITTER BY ID==================================================== */

// 5. users/:id	DELETE	delete	DELETE initiates a delete request through postman with action = http://localhost:3000/users/:idOfUser and allows the application the ability to delete a user
// Works + displays deleted sitter- once again the order of display isn't ideal- N.B. Circle back and ensure you have most appropriate http status codes
router
.route("/sitters/:id")
.delete((req,res)=>{
    const sitterID = req.params.id
    Sitter.findByIdAndDelete(sitterID,(err, sitter)=>{
        if (err){
            res.status(400).json({msg: err.message})
        } else {
            res.status(201).json({msg: `Delete was successful.`, Deleted: sitter})
        }
        console.log(" Delete sitter by ID route was run")
    })
})






/**=============================================PARENT ROUTES============================================== */

/**=============================================PARENT ROUTES============================================== */

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


/**=============================================PARENT "INDEX" ROUTE============================================== */
// 2. products/	GET	index	INDEX when a user types localhost:3000/products this route shows a list or index of all products

router
.route("/parents")
.get((req,res)=>{
    
    Parent.find( (err, parents)=>{
        if(err){
            res.status(400).json({msg: err.message})
        } else {
            res.status(201).json({parents})
        }

    })
})

/**=============================================PARENT- SHOW BY ID ROUTE============================================== */
// 3. products/:id	GET	show	SHOW when a user types localhost:3000/products/:idOfProduct shows the user an Individual product

// Works! - Confirm status codes && look into order of display
router
.route("/parents/:id")
.get((req,res)=>{
    const parentID = req.params.id
    Parent.findOne({parentID},(err, parent)=>{
        if(err){
            res.status(404).json({msg: error.message, msgII: `No parent with the ID ${parentID} found.`})
        } else {
            res.status(201).json({parent})
        }
        console.log("Search parent by ID was run. ")
    })
})

/**=============================================PARENT - UPDATE BY ID ROUTE============================================== */
// 4. products/:id	PUT	update	UPDATE initiates a put request through a postman with action = http://localhost:3000/products/:idOfProductand allows the application the ability to Update data about a product
// WORKS! - SAME DISPLAY AS ALL THE ABOVE- ARRAYS ARE DISPLAYING FIRST. -CIRCLE BACK
router
.route("/parents/:id")
.put((req,res)=>{
    const parentID= req.params.id
    const updatedParent = req.body
    Parent.findByIdAndUpdate(parentID,updatedParent,{new:true},(err, updatedParent)=>{
        if (err){
            res.status(400).json({msg: error.message, msgII: `No parent with the ID ${parentID} found`})
        } else{
            res.status(200).json({updatedParent})
        }
        console.log("Update parent by ID was run ")
    })
})


/**=============================================PARENT - DELETE BY ID ROUTE============================================== */
// 5. products/:id	DELETE	delete	DELETE initiates a delete request through a form submission with action = http://localhost:3000/products/:idOfProductand allows the application the ability to delete a product
// Works!  - same issue of order when displaying + check status codes
router
.route("/parents/:id")
.delete((req,res)=>{
    const parentID= req.params.id
    Parent.findByIdAndDelete(parentID,(err,parent)=>{
        if (err){
            res.status(400).json({msg: error.message, msgII: `No parent with the ID ${parentID} found`})
        } else {
            res.status(201).json({msg: "Deletion Successful", Deleted: {parent}})
        }
    })
})







module.exports = router