import React, { Fragment } from 'react'
import Navbar from './Navbar'
const Layout = (props) => {
    return (
        <Fragment>
            <Navbar></Navbar>
            <main>
                {props.children}
            </main>
        </Fragment>
    )
}

export default Layout