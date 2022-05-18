import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from './header.module.css'

export default function Header() {
    return (
        <div>
            <Head>
                <title>Moonrose Photography</title>
                <meta name="description" content="Moonrose Logo" />
                <link rel="icon" href="/mrp.ico" />
            </Head>
            <div className={styles.navMenu}>
                <div className={styles.navButtonContainer}>
                    <Link href="/showcase/all">
                        <a className={styles.navButton}>Portfolio</a>
                    </Link>
                    {' '}
                    <Link href="/booking/appointment">
                        <a className={styles.navButton}>Book a Session</a>
                    </Link>
                    <div className={styles.logoContainer}>
                        <Image
                            className={styles.logo}
                            src="/mrp_logo.png"
                            alt="Logo picture of Moonrose Photography: a circle with pink flowers surrounds the words 'Moon Rose Photography'"
                            width={150}
                            height={150}
                            quality={100}
                            layout='intrinsic'
                        ></Image>
                    </div>
                    <Link href="/contact/info">
                        <a className={styles.navButton}>Contact</a>
                    </Link>
                    {' '}
                    <Link href="/blog/all">
                        <a className={styles.navButton}>Blog</a>
                    </Link>
                    <Link href="/upload/image">
                        <a className={styles.navButton}>Upload Photos</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}