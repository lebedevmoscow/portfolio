import withApollo from './../hoc/withApollo'
import withAuth from './../hoc/wtihAuth'

const Secret = () => {
    return (
        <>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">SECRET</h1>
                        SECRET PAGE ONLY FOR AUTHENTICATED USERS
                    </div>
                </div>
            </div>
        </>
    )
}

export default withApollo(withAuth(Secret, 'admin'))
