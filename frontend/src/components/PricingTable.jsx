import "../styles/pricing-table.css"
import PricingTableOption from "./PricingTableOption";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import UserContext from "../contexts/userContext";

const PRICING_TABLE = [
    {
        name: "Havi",
        price: 300,
        sign: "M"
    },
    {
        name: "Féléves",
        price: 1500,
        sign: "S"
    },
    {
        name: "Éves",
        price: 2700,
        sign: "A"
    }
]

const PricingTable = () => {

    const navigate = useNavigate();
    const {loggedIn, subscribed, setSubscribed} = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!loggedIn) {
            navigate("/authentication");
        }
        else if (subscribed) {
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
            <div style={{color: "#FFF"}}>
                <h1 style={{textAlign: "center"}}>Fizess elő az extra tartalmakért!</h1>
                {PRICING_TABLE.map((subType) =>
                    <PricingTableOption
                        name={subType["name"]}
                        price={subType["price"]}
                        value={subType["sign"]}
                        key={subType["sign"]}
                        onClick={() => handleClick(subType["sign"])}
                    />)}
            </div>
            :
            null
    )
}

export default PricingTable;