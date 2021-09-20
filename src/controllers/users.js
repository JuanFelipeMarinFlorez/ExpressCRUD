const Users = require('./../models/users')
const User=require('./../models/users')

// Use class or functions
function helloWorld(req, res) {
    const userDB = new Users({
        name: 'EndavaUser',
        age: 18,
        email:"EndavaUser@endava.com",
        password: '123456'
    })
    try {
        userDB.save( (err, user) => {
            if(err) throw Error(err);
            console.log('user created');
            return res.status(200).json({
                status: 200,
                response: user
            })
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}


function getUsers(req,res){

    try {     
        User.find({}).exec( (err, users) => {
            if(err) throw Error(err);
            console.log('users obtenied ');
            return res.status(200).json({
                status: 200,
                response: users
            })
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }

}

function getUser(req,res){

    try {     
        User.find({email: req.params.email}).exec( (err, users) => {
            if(err) throw Error(err);

            if(Object.keys(users).length === 0){
                console.log('user not found ');
            return res.status(404).json({
                status: 404,
                response: {}
            })

            }

            console.log('user obtenied ');
            return res.status(200).json({
                status: 200,
                response: users
            })
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }

}

function saveUser(req, res) {
    const userDB = new Users({
        name: req.body.name,
        age: req.body.age,
        email:req.body.email,
        password: req.body.password
    })
    try {
        userDB.save( (err, user) => {
            if(err) throw Error(err);
            console.log('user created');
            return res.status(201).json({
                status: 201,
                response: user
            })
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}

function updateUserById(req, res) {
    const userDB = new Users({
        name: req.body.name,
        age: req.body.age,
        email:req.body.email,
    })

    try {
        User.findByIdAndUpdate({_id: req.params.id}, 
            { $set: {name: req.body.name,
                age: req.body.age,
                email:req.body.email}}
        ).exec( (err, user) => {
            if(err) throw Error(err);
            console.log('user updated');
            return res.status(200).json({
                status: 200,
                response: userDB
            })
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}

function deleteUserById(req,res){
    try {
        User.findByIdAndDelete({_id: req.params.id} ).exec( (err, user) => {
            if(err) throw Error(err);
            console.log('user deleted');
            return res.status(200).json({
                status: 200,
                response: user
            })
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }

}


module.exports = { helloWorld,getUsers,getUser,saveUser,updateUserById,deleteUserById }