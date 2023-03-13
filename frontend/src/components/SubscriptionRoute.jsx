import {Navigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import isSubscribed from "../helpers/isSubscribed";
import userContext from "../contexts/userContext";


const SubscriptionRoute = ({component: Component}) => {
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    const {setRank} = useContext(userContext);


    useEffect(() => {
        isSubscribed().then(res => {
            if (res) {
                setLoading(false);
            } else {
                setRank("U");
                setRedirect(true);
            }
        })
    }, [setRank]);


    if (redirect) {
        return <Navigate to="/authentication" replace />;
    }

    return loading ? null : <Component setRedirect={setRedirect} />
}

export default SubscriptionRoute;