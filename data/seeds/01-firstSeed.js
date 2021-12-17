exports.seed = function(knex){
    return knex('users')
    .truncate()
    .then(function (){
        return knex('users').insert([
            {username:"Robert1", password:"1234"},
            {username:"Robert2", password:"1234"},
            {username:"Robert3", password:"1234"},
        ]);
    })
}