import {Navigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import isLoggedIn from "../helpers/isLoggedIn";


const ProtectedRoute = ({component: Component}) => {

    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        isLoggedIn().then(success => {
            success ? setLoading(false) : setRedirect(true)
        })
    }, []);


    if (redirect) {
        return <Navigate to="/authentication" replace />;
    }


    return loading ? null : <Component setRedirect={setRedirect} />
}

export default ProtectedRoute;