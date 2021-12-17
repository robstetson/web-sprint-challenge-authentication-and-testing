const database = require('../../data/dbConfig')

function find(){
    return database('users')
}

function getUserID(id){
    return database('users')
    .where('id', id)
    .first()
}

function getUsername(username){
    return database('users')
    .where('username', username)
}

function addNewUser(newlyAdded){
    const [id] = database('users').insert(newlyAdded)
    return getUserID(id)
}


module.exports = {
    find,
    getUserID,
    getUsername,
    addNewUser,
}