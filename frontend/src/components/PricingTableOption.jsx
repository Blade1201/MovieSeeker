const PricingTableOption = ({name, price, sign, onClick}) => {
    return (
        <div className="columns">
            <ul className="price">
                <li className="header">{name}</li>
                <li style={{background: "black"}}>{price} Ft</li>
                <li className="button" value={sign} onClick={onClick}>Megveszem!</li>
            </ul>
        </div>
    )
}

export default PricingTableOption;