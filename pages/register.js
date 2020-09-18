import RegisterForm from './../components/forms/RegisterForm'
import { Mutation } from 'react-apollo'
import { SIGN_UP } from './../apollo/queries'
import withApollo from './../hoc/withApollo'
import Redirect from './../components/shared/Redirect'

const Register = () => {
    const errorMessage = (err) => {
        return (
            (err.graphQLErrors && err.graphQLErrors[0].message) ||
            'Unknown error...'
        )
    }

    return (
        <>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Register</h1>
                        <Mutation mutation={SIGN_UP}>
                            {(signUpUser, { data, error }) => {
                                return (
                                    <>
                                        <RegisterForm
                                            onSubmit={(registerData) => {
                                                signUpUser({
                                                    variables: registerData,
                                                })
                                            }}
                                        />
                                        {data && data.signUp && (
                                            <Redirect to={'/login'} />
                                        )}
                                        {error && (
                                            <div className="alert alert-danger">
                                                {errorMessage(error)}
                                            </div>
                                        )}
                                    </>
                                )
                            }}
                        </Mutation>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withApollo(Register)
