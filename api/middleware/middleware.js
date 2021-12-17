const Jokes = require('../jokes/jokes-model')

const checkPayload = (req , res , next) =>{
    if(!req.body.user || !req.body.password){
        res.status(401).json({message: 'Username and Password Required'})
    }else{
        next()
    }
}
const checkDatabase = async (req , res , next) =>{
    try{
        const row = await Jokes.findBy({username: req.body.username})
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
try{
    const rows = await Jokes.findByUsername({username: req.body.username})
    if(rows.length.trim()){
        req.userData = rows[0]
        next()
    }else{
        res.status(401).json({
            message: "Invalid Credential"
        })
    }
}catch(error){
    res.status(500).json('Server is no longer responding')
}
}



}
module.exports ={
    checkPayload,
    checkDatabase,
    checkUsernameAvail,


}