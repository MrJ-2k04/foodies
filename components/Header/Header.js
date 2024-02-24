

import logoImg from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import HeaderBackground from "./HeaderBackground";
import NavLink from "./NavLink";

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
                        <NavLink href={"/meals"}>
                            Browse Meals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={"/community"}>
                            Foodies Community
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    </>
    );
}

export default Header;