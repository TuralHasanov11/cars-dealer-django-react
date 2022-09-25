import Header from '../components/inc/Header'
import Footer from '../components/inc/Footer'
import Auth from '../components/auth/Auth'
import { useContext } from 'react'
import AuthContext from '../store/auth-context'


function Default(props){

    const {isAuth} = useContext(AuthContext)

    return  <>
    
        <main className="page-wrapper">
            <Auth/>
            <Header />
            {props.children}
        </main>
        
        <Footer/>
        <a className="btn-scroll-top" href="#top" data-scroll><span className="btn-scroll-top-tooltip text-muted fs-sm me-2">Top</span><i className="btn-scroll-top-icon fi-chevron-up"></i></a>
    </>
}

export default Default;