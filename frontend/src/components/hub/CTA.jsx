import React, {useContext} from 'react';
import '../../styles/hub/cta.css';
import {Link} from "react-router-dom";
import userContext from "../../contexts/user-context";

const CTA = () => {
    const {loggedIn} = useContext(userContext);

    return (

        <div className="call-to-action">

            <div className="call-to-action-content">
                <Link to="/authentication"> Fizessen elő a további lehetőségekért </Link>
                <h3> Jeletkezzen be még ma és fedezze fel a végtelen lehetőségeket </h3>
            </div>


            {loggedIn ?
                null
                :
                <div className="call-to-action-button">

                    <Link to="/authentication"> Belépek </Link>
                </div>
            }

        </div>
    );
}

export default CTA;
