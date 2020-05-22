import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";

interface NavbarProps {
    currentUser?: any;
    setCurrentUser(user: any): void;
}

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
    const { currentUser, setCurrentUser } = props;
    const location = useLocation();

    return (
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item key={"/"}>
                <Link to={"/"}>Home</Link>
            </Menu.Item>
            {currentUser === undefined && (
                <Menu.Item key={"/login"}>
                    <Link to={"/login"}>Login</Link>
                </Menu.Item>
            )}
            {currentUser !== undefined && [
                <Menu.Item>
                    <Link to={"/profile"}>Profile</Link>
                </Menu.Item>,
                <Menu.Item
                    style={{ float: "right" }}
                    key={"/logout"}
                    onClick={() => {
                        Auth.signOut().then(() => setCurrentUser(undefined));
                    }}
                >
                    Log Out
                </Menu.Item>,
                <Menu.Item disabled={true} style={{ float: "right" }}>
                    Signed in as {currentUser.username}
                </Menu.Item>,
            ]}
        </Menu>
    );
};

export default Navbar;
