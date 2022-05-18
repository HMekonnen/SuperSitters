//Imports
const mongoose = require("mongoose")

const express = require("express")

const router =  express.Router()

const {Schema}= require("mongoose") // Added separately to avoid writing mongoose.types.objectID everytime we're creating a favorites. 


//create Sitter SCHEMA  
const sitterSchema = new mongoose.Schema({
    name: {type: String, required: true},

    bio:{type:String, maxLength: 250}, // need to set character max

    city: {type: String, required: true},

    state: {type: String, required: true},

    years_experience: {type: Number, required: true},

    certifications: [{type: String, required: true}],

    languagesSpoken:[{type: String, required: true}],

    specifics: {

        ageMin: {type: Number, required: true, min:0},

        ageMax:{type: Number, required: true, min:0},

        maxNumChildrenPerHousehold:{type: Number, required: true, min:1}
},
 
 jobType: {

     fullTime: {type: Boolean, default: false},

     partTime:{type: Boolean, default: true},

     onCall: {type: Boolean, default: false},
    },

 pay:{

     perHour: {type:Number, required: true, min: 0}, 

     perChild: {type:Number, required: true, min: 0},

     negotiable: {type: Boolean, required: true, default: false},
    },

 acceptingNewclients: {type:Boolean, required: true, default: true},

 favorited_by: [
    {type: Schema.Types.ObjectID, ref: 'Parent'} 
   ]


},{timestamps:true}) 





const Sitter = mongoose.model("Sitter", sitterSchema)

module.exports = Sitter