//Imports 
const mongoose = require("mongoose")

const express = require("express")

const router =  express.Router()


//create Sitter SCHEMA  
const sitterSchema = new mongoose.Schema({
    name: {type: String, required: true},

    bio:{type:String}, // need to set character max

    city: {type: String, required: true},

    state: {type: String, required: true},

    years_experience: {type: String, required: true},

    certifications: {type: String, required: true},

    languagesSpoken:{type: String, required: true},

    specifics: {

        ageMin: {type: String, required: true},

        ageMax:{type: String, required: true},

        maxNumChildrenPerHousehold:{type: Number, required: true}
},
 
 jobType: {

     fullTime: {type: Boolean, default: false},

     partTime:{type: Boolean, default: true},

     onCall: {type: Boolean, default: false},
    },
 pay:{

     perHour: {type:String, required: true}, // String vs Number for flexibility reasons- maybe change back to Number later

     perChild: {type:String, required: true},

     negotiable: {type: Boolean, required: true, default: false},
    },
 acceptingNewclients: {type:Boolean, required: true, default: true},

},{timestamps:true}) 





const Sitter = mongoose.model("Sitter", sitterSchema)

module.exports = Sitter