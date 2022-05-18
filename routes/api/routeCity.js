// Imports

const express = require("express")

const router = express.Router()

const Parent = require("../../parentSchema")

const Sitter = require("../../sitterSchema")


const req = require("express/lib/request")


/**=============================================SITTER ROUTES==================================================== */

/**=============================================CREATE NEW SITTER ==================================================== */

// 1. CREATE NEW SITTER

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
/**==================================DISPLAY ALL SITTERS- INDEX ===================================== */


router 
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


// Note to self- w/ update one- it will not show you the full updated item. - 
router
.route("/sitters/:id")
.put((req,res)=>{
    const sitterID = req.params.id
    const updatedSitter = req.body

    
    Sitter.updateOne({_id: sitterID}, updatedSitter,{new:true},(err, updatedSitter)=>{
        if (err){
            res.status(400).json({msg: `No sitter with the ID ${sitterID} found. Please check the ID number and try again.`, msg2: err.message})
        } else {
            res.status(201).json({msg: "Update Successful!", display: updatedSitter })
        }
        console.log(" Update one sitter by ID route was run")
    })
})




/**=============================================DELETE SITTER BY ID==================================================== */

router
.route("/sitters/:id")
.delete((req,res)=>{
    const sitterID = req.params.id
    Sitter.findOneAndDelete({_id:sitterID},(err, sitter)=>{
        if (err){
            res.status(400).json({msg: err.message})
        } else {
            res.status(201).json({msg: `Delete was successful.`, Deleted: sitter})
        }
        console.log(" Delete sitter by ID route was run")
    })
})






/**=============================================PARENT ROUTES============================================== */



/**==========================================CREATE NEW PARENT================================================= */

// 1. CREATE NEW PARENT
router
.route("/parents/new")
.post((req,res)=>{
    const newEntry = req.body
    Parent.create([newEntry], (err,parent)=>{
        if (err){
            res.status(400).json({msg: err.message})
        } else {
            res.status(201).json({parent})
        }
        console.log("create new parent was run- check status code to confirm success.")
    })
})


/**=============================================PARENT "INDEX" ROUTE============================================== */


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

router
.route("/parents/:id")
.get((req,res)=>{
    const parentID = req.params.id
    Parent.findOne({_id: parentID},(err, parent)=>{
        if(err){
            res.status(404).json({msg: error.message, msgII: `No parent with the ID ${parentID} found.`})
        } else {
            res.status(201).json({parent})
        }
        console.log("Search parent by ID was run. ")
    })
})




/**=============================================PARENT - UPDATE BY ID ROUTE============================================== */

router
.route("/parents/:id")
.put((req,res)=>{
    const parentID= req.params.id
    const updatedParent = req.body
    Parent.findOneAndUpdate({_id:parentID,updatedParent},{new:true},(err, updatedParent)=>{
        if (err){
            res.status(400).json({msg: error.message, msgII: `No parent with the ID ${parentID} found`})
        } else{
            res.status(200).json({updatedParent})
        }
        console.log("Update parent by ID was run ")
    })
})


/**=============================================PARENT - DELETE BY ID ROUTE============================================== */

router
.route("/parents/:id")
.delete((req,res)=>{
    const parentID= req.params.id
    Parent.findOneAndDelete({_id: parentID},(err,parent)=>{
        if (err){
            res.status(400).json({msg: error.message, msgII: `No parent with the ID ${parentID} found`})
        } else {
            res.status(201).json({msg: "Deletion Successful", Deleted: {parent}})
        }
    })
})


/**=============================================FAVORITES ROUTE============================================== */
 

router
.route("/favorite/:parentId/:sitterId")
.put((req, res) => {
    Parent.updateOne ({ 
              _id: req.params.parentId 
    }, {
      $push: {
        favorited_sitters: req.params.sitterId
      }
    }, (err, updateParent) => {
      if (err) {
        console.error(error);
        res.status(404).json({ 
          error: 'Parent not found'
        });
      } else {
        Sitter.updateOne({
          _id: req.params.sitterId 
        }, {
          $push: {
            favorited_by: req.params.parentId 
          }
        }, (err, updateSitter) => {
          if (err) {
            console.error(error); 
            res.status(404).json({
              error: 'Sitter not found'
            })
          } else {
            res.status(202).json({
              message: 'Successfully updated the parent and sitter favorite lists'
            }) 
          }
        })
      }
    })
  })






module.exports = router