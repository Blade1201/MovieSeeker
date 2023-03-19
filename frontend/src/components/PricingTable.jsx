import "../styles/pricingTable.css"
import PricingTableOption from "./PricingTableOption";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import UserContext from "../contexts/userContext";
import {Link} from "react-router-dom";
import Back from "../images/back.png";

const PRICING_TABLE = [
    {
        name: "1 HÓNAP",
        price: 300,
        sign: "M"
    },
    {
        name: "6 HÓNAP",
        price: 1200,
        sign: "S"
    },
    {
        name: "12 HÓNAP",
        price: 2700,
        sign: "A"
    }
]

const PricingTable = () => {

    const navigate = useNavigate();
    const {loggedIn, subscribed, setSubscribed} = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (subscribed) {
            navigate("/");
        } else {
            setLoading(false);
        }
    }, [subscribed, loggedIn, navigate]);

    const handleClick = async (type) => {
        if (!type.trim()) return;

        try {
            await axios.post("/subscription", {type});
            setSubscribed(true);
            alert("Sikeres előfizetés!");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        !loading ?
            <div className="pricingTable">

                <div className = "back-to-hub">
                    <Link to = "/">  <img src = { Back } alt = "back-to-hub"/> </Link>
                </div>

                <h1 className="mainText">Fizessen elő az extra tartalmakért!</h1>
                <div className="group">
                {PRICING_TABLE.map((subType) =>
                    <PricingTableOption
                        name={subType["name"]}
                        price={subType["price"]}
                        value={subType["sign"]}
                        key={subType["sign"]}
                        onClick={() => handleClick(subType["sign"])}
                    />)}
                </div>
            </div>
            :
            null
    )
}

export default PricingTable;