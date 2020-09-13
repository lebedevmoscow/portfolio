import './../styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './../components/shared/Navbar'
import Hero from './../components/shared/Hero'

const MyApp = ({ Component, pageProps }) => {
    const IsHomePage = () => Component.name === 'Home'

    return (
        <div className="portfolio-app">
            <Navbar />
            {Component.name === 'Home' && <Hero />}
            <div className="container">
                <Component {...pageProps} />
            </div>
            {IsHomePage() && (
                <footer
                    id="sticky-footer"
                    className="py-4 bg-black text-white-50 py-3">
                    <div className="container text-center">
                        <small>Copyright &copy; Boris Lebedev</small>
                    </div>
                </footer>
            )}
        </div>
    )
}

export default MyApp
