import "../styles/pricing-table.css"
import PricingTableOption from "./PricingTableOption";

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
    return (
        <div style={{color: "#FFF"}}>
            <h1 style={{textAlign: "center"}}>Fizess elő az extra tartalmakért!</h1>
            {PRICING_TABLE.map((subType) =>
                <PricingTableOption name={subType["name"]} price={subType["price"]} key={subType["sign"]}/>)}
        </div>
    )
}

export default PricingTable;