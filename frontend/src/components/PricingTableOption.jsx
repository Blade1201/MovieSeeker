const PricingTableOption = ({name, price}) => {
    return (
        <div className="columns">
            <ul className="price">
                <li className="header">{name}</li>
                <li style={{background: "black"}}>{price} Ft</li>
                <li className="grey"><a href="#" className="button">Megveszem!</a></li>
            </ul>
        </div>
    )
}

export default PricingTableOption;