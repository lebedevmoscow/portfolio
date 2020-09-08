import React from 'react'

const PortfolioDetail = ({query}) => {
    const {id} = query
    return (
        <h1>I'm detail page with ID: {id}</h1>
    )
}

PortfolioDetail.getInitialProps = ({query}) => {
    return {query}
}

export default PortfolioDetail