const express = require('express')
const { route } = require('.')
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
        res.redirect(`golfers/${newGolfer.id}`)
    } catch{
        res.render('golfers/new',{
            golfer: golfer,
            errorMessage: 'Error creating golfer'
        })
    }
    
})

router.get('/:id', (req, res) => {
    res.send('Show Golfer ' + req.params.id)
})

router.get('/:id/edit', async (req, res) => {
    try {
        const golfer =  await Golfer.findById(req.params.id)
        res.render('golfers/edit', {golfer: golfer })
    } catch {
        res.redirect('.authors')
    }
    
})

router.put('/:id', async (req, res) => {
    let golfer
    try{
        golfer = await Golfer.findById(req.params.id)
        golfer.name = req.body.name
        await golfer.save()
        res.redirect(`/golfers/${golfer.id}`)
    } catch{
        if (golfer == nul){
            res.redirect('/')
        } else {
            res.render('golfers/edit',{
                golfer: golfer,
                errorMessage: 'Error updating golfer'
            })
        } 
    }  
})

router.delete('/:id', async (req, res) => {
    let golfer
    try{
        golfer = await Golfer.findById(req.params.id)
        await golfer.remove()
        res.redirect('/golfers')
    } catch{
        if (golfer == nul){
            res.redirect('/')
        } else {
            res.redirect(`/golfers/${golfer.id}`)
        } 
    } 
})

module.exports = router