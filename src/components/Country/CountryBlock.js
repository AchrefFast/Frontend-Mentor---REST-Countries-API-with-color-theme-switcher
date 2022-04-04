import classes from "./CountryBlock.module.scss";
import React from 'react';
import PropTypes from 'prop-types'

const CountryBlock = (props) => {
    return (
        <div className={`${classes["country-block"]} ${props.theme === 'dark' ? classes.dark : ''}`}>
            <div className={classes['image-container']}>
                <picture>
                    <source type="image/svg+xml" srcSet={props.image.svg} />
                    <source type="image/png" srcSet={props.image.png} />
                    <img src={props.image.png} alt={props.name} loading='lazy' width='264' height='162' />
                </picture>
            </div>
            <div className={classes["country-block--body"]}>
                <h2>{props.name}</h2>
                <p>
                    {`Population: `}
                    <span>{props.population.toLocaleString()}</span>
                </p>
                <p>
                    {`Region: `}
                    <span>{props.region}</span>
                </p>
                <p>
                    {`Capital: `}
                    <span>{props.capital}</span>
                </p>
            </div>
        </div>
    );
};

CountryBlock.propTypes = {
    name: PropTypes.string.isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    capital: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
}

export default CountryBlock;
