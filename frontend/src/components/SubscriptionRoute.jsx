import {Navigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import isSubscribed from "../helpers/isSubscribed";
import userContext from "../contexts/userContext";


const SubscriptionRoute = ({component: Component}) => {
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    const {setSubscribed} = useContext(userContext);


    useEffect(() => {
        isSubscribed().then(res => {
            if (res) {
                setSubscribed(true);
                setLoading(false);
            } else {
                setSubscribed(false);
                setRedirect(true);
            }
        })
    }, [setSubscribed]);


    if (redirect) {
        return <Navigate to="/checkout" replace />;
    }

    return loading ? null : <Component setRedirect={setRedirect} />
}

export default SubscriptionRoute;