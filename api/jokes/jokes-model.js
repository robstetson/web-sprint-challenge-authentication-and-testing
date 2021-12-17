const database = require('../../data/dbConfig')

const addUser = async (newlyAddedUser) =>{
  const [id] = await database('users')
  .insert(newlyAddedUser)

  return findByID(id)
}

const findActiveUser = () =>{
    return database('users')
}

const findByUsername = (username) =>{
    return database('users')
    .select('*')
    .where('username', username)
    .first()
}

const findByID = (id) =>{
    return database('users')
    .select()
    .where('id', id)
    .first()
}

const findByUser = (filterUsers) =>{
    return database('users')
    .where(filterUsers)
    .orderBy('id')
}


module.exports = {
    addUser,
    findActiveUser,
    findByUsername,
    findByID,
    findByUser,
}