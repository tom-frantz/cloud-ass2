import React, { useContext, useEffect, useState } from "react";
import { API, graphqlOperation } from "@aws-amplify/api";
import { me, temperature } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
import gql from "graphql-tag";
import { AuthContext } from "../utils/Authed";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState<boolean>(false);
    const { currentUser } = useContext(AuthContext);

    const updateValues = () => {
        setLoading(true);
        // @ts-ignore
        API.graphql(graphqlOperation(me)).then(
            ({
                data: {
                    // @ts-ignore
                    me: { email },
                },
            }) => {
                setEmail(email);
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        updateValues();
    }, []);

    const submitValues = () => {
        setLoading(true);
        API.graphql({
            query: gql(updateUser),
            variables: { input: { id: currentUser.attributes.sub, email: email } },
            // @ts-ignore
        }).then(() => {
            updateValues();
        });
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                flexGrow: 1,
                height: "100%",
                width: "auto",
                flexDirection: "column",
            }}
        >
            <h1>Your Profile</h1>
            {loading && <p>Just loading your profile ... </p>}
            <form style={{ width: 200, height: "auto" }}>
                <h3>Email</h3>
                <input
                    style={{ width: 200 }}
                    disabled={loading}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </form>
            <button
                type={"button"}
                onClick={() => {
                    submitValues();
                }}
            >
                Update Profile
            </button>
        </div>
    );
};

export default Profile;
