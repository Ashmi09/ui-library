import React, { createContext, useContext } from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./NavBar.module.css"

type NavBarContextProps = {
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

type NavBarLogoProps = {
    children: React.ReactNode;
}

type NavBarLinksProps = {
    children: React.ReactNode;
}

type NavBarLinkItemProps = {
    children: React.ReactElement;
}

type NavBarActionProps = {
    children: React.ReactNode;
}

type NavBarToggleProps = {
    children?: React.ReactNode
}

type NavBarCollapseProps = {
    children: React.ReactNode;
}

type NavBarProps = {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
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

function Logo({ children }: NavBarLogoProps) {
    useNavBarContext();
    return (
        <div className={styles.logo}>
            {children}
        </div >
    )
}

function Links({ children }: NavBarLinksProps) {
    useNavBarContext();
    return (
        <ul className={styles.links}>
            {children}
        </ul>
    )
}

function LinkItem({ children }: NavBarLinkItemProps) {
    useNavBarContext();
    return (
        <li>
            <Slot className={styles.link}>
                {children}
            </Slot>
        </li>
    )
}

function Actions({ children }: NavBarActionProps) {
    useNavBarContext();
    return (
        <div className={styles.actions}>
            {children}
        </div >
    )
}

function Toggle({ children }: NavBarToggleProps) {
    const { open, setOpen } = useNavBarContext();
    // const [isMobile, setIsMobile] = useState(() => {
    //     if (typeof window !== "undefined") return window.innerWidth <= 768;
    //     return true; // fallback for SSR
    // });

    // useEffect(() => {
    //     const handleResize = () => setIsMobile(window.innerWidth <= 768);
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    if (!setOpen) return null; // Only render on mobile


    return (
        <button
            className={styles.toggle}
            type="button"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
        >
            {children ?? "☰"}
        </button>

    )
}

function Collapse({ children }: NavBarCollapseProps) {
    const { open } = useNavBarContext();
    // const [isMobile, setIsMobile] = useState(
    //     typeof window !== "undefined" ? window.innerWidth <= 768 : true
    // );

    // useEffect(() => {
    //     const handleResize = () => setIsMobile(window.innerWidth <= 768);
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    // Only render on mobile AND if open
    // if (!open || !isMobile) return null;
    if (!open) return null;

    return <div className={styles.collapse}>
        {children}
    </div>;

}

function findDirectChild<P>(
    children: React.ReactNode,
    component: React.JSXElementConstructor<P>
): React.ReactElement<P> | undefined {
    return React.Children.toArray(children).find(
        (child): child is React.ReactElement<P> =>
            React.isValidElement<P>(child) && child.type === component
    );
}

function containsComponent<P>(
    children: React.ReactNode,
    component: React.JSXElementConstructor<P>
): boolean {
    let found = false;

    React.Children.forEach(children, (child) => {
        if (found) return;

        if (!React.isValidElement<P>(child)) return;

        if (child.type === component) {
            found = true;
            return;
        }

        const childProps = child.props as { children?: React.ReactNode };
        if (childProps.children) {
            found = containsComponent(childProps.children, component);
        }
    });

    return found;
}


function NavBar({ children, open: controlledOpen, onOpenChange, className }: NavBarProps) {

    const [internalOpen, setInternalOpen] = React.useState(false);

    const open = controlledOpen ?? internalOpen;
    const setOpen = onOpenChange ?? setInternalOpen;

    const collapseChild = findDirectChild(children, Collapse);
    const linksChild = findDirectChild<NavBarLinksProps>(children, Links);
    const hasToggle = findDirectChild(children, Toggle);

    const renderedChildren = React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        if (child.type === Actions) {
            // Only inject Toggle if missing
            const childProps = child.props as { children?: React.ReactNode }
            if (!containsComponent(childProps.children, Toggle)) {
                return React.cloneElement(child, {}, (
                    <>
                        {childProps.children}
                        <Toggle />
                    </>
                ));
            }
        }

        return child;
    });
    if (hasToggle) {
        console.warn(
            "NavBar.Toggle cannot be a direct child of NavBar. Move it inside NavBar.Actions."
        );
    }
    return (
        <NavBarContext.Provider value={{ open, setOpen }}>
            <nav className={`${styles.navbar} ${className ?? ""}`} data-open={open ? "" : undefined}>
                {renderedChildren}
                {!collapseChild && linksChild && (
                    <Collapse>
                        {linksChild}
                    </Collapse>
                )}
            </nav >
        </NavBarContext.Provider>
    )
}

NavBar.Logo = Logo
NavBar.Links = Links
NavBar.LinkItem = LinkItem
NavBar.Actions = Actions
NavBar.Toggle = Toggle
NavBar.Collapse = Collapse

export { NavBar };