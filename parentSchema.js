//import mongoose library
const mongoose = require("mongoose")

// look into why {Router} was used prior. - two birds one stone w/ express + express.Router, maybe?

const express = require("express")

const router =  express.Router()

const {Schema}= require("mongoose")


//create Sitter SCHEMA  
const parentSchema = new mongoose.Schema({
    name: {type: String, required: true},

    bio:{type:String, required: true, maxlength: 250}, 

    city: {type: String, required: true},

    state: {type: String, required: true},

    languagesSpoken: [{type: String, required: true}],

    numChildren:{type: Number, required:true,min: 0},

    childDetails: [{

        age: {type: Number, required: true},

        specialRequirements:{type: String},

}],
 
 jobType: {

     fullTime: {type: Boolean, default: true},

     partTime:{type: Boolean, default: false},

     onCall: {type: Boolean, default: false},
    },
 pay:{

     perHour: {type:Number, required: true, min: 0}, // string vs Number for flexibility reasons- maybe change back to Number later

     perChild: {type:Number, required: true, min: 0}, 

     negotiable: {type: Boolean, required: true, default: false},
    },
     favorited_sitters: [
        {type: Schema.Types.ObjectId, ref: 'Babysitter'} // look into what goes into ref - babysitter or sitter
    ]
 
},{timestamps:true}) 


// convert schema to model while declaring it as a separate variable for easy use. Name = Pokie for our Pokemon Schema / model
const Parent = mongoose.model("Parent", parentSchema)

module.exports = Parent