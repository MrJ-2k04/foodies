import Link from "next/link";
import logoImg from "@/assets/logo.png";
import styles from "./Header.module.css";
import Image from "next/image";
import HeaderBackground from "./HeaderBackground";

function Header() {
    return (<>
        <HeaderBackground />
        <header className={styles.header}>
            <Link href={'/'} className={styles.logo}>
                <Image
                    src={logoImg}
                    alt="Alt for Logo"
                    priority
                />
                NextLevel Food
            </Link>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link href={"/meals"}>Browse Meals</Link>
                    </li>
                    <li>
                        <Link href={"/community"}>Foodies Community</Link>
                    </li>
                </ul>
            </nav>
        </header>
    </>
    );
}

export default Header;