import {Navigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import isLoggedIn from "../helpers/isLoggedIn";


const GuestRoute = ({component: Component}) => {

    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => console.log(redirect), [redirect]);


    useEffect(() => {
        isLoggedIn().then(success => {
            success ? setRedirect(true) : setLoading(false);
        })
    }, []);


    if (redirect) {
        return <Navigate to="/" replace />;
    }


    return loading ? null : <Component setRedirect={setRedirect} />
}

export default GuestRoute;