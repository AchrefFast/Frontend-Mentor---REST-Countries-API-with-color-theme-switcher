import classes from "./App.module.scss";
import MainHeader from "./components/MainHeader/MainHeader";
import Main from "./components/Pages/Main";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./context/theme-context";
import { useContext, useEffect, useState } from "react";
import Country from "./components/Pages/Country";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

// import React, { useState } from "react";
// import { countries } from "./data";
// import CountryList from "./components/Country/CountryList";
// import Search from "./components/Inputs/Search";
// import Select from "./components/Custom/Select";
function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const context = useContext(AppContext);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://restcountries.com/v2/all');
        if (!response.ok) {
          throw new Error('Can\'n fetch countries..');
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }

    fetchCountries();
  }, [])

  return (

    <div className={`${classes.app} ${context.theme === 'dark' ? classes.dark : ''}`}>
      <MainHeader theme={context.theme} />
      {isLoading && <div className={classes.loading}><LoadingSpinner /></div>}
      {!isLoading && error && <h2>{error}</h2>}
      {!isLoading && !error &&
        <Routes>
          {/* <Route path="/" element={<Main theme={context.theme} />} /> */}
          <Route path="/country/:name" element={<Country countries={countries} theme={context.theme} />} />
          <Route path='/' >
            <Route path='/' element={<Main theme={context.theme} countries={countries} />} />
            <Route path='/:page' element={<Main theme={context.theme} countries={countries} />} />
            <Route path='/region/:region/' element={<Main theme={context.theme} countries={countries} />} />
            <Route path='/region/:region/:page' element={<Main theme={context.theme} countries={countries} />} />
          </Route>
        </Routes>
      }
      {/* <main className={classes.main}>
        <div className={classes.inputs}>
          <Search />
          <Select
            label="List of Regions"
            defaultValue="Filter by Region"
            theme="dark"
            onChange={selectClickHandler}
            list={["All", "Africa", "Americas", "Asia", "Europe", "Oceania"]}
          />
        </div>
        <CountryList countries={countriesList} />
      </main> */}
    </div>

  );
}
export default App;
