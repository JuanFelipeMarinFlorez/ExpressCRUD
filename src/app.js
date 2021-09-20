const express = require('express')
const cors = require('cors')
const app = express()
const { connect } = require('./db')
const { helloWorld,getUsers,getUser,saveUser,updateUserById,deleteUserById } = require('./controllers/users')

class App {
    constructor() {
        this.initApp()
        this.routes()
        this.initDatabase()
    }

    initApp() {
        app.use(cors())
        app.use(express.json());
    }

    routes() {
        // Routes
        app.get('/', helloWorld);
        app.get('/users',getUsers);
        app.get('/user/:email',getUser);
        app.post('/user',saveUser);
        app.put('/user/:id',updateUserById);
        app.delete('/user/:id',deleteUserById);

    }

    initDatabase() {
        connect('mongodb+srv://AdminEndava:Endava2021@endava.yyroa.mongodb.net/Endava?retryWrites=true&w=majority')
    }

    initServer(port) {
        app.listen(port, () => {
            console.log(`Server Listening on http://localhost:${port}`);
        });
    }
}

module.exports = App
