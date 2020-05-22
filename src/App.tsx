import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";

import Amplify, { Auth, Hub } from "aws-amplify";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { CognitoUser } from "amazon-cognito-identity-js";
import awsconfig from "./aws-exports";

import { Route, Router, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import { Layout } from "antd";

import gql from "graphql-tag";

import Navbar from "./containers/Navbar";
import Weather from "./screens/Weather";
import Profile from "./screens/Profile";
import Authed, { AuthContext } from "./utils/Authed";
import { createUser } from "./graphql/mutations";

Amplify.configure(awsconfig);
Auth.configure({
    region: "us-east-1",
});

interface ListenData {
    payload: { event: string; data?: CognitoUser };
}

const history = createBrowserHistory();
export const client = new AWSAppSyncClient({
    url: awsconfig.aws_appsync_graphqlEndpoint,
    region: awsconfig.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
    }, //Can be User Pools or API Key
    complexObjectsCredentials: () => Auth.currentCredentials(),
});

interface CustomCognito extends CognitoUser {
    attributes: { sub?: string; email?: string };
    username: string;
}

const App: React.FC<{}> = () => {
    const [currentUser, setCurrentUser] = useState<CustomCognito | undefined>(undefined);

    const [register, setRegister] = useState<boolean>(false);

    useEffect(() => {
        // Set up listeners for the case that a user signs in/signs up
        Hub.listen("auth", (data: ListenData) => {
            let user: CustomCognito | undefined = undefined;
            switch (data.payload.event) {
                case "signIn":
                    user = data.payload.data as CustomCognito;
                    // @ts-ignore
                    if (register) {
                        client
                            .mutate({
                                mutation: gql(createUser),
                                variables: {
                                    input: {
                                        id: user.attributes.sub,
                                        username: user.username,
                                        email: user.attributes.email,
                                    },
                                },
                            })
                            .then(() => console.log("Mutate work"))
                            .catch((reason) => console.error(reason));
                        setRegister(false);
                    }
                    setCurrentUser(user);
                    console.info("user signed in"); //[ERROR] My-Logger - user signed in
                    console.log(data);
                    break;
                case "signUp":
                    setRegister(true);
                    break;
                case "signOut":
                    setCurrentUser(undefined);
                    break;
            }
        });
    }, [register]);

    useEffect(() => {
        // get the current authenticated user if it exists
        Auth.currentAuthenticatedUser()
            .then((creds: CognitoUser) => {
                console.info("user already signed in");
                // @ts-ignore
                setCurrentUser(creds);
                console.log(creds);
            })
            .catch();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser: currentUser }}>
            <Router history={history}>
                <Layout style={{ height: "100vh" }}>
                    <Layout.Header>
                        <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser} />
                    </Layout.Header>
                    <Switch>
                        <Layout.Content>
                            <Route path={"/"} exact>
                                <Weather />
                            </Route>
                            <Route path={"/profile"}>
                                {currentUser ? <Profile /> : <Redirect to={"login"} />}
                            </Route>
                            <Route path={"/login"} exact>
                                <div
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        display: "flex",
                                        marginTop: 25,
                                    }}
                                >
                                    <Authed />
                                </div>
                            </Route>
                        </Layout.Content>
                    </Switch>
                    <Layout.Footer>
                        Cloud Computing A2 | Sam Hoch (s3721859) & Thomas Frantz (s3719834)
                    </Layout.Footer>
                </Layout>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
