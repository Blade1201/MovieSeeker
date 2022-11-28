import React, {useState} from "react";
import "../styles/authentication.css";
import Login from "./Login";
import Register from "./Register";



const Authentication = ({setRedirect}) => {

    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = ( formName ) => {
        setCurrentForm(formName);
    };


    return(

        <div className = "form">
        {
            currentForm === "login" ? <Login onFormSwitch = { toggleForm } setRedirect={setRedirect} /> :
                <Register onFormSwitch = { toggleForm } setRedirect={setRedirect} />
        }
        </div>
    );
};

export default Authentication;