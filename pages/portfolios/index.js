import PortfolioCard from './../../components/portfolios/PortfolioCard'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'

const graphdeletePortfolio = async (id) => {
    const query = `mutation DeletePortfolio {
        deletePortfolio(id: "${id}")
    }`

    const res = await axios
        .post('http://localhost:3000/graphql', { query })
        .then((res) => res.data.data.deletePortfolio)

    return res
}

const graphupdatePortfolio = async (id) => {
    const query = `mutation UpdatePortfolio {
        updatePortfolio(id: "${id}", input: {
            title: "UPDATE Job",
            company: "UPDATE Company",
            companyWebsite: "UPDATE Website",
            location: "UPDATE Location",
            jobTitle: "UPDATE Job Title",
            description: "UPDATE Desc",
            startDate: "12/12/2012",
            endDate: "14/11/2013"
        }) {
            _id,
            title,
            company,
            companyWebsite,
            location,
            jobTitle,
            description,
            startDate,
            endDate
        }
    }
    `

    const res = await axios
        .post('http://localhost:3000/graphql', { query })
        .then((res) => res.data.data.updatePortfolio)
    return res
}

const graphcreatePortfolio = async () => {
    const query = `mutation CreatePortfolio {
        createPortfolio(input: {
            title: "New Job",
            company: "New Company",
            companyWebsite: "New Website",
            location: "New Location",
            jobTitle: "New Job Title",
            description: "New Desc",
            startDate: "12/12/2012",
            endDate: "14/11/2013"
        }) {
            _id,
            title,
            company,
            companyWebsite,
            location,
            jobTitle,
            description,
            startDate,
            endDate
        }
    }`

    const res = await axios
        .post('http://localhost:3000/graphql', { query })
        .then((res) => res.data.data.createPortfolio)
    return res
}

const fetchPortfolios = async () => {
    const query = `query Portfolio {
        portfolios {
            _id,
            title,
            company,
            companyWebsite,
            location,
            jobTitle,
            description,
            startDate,
            endDate
        }
    }`

    const res = await axios
        .post('http://localhost:3000/graphql', { query })
        .then((res) => res.data.data.portfolios)

    return res
}

const Portfolios = ({ portfolios }) => {
    const [portfoliosState, setPortfoliosState] = useState(portfolios)

    const createPortfolio = async () => {
        const newPortfolio = await graphcreatePortfolio()
        const newPortfolios = [...portfoliosState, newPortfolio]
        setPortfoliosState(newPortfolios)
    }

    const deletePortfolio = async (id) => {
        const deletedId = await graphdeletePortfolio(id)
        const updated = []
        for (let i = 0; i < portfoliosState.length; i++) {
            if (portfoliosState[i]._id !== deletedId)
                updated.push(portfoliosState[i])
        }

        setPortfoliosState(updated)
    }

    return (
        <>
            <section className="section-title">
                <div className="px-2">
                    <div className="pt-5 pb-4">
                        <h1>Portfolios</h1>
                    </div>
                </div>
                <button onClick={createPortfolio} className="btn btn-primary">
                    Create Portfolio
                </button>
            </section>
            <section className="pb-5">
                <div className="row">
                    {portfoliosState.map((portfolio) => {
                        return (
                            <div className="col-md-4" key={portfolio._id}>
                                <Link
                                    href="/portfolios/[id]"
                                    as={`/portfolios/${portfolio._id}`}>
                                    <a className="card-link">
                                        <PortfolioCard portfolio={portfolio} />
                                    </a>
                                </Link>
                                <button
                                    className="btn btn-warning"
                                    onClick={() =>
                                        updatePortfolio(portfolio._id)
                                    }>
                                    Update Portfolio
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        deletePortfolio(portfolio._id)
                                    }>
                                    Delete Portfolio
                                </button>
                            </div>
                        )
                    })}
                </div>
            </section>
            <a href="" className="btn btn-main bg-blue ttu">
                See More Portfolios
            </a>
        </>
    )
}

Portfolios.getInitialProps = async () => {
    const portfolios = await fetchPortfolios()
    return { portfolios }
}

export default Portfolios
