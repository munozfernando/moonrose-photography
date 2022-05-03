import Link from 'next/link'
import Image from 'next/image'
import styles from './footer.module.css'

export default function Footer() {
    return (
        <div className={styles.navMenu}>
            <div className={styles.socialMediaIconContainer}>
                <a
                    href="https://www.facebook.com/MoonRosePhotography"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialMediaIcon}
                >
                    <Image
                        src="/f_logo_RGB-White_144.png"
                        alt="Facebook logo linking to Moonrose Photography's Facebook page"
                        width={25}
                        height={25}
                        quality={100}
                        layout='intrinsic'
                    >
                    </Image>
                </a>
                <a
                    href="https://www.instagram.com/moonrosephotography/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialMediaIcon}
                >
                    <Image
                        className={styles.convertToWhite}
                        src="/glyph-logo_May2016.png"
                        alt="Facebook logo linking to Moonrose Photography's Facebook page"
                        width={25}
                        height={25}
                        quality={100}
                        layout='intrinsic'
                    >
                    </Image>
                </a>
            </div>
        </div>
    )
}