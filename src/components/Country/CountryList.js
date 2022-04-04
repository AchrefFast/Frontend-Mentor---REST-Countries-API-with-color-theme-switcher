import CountryBlock from "./CountryBlock";
import classes from "./CountryList.module.scss";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const CountryList = (props) => {
    return (
        <section className={classes["countries-grid"]}>
            {props.countries.map((country) => {
                // console.log(country.capital);

                return (
                    <Link to={`/country/${country.name}`}
                        key={country.numericCode + country.cioc}
                    >
                        <CountryBlock
                            name={country.name}
                            population={country.population}
                            region={country.region}
                            // capital={country.capital}
                            // capital={country.capital ? country.capital[0] : 'Does not have a capital'}
                            capital={country.capital ? country.capital : 'Does not have a capital'}
                            image={country.flags}
                            theme={props.theme}
                        />
                    </Link>
                );
            })}
        </section>
    );
};

CountryList.propTypes = {
    countries: PropTypes.array.isRequired,
};

export default CountryList;
