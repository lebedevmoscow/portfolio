import Navbar from './../components/shared/Navbar'
import Hero from './../components/shared/Hero'
import { ToastContainer } from 'react-toastify'

const BaseLayout = ({ children, page = '' }) => {
    const IsHomePage = () => page === 'Home'

    return (
        <div className="portfolio-app">
            <Navbar />
            {page === 'Home' && <Hero />}
            <div className="container">{children}</div>
            {IsHomePage() && (
                <footer
                    id="sticky-footer"
                    className="py-4 bg-black text-white-50 py-3">
                    <div className="container text-center">
                        <small>Copyright &copy; Boris Lebedev</small>
                    </div>
                </footer>
            )}
            <ToastContainer />
        </div>
    )
}

export default BaseLayout
