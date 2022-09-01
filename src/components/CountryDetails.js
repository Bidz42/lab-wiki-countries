import countriesJSON from './../countries.json';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function getCountry(alpha) {
    const aCountry = countriesJSON.find((aCountry) => {
    return aCountry.alpha3Code === alpha;
    });
    return aCountry.name.common;
}

function CountryDetails(countries) {
    const { countryId } = useParams();
    const [targetCountry, setTargetCountry] = useState(null);

    useEffect(() => {
        const apiCall = async () => {
        const response = await axios.get(
        'https://ih-countries-api.herokuapp.com/countries/' + countryId
        );
        setTargetCountry(response.data);
        };
        apiCall();
    }, [countryId]);

    return (
        <div className="col-7">

        <img
            src={`https://flagpedia.net/data/flags/icon/72x54/${targetCountry.alpha2Code.toLowerCase()}.png`}
            alt={`flag-of-${targetCountry.name.common}`}
            style={{ width: '100px' }}
        />

        <h1>{targetCountry.name.common}</h1>

        <table className="table">
            <thead></thead>
            <tbody>

                <tr>
                    <td style={{ width: '30%' }}>Capital</td>
                    <td>{targetCountry.capital[0]}</td>
                </tr>
                
                <tr>
                    <td>Area</td>
                    <td>
                    {targetCountry.area} km<sup>2</sup>
                    </td>
                </tr>
                
                <tr>
                    <td>Borders</td>
                    <td>
                        <ul>
                        {targetCountry.borders.map((alpha, i) => {
                            return (
                                <li key={i}>
                                <Link to={'/' + alpha}>{getCountry(alpha)}</Link>
                                </li>
                            );
                        })}
                        </ul>
                </td>
                </tr>

        </tbody>
      </table>

    </div>
  );
}

export default CountryDetails;