import React from 'react';
import Feature from './Feature';
import '../../styles/hub/features.css';
import {Link} from "react-router-dom";



const featuresData = [
  {
    title: 'Ossza meg véleményét másokkal is',
    text: 'A jól megírt vélemény segíthet másoknak megtalálni a számukra éppen megfelelő tartalmakat.',
  },
  {
    title: 'Népszerű tartalmak tárháza',
    text: 'Ismerje meg a világ legismertebb média tartalmait.',
  },
  {
    title: 'Betekintés a jövőbeni tartalmakba',
    text: 'Böngésszen a hamarosan megjelenő tartalmak között.',
  },
  {
    title: 'Adja kedvenceihez a kivánt tartalmakat',
    text: 'Legyen az megjelent vagy sem, tudomásunkra adhatja kedvenc média tartalmai listáját.',
  },
];



const Features = () => (

  <div className = "what-movieseeker__features section__padding" id = "possibilities">


    <div className = "what-movieseeker__features-heading">
      <h1 className = "gradient__text"> A jövő megérkezett, csak szembesülnie kell vele. Lépjen a jövőbe és tegye megtörténté még ma </h1>

      <Link to = "/authentication"> Regisztráljunk a kezdéshez </Link>
    </div>


    <div className = "what-movieseeker__features-container">
      {featuresData.map((item, index) => (
        <Feature title = { item.title } text = { item.text } key = { item.title + index } />
      ))}

    </div>
  </div>
);

export default Features;
