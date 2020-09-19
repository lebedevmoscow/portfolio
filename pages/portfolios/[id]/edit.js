import PortfolioForm from './../../../components/forms/PortfolioForm'
import withApollo from './../../../hoc/withApollo'
import withAuth from './../../../hoc/wtihAuth'
import BaseLayout from './../../../layouts/BaseLayout'
import { useRouter } from 'next/router'
import { useGetPortfolio, useUpdatePortfolio } from '../../../apollo/actions'

const PortfolioEdit = () => {
    const router = useRouter()
    const { id } = router.query
    const { data } = useGetPortfolio({ variables: { id } })
    const [updatePortfolio, { error }] = useUpdatePortfolio()

    const errorMessage = (err) => {
        return (
            (err.graphQLErrors && err.graphQLErrors[0].message) ||
            'Unknown error...'
        )
    }
    return (
        <BaseLayout>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Edit Portfolio</h1>
                        {data && (
                            <PortfolioForm
                                onSubmit={(data) =>
                                    updatePortfolio({
                                        variables: { id, ...data },
                                    })
                                }
                                initialData={data.portfolio}
                            />
                        )}
                        {error && (
                            <div className="alert alert-danger">
                                {errorMessage(error)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default withApollo(withAuth(PortfolioEdit, ['admin', 'instructor']))
