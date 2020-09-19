import { useGetUser } from './../apollo/actions'
import Redirect from './../components/shared/Redirect'
import SpinningLoader from './../components/shared/Loader'

const withAuth = (WrappedComponent, role, options = { ssr: false }) => {
    function WithAuthFunction(props) {
        const { data: { user } = {}, loading, error } = useGetUser({
            fetchPolicy: 'network-only',
        })

        if (!loading && (!user || error) && typeof window !== 'undefined') {
            return (
                <Redirect
                    to="/login"
                    query={{ message: 'NOT_AUTHENTICATED!' }}
                />
            )
        }

        if (user) {
            if (role && !role.includes(user.role)) {
                return (
                    <Redirect
                        to="/login"
                        query={{
                            message: 'NOT_AUTHORIZED',
                        }}
                    />
                )
            }
            return <WrappedComponent {...props} />
        }

        return (
            <div className="spinner-container">
                <SpinningLoader variant="large" />
            </div>
        )
    }

    if (options.ssr) {
        const serverRedirect = (res, to) => {
            res.redirect(to)
            res.end()
            return {}
        }

        WithAuthFunction.getInitialProps = async (contex) => {
            const { req, res } = contex
            if (req) {
                const user = req.user

                if (!user) {
                    return serverRedirect(
                        res,
                        '/login?message=NOT_AUTHENTICATED'
                    )
                }

                if (role && !role.includes(user.role)) {
                    return serverRedirect(res, '/login?message=NOT_AUTHORIZED')
                }
            }

            const pageProps =
                WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(context))
            return { ...pageProps }
        }
    }

    return WithAuthFunction
}
export default withAuth
