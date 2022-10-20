const express = require('express')
const router = express.Router()
const  Golfer = require('../models/golfer')

// all golfers route
router.get('/', async (req, res)=>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name != ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const golfers = await Golfer.find(searchOptions)
        res.render('golfers/index', { 
            golfers: golfers,
            searchOptions: req.query })
    } catch{
        res.redirect('/')

    }
    res.render('golfers/index')
})

// new golfer route
router.get('/new', (req, res)=>{
    res.render('golfers/new', {golfer: new Golfer() })
})

//create golfer
router.post('/', async (req, res)=>{
    const golfer = new Golfer({
        name: req.body.name
    })
    try{
        const newGolfer = await golfer.save()
         //res.redirect(`golfers/${newGolfer.id}`)
        res.redirect(`golfers`)

    } catch{
        res.render('golfers/new',{
            golfer: golfer,
            errorMessage: 'Error creating golfer'
        })
    }
    
})

module.exports = router