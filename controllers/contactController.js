const asyncHandler = require("express-async-handler")
const contact = require("../models/contactModel")
// const contactModel = require("../models/contactModel")

//desc Get all the contacts
//route GET /api/contacts
//access public 

const getContacts = asyncHandler(async (req, res)=>{
    const contacts = await contact.find()
    res.status(200).json(contacts)
})

//desc Create new contact
//route POST /api/contacts
//access public 

const createContact  = asyncHandler(async (req, res)=>{
    console.log("the request body is :", req.body)
    const {name, email, phone} = req.body
    if (!name || !email || !phone ) {
        res.status(400)
        throw new Error("all fields are mendatory !")
    }

    const Contact = await contact.create({
        name,
        email,
        phone,
    })
    res.status(201).json(Contact)
})

//desc Get  contact
//route GET /api/contacts/:id
//access public 

const getContact  = asyncHandler(async (req, res)=>{
    res.status(200).json({message: `Get contact for ${req.params.id}`})
})

//desc Update contact
//route PUT /api/contacts/:id
//access public 

const updateContact  = asyncHandler(async (req, res)=>{
    res.status(200).json({message: `Update contact for ${req.params.id}`})
})

//desc Delete contact
//route DELETE /api/contacts/:id
//access public 

const deleteContact  = asyncHandler(async (req, res)=>{
    res.status(200).json({message: `Delete contact for ${req.params.id}`})
})

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }