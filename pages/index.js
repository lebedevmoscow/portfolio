import React, {Component} from 'react'
import Link from 'next/link'

class Home extends Component {
    render() {
        return (
            <>
                <div>
                    <nav>
                        <Link href="/"><a>Home</a></Link>
                        <Link href="/contact"><a>Contact</a></Link>
                        <Link href="/about"><a>About</a></Link>
                        <Link href="/users"><a>Users</a></Link>
                    </nav>
                </div>
                <h1>Home page (index.js)</h1>
            </>
        )
    }
}

export default Home