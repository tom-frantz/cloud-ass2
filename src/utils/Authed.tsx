import React, { useContext } from "react";
import { Redirect } from "react-router";
import { withAuthenticator } from "@aws-amplify/ui-react";

interface AuthedProps {}

export const AuthContext = React.createContext<{ currentUser?: any }>({ currentUser: undefined });

const Authed: React.FC<AuthedProps> = withAuthenticator((props: AuthedProps) => {
    const { currentUser } = useContext(AuthContext);
    return <>{currentUser && <Redirect to={"/"} />}</>;
});

export default Authed;
