import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/Authed";
import { temperature } from "../graphql/queries";
import { API, Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { GRAPHQL_AUTH_MODE, graphqlOperation } from "@aws-amplify/api-graphql";
import awsconfig from "../aws-exports";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";

interface WeatherProps {}

const Weather: React.FC<WeatherProps> = (props: WeatherProps) => {
    const { currentUser } = useContext(AuthContext);
    const [weather, setWeather] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (weather === undefined && currentUser !== undefined) {
            // @ts-ignore
            API.graphql(graphqlOperation(temperature)).then((res) => {
                console.log(res);
                setWeather(res.data.temperature);
            });
        }
    }, [weather, currentUser]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                flexGrow: 1,
                height: "100%",
                flexDirection: "column",
            }}
        >
            {weather && currentUser && <h1>{`The weather is ${weather} degrees!`}</h1>}
            {weather === undefined && currentUser !== undefined && <h1>Loading...</h1>}
            {currentUser === undefined && <h1>You need to sign in!</h1>}
            <p>This prediction was powered by machine learning.</p>
            {currentUser === undefined && (
                <Link to={"/login"}>you need to sign in to see the prediction! Sign up here!</Link>
            )}
        </div>
    );
};

export default Weather;
