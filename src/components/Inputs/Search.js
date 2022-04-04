import classes from './Search.module.scss';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Search = (props) => {
    const [value, setValue] = useState('');
    const [sAria, setSearchAria] = useState('');
    const { searchAria } = props;
    useEffect(() => {
        if (searchAria) {
            const timer = setTimeout(() => {
                setSearchAria(searchAria);
            }, 1500);
            return () => {
                clearTimeout(timer);
            }
        }
    }, [searchAria])

    const inputChangeHandler = (event) => {
        setValue(event.target.value);
        props.onChange(event.target.value);
    }

    return <div className={`${classes.search} ${props.theme === 'dark' ? classes.dark : ''}`} >
        <label htmlFor='search' className={classes['sr-only']}>Search for country</label>
        <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
        <input id='search' type='text' placeholder='Search for a country...' value={value} onChange={inputChangeHandler} />
        <p aria-live='polite' className={classes['sr-only']}>{sAria}</p>
    </div>

}

Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default Search;