const PricingTableOption = ({name, price, onClick}) => {
    return (
    <div className="container">
        <div className="containerContent">
            <h2 className="subLength">{name}</h2>
            <h3 className="subPrice"><sup>Ft.</sup>{price}<span className="small">/hó</span></h3>
            <p className="titleBanner">MovieSeeker</p>
            <ul>
                <li>Top 50 média tartalom</li>
                <li>Média tartalom értékelése</li>
                <li>Nézőlista</li>
                <li>Mozgókép (GIF) feltöltése profilképnek</li>
            </ul>
            <i className="button" onClick={onClick}>VÁSÁROL</i>
        </div>
    </div>
    )
}

export default PricingTableOption;