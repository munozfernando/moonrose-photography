import Header from './header'
import Footer from './footer'
import styles from './layout.module.css'

export default function Layout({ children }) {
    return (
        <section className={styles.viewPort}>
            <Header></Header>
            <main className={styles.contentPort}>{children}</main>
            <Footer></Footer>
        </section>
    )
}