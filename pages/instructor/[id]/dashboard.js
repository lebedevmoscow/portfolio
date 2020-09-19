import withApollo from './../../../hoc/withApollo'
import withAuth from './../../../hoc/wtihAuth'
import { useRouter } from 'next/router'
import BaseLayout from './../../../layouts/BaseLayout'
import { Card, Button } from 'react-bootstrap'
import {
    useDeletePortfolio,
    useGetUserPortfolios,
} from './../../../apollo/actions'
import { getDataFromTree } from '@apollo/react-ssr'
import Link from 'next/link'
import { formatDate } from './../../../utils/functions'

const InstructorDashboard = () => {
    const router = useRouter()
    const [deletePortfolio] = useDeletePortfolio()
    const { data } = useGetUserPortfolios()
    const userPortfolios = (data && data.userPortfolios) || []

    return (
        <BaseLayout>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5">
                        <h1 className="page-title">Instuctor Portfolios</h1>
                        {userPortfolios.map((p) => {
                            return (
                                <Card key={p._id} className="mb-2">
                                    <Card.Header>{p.jobTitle}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{p.title}</Card.Title>
                                        <Card.Text>
                                            {formatDate(p.startDate)} -{' '}
                                            {formatDate(p.endDate)}
                                        </Card.Text>
                                        <Link
                                            href="/portfolios/[id]/edit"
                                            as={`/portfolios/${p._id}/edit`}>
                                            <a className="btn btn-warning mr-1">
                                                Update
                                            </a>
                                        </Link>
                                        <Button
                                            variant="danger"
                                            onClick={() =>
                                                deletePortfolio({
                                                    variables: { id: p._id },
                                                })
                                            }>
                                            Delete
                                        </Button>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default withApollo(
    withAuth(InstructorDashboard, ['admin', 'instructor']),
    getDataFromTree
)
