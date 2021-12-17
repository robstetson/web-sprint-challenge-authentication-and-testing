exports.seed = function(knex){
    return knex('users')
    .truncate()
    .then(function (){
        return knex('users').insert([
            {id: 1, username:"Robert1", password:"1234"},
            {id: 2, username:"Robert2", password:"1234"},
            {id: 3, username:"Robert3", password:"1234"},
        ]);
    })
}