const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// connect to database
require('./database').connect()

app.prepare().then(() => {
    const server = express()

    const apolloServer = require('./graphql').createApolloServer()
    apolloServer.applyMiddleware({ app: server })

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) console.log('Cannot run up the server.')
        console.log('> Ready on http://localhost:', port)
    })
})
