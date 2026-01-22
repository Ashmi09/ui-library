import { createContext, useContext, useState, type ReactNode } from "react";
import styles from "./NavBar.module.css"

type NavBarContextProps = {
    isOpen: boolean;
    toggleMenu: () => void;
}

type NavLink = {
    label: string;
    href: string;
}

type NavLinkProps = {
    links: NavLink[];
}

type NavBarProps = {
    children: ReactNode;
    className?: string;
}

const NavBarContext = createContext<NavBarContextProps | null>(null);

function useNavBarContext() {
    const context = useContext(NavBarContext);
    if (!context) {
        throw Error("NavBar components should be used as children of NavBar")
    }
    return context
}

function Logo({ children }: { children: ReactNode }) {
    useNavBarContext();
    return (
        <div className={styles.logo}> {children}</div >
    )
}

function Links({ links }: NavLinkProps) {
    useNavBarContext();
    return (
        <ul className={styles.links}>
            {links.map((link) => (
                <li key={link.href}>
                    <a href={link.href} className={styles.link}>{link.label}</a>
                </li>
            ))}
        </ul>
    )
}

// function MobileMenu({ links }: NavLinkProps) {
//     const { isOpen } = useNavBarContext();
//     if (!isOpen) return null;
//     return (
//         <ul className="mobileMenu">
//             {links.map((link) => (
//                 <li key={link.href}>
//                     <a href={link.href} className="link">{link.label}</a>
//                 </li>
//             ))}
//         </ul>
//     )
// }

function Actions({ children }: { children?: ReactNode }) {
    useNavBarContext();
    return (
        <div className={styles.actions}> {children}</div >
    )
}

// function Hamburger() {
//     const { toggleMenu } = useNavBarContext();
//     return (
//         <div className="hamburger" onClick={toggleMenu}>
//             <div className="bar"></div>
//             <div className="bar"></div>
//             <div className="bar"></div>
//         </div>
//     )
// }
function NavBar({ children, className }: NavBarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((prev) => !prev)
    return (
        <NavBarContext.Provider value={{ isOpen, toggleMenu }}>
            <nav className={`${styles.navbar} ${className ?? ""}`}>
                {children}
            </nav >
        </NavBarContext.Provider>
    )
}

NavBar.Logo = Logo
NavBar.Links = Links
NavBar.Actions = Actions
// NavBar.Hamburger = Hamburger
// NavBar.MobileMenu = MobileMenu

export { NavBar };