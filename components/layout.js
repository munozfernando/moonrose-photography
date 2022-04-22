import Header from './header'
import Footer from './footer'

export default function Layout({children}){
    return (
        <section>
            <Header></Header>
            <main>{children}</main>
            <Footer></Footer>
        </section>
    )
}