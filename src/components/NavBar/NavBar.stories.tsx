import { NavBar } from './NavBar';

export default {
    title: 'Components/NavBar',
    component: NavBar,
};

export const Default = () => (
    <NavBar>
        <NavBar.Logo>MyLogo</NavBar.Logo>
        <NavBar.Links links={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
        ]} />
        <NavBar.Actions>
            <button>Login</button>
            <button>Sign Up</button>
        </NavBar.Actions>
    </NavBar>
);
