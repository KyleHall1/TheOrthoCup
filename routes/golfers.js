const express = require('express')
const { route } = require('.')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const  Golfer = require('../models/golfer')
const uploadPath = path.join('public', Golfer.profilePicBasePath)
const imageMineTypes = ['image/jpeg','image/jpg', 'image/png', 'images/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) =>{
        callback(null, imageMineTypes.includes(file.mimetype))
    }
})


 //all golfers route
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
})


//admin page
router.get('/admin', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name != '') {
      searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
      const golfers = await Golfer.find(searchOptions)
      res.render('golfers/admin', {
        golfers: golfers,
        searchOptions: req.query
      })
    } catch {
      res.redirect('/')
  
    }
  })

// new golfer route
router.get('/new', (req, res)=>{
    res.render('golfers/new', {golfer: new Golfer() })
})

//create golfer
router.post('/', async (req, res)=>{
    
    const golfer = new Golfer({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        // profilePicName: {
        //     data: fs.readFileSync(path.join( '/public/uploads/defualtProfilePic.jpg' )),
        //     contentType: 'image/png'
        // }
      })
      try {
        const newGolfer = await golfer.save()
        res.redirect(`golfers/${newGolfer.id}`)
      } catch {
        res.render('golfers/new', {
          golfer: golfer,
          errorMessage: 'Error creating golfer'
        })
      }
    
})

router.get('/:id', async (req, res) => {
    try {
        const golfer = await Golfer.findById(req.params.id)
        res.render('golfers/show', { golfer: golfer })
      } catch {
        res.redirect('.golfers')
      }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const golfer =  await Golfer.findById(req.params.id)
        res.render('golfers/edit', {golfer: golfer })
    } catch {
        res.redirect('.authors')
    }
    
})

router.put('/:id', upload.single('profilePic'), async (req, res) => {
    let golfer
    const fileName = req.file != null ? req.file.profilePic : null
  try {
    golfer = await Golfer.findById(req.params.id)
    golfer.name = req.body.name
    golfer.email = req.body.email
    golfer.phoneNumber = req.body.phoneNumber
    //golfer.profilePicName = fileName
    await golfer.save()
    res.redirect(`/golfers/${golfer.id}`)
  } catch {
    if (golfer == null) {
      res.redirect('/')
    } else {
      res.render('golfers/edit', {
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
        if (golfer == null){
            res.redirect('/')
        } else {
            res.redirect(`/golfers/${golfer.id}`)
        } 
    } 
})


module.exports = router