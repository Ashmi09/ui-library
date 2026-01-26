import { NavBar } from "./NavBar";
import React from "react";

export default {
    title: "Components/NavBar",
    component: NavBar,
};

// Default demo
export const Default = () => (
    <NavBar>
        <NavBar.Logo>MyLogo</NavBar.Logo>

        <NavBar.Links>
            <NavBar.LinkItem>
                <a href="#">Home</a>
            </NavBar.LinkItem>
            <NavBar.LinkItem>
                <a href="#">About</a>
            </NavBar.LinkItem>
            <NavBar.LinkItem>
                <a href="#">Projects</a>
            </NavBar.LinkItem>
        </NavBar.Links>

        <NavBar.Actions>
            <button>Login</button>
            <button>Sign Up</button>
        </NavBar.Actions>
    </NavBar>
);

// Customizable CSS demo
export const Themed = () => (
    <div style={{ "--navbar-bg": "rgba(0,0,0,0.6)", "--navbar-link-item-hover-color": "#22c55e" } as React.CSSProperties}>
        <NavBar>
            <NavBar.Logo>Themed</NavBar.Logo>

            <NavBar.Links>
                <NavBar.LinkItem>
                    <a href="#">Home</a>
                </NavBar.LinkItem>
                <NavBar.LinkItem>
                    <a href="#">About</a>
                </NavBar.LinkItem>
            </NavBar.Links>

            <NavBar.Actions>
                <button>Login</button>
            </NavBar.Actions>
        </NavBar>
    </div>
);


// Slot Demo
const FakeLink = ({ children }: { children: React.ReactNode }) => (
    <div role="link" tabIndex={0} style={{ cursor: "pointer", padding: "4px 8px" }}>
        {children}
    </div>
);

export const SlotDemo = () => {
    return (
        <NavBar>
            <NavBar.Logo>SlotDemo</NavBar.Logo>

            <NavBar.Links>
                <NavBar.LinkItem>
                    <FakeLink>Custom Link 1</FakeLink>
                </NavBar.LinkItem>
                <NavBar.LinkItem>
                    <FakeLink>Custom Link 2</FakeLink>
                </NavBar.LinkItem>
            </NavBar.Links>

            <NavBar.Actions>
                <button>Action</button>
            </NavBar.Actions>
        </NavBar>
    );
};

export const Collapsible = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <NavBar open={open} onOpenChange={setOpen}>
                <NavBar.Logo>Collapsible</NavBar.Logo>

                <NavBar.Links>
                    <NavBar.LinkItem>
                        <a href="#">Home</a>
                    </NavBar.LinkItem>
                    <NavBar.LinkItem>
                        <a href="#">Docs</a>
                    </NavBar.LinkItem>
                </NavBar.Links>

                <NavBar.Actions>
                    <NavBar.Toggle>
                        Menu
                    </NavBar.Toggle>
                </NavBar.Actions>

                <NavBar.Collapse>
                    <NavBar.Links>
                        <NavBar.LinkItem>
                            <a href="#">Home</a>
                        </NavBar.LinkItem>
                        <NavBar.LinkItem>
                            <a href="#">Docs</a>
                        </NavBar.LinkItem>
                    </NavBar.Links>
                </NavBar.Collapse>
            </NavBar>
        </div>
    );
};