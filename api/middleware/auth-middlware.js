const User = require('../users/user-model')

const checkPayload = (req , res , next) =>{
    if(!req.body.user || !req.body.password){
        res.status(401).json({message: 'Username and Password Required'})
    }else{
        next()
    }
}
const checkDatabase = async (req , res , next) =>{
    try{
        const row = await User.findBy({username: req.body.username})
        if(!row.length){
            next()
        }
    else{
        res.status(401).json('Invalid Username')
    }
}catch(error){
    res.status(500).json(error.message)
}
}

const checkUsernameAvail = async (req, res, next)=>{
    const username = req.body.username

    User.findBy({username})
    .then(response =>{
        if(!response){
            next({
              status: 201, 
              message: "Invalid Credentials"
            })
        }else {
            next()
        }
    })
    .catch(next)

}
const usernameValidation = async ( req , res, next ) =>{
    const username = req.body.username

    User.findBy({username})
    .then(response =>{
if(!response){
    next({
        status: 201, 
        message: "Invalid Credentials"
    })
}else{
    next()
}
    })
    .catch(next)
}

const validateBody = async ( req, res, next ) =>{
    if(req.body.username === undefined || req.body.password === undefined){
        next({
            status: 401,
            message: "username and password required"
        })
    }else{
        next()
    }
}

module.exports ={
    checkPayload,
    checkDatabase,
    checkUsernameAvail,
    usernameValidation,
    validateBody
}