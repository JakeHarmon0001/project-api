const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log('Authentication service started on port 3000')
})

const users = [
    {
        username: 'jake',
        password: 'password123jake',
        role: 'admin'
    }, {
        username: 'courtney',
        password: 'password123courtney',
        role: 'admin'
    }
]