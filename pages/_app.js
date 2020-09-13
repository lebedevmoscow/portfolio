import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import 'isomorphic-unfetch'

import './../styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './../components/shared/Navbar'
import Hero from './../components/shared/Hero'

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
})

const MyApp = ({ Component, pageProps }) => {
    return (
        <ApolloProvider client={client}>
            <div className="portfolio-app">
                <Navbar />
                {Component.name === 'Home' && <Hero />}
                <div className="container">
                    <Component {...pageProps} />
                </div>
            </div>
        </ApolloProvider>
    )
}

export default MyApp
