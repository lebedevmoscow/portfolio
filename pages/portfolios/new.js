import PortfolioForm from './../../components/forms/PortfolioForm'
import withApollo from './../../hoc/withApollo'
import withAuth from './../../hoc/wtihAuth'

const PortfolioNew = () => {
    return (
        <>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Create New Portfolio</h1>
                        <PortfolioForm onSubmit={() => {}} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default withApollo(withAuth(PortfolioNew, ['admin', 'instructor']))
