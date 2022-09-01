import "./App.css";
import CountryDetails from './components/CountryDetails';
import CountriesList from "./components/CountriesList";
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const apiURL = 'https://ih-countries-api.herokuapp.com/countries';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get(apiURL);
      setCountries(response.data);
    };
    apiCall();
  }, []);

  return (
    <div className="App">
      <Navbar />
    <div className="container">
    <div className="row">
      <CountriesList countryInfo={countries} />
      <Routes>
        <Route
          path="/:countryId"
          element={<CountryDetails countries={countries} />}
        />
      </Routes>
    </div>
    </div>
    </div>
  );
}
export default App;