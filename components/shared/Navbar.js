import { Navbar, Nav } from 'react-bootstrap'
import Link from 'next/link'
import withApollo from './../../hoc/withApollo'
import { useLazyGetUser } from './../../apollo/actions'
import { useEffect, useState } from 'react'

const AppLink = (props) => {
    return (
        <Link href={props.href}>
            <a className={props.className}>{props.children}</a>
        </Link>
    )
}

const AppNavbar = () => {
    const [user, setUser] = useState(null)
    const [hasResponse, setHasResponse] = useState(false)
    const [getUser, { data, error }] = useLazyGetUser()

    useEffect(() => {
        getUser()
    }, [])

    if (data) {
        if (data.user && !user) {
            setUser(data.user)
        }

        if (!data.user && user) {
            setUser(null)
        }

        if (!hasResponse) {
            setHasResponse(true)
        }
    }

    return (
        <div className="navbar-wrapper">
            <Navbar expand="lg" className="navbar-dark fj-mw9">
                <Navbar.Brand>
                    <AppLink
                        className="navbar-brand mr-3 font-weight-bold"
                        href="/">
                        Boris Lebedev
                    </AppLink>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <AppLink href="/portfolios" className="nav-link mr-3">
                            Portfolios
                        </AppLink>
                        <AppLink
                            href="/forum/categories"
                            className="nav-link mr-3">
                            Forum
                        </AppLink>
                        <AppLink href="/cv" className="nav-link mr-3">
                            Cv
                        </AppLink>
                    </Nav>
                    {hasResponse && (
                        <Nav>
                            {user && (
                                <>
                                    <span className="nav-link mr-4">
                                        Welcome {user.username}
                                    </span>
                                    <AppLink
                                        href="/logout"
                                        className="btn btn-danger nav-link">
                                        Sign Out
                                    </AppLink>
                                </>
                            )}
                            {(error || !user) && (
                                <>
                                    <AppLink
                                        href="/register"
                                        className="mr-3 nav-link">
                                        Sign Up
                                    </AppLink>
                                    <AppLink
                                        href="/login"
                                        className="mr-3 btn btn-success bg-green-2 bright">
                                        Sign In
                                    </AppLink>
                                </>
                            )}
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default withApollo(AppNavbar)
