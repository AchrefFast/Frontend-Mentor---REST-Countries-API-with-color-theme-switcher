import classes from './DarkMode.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon as fasMoon } from '@fortawesome/free-solid-svg-icons';
import { faMoon as farMoon } from '@fortawesome/free-regular-svg-icons';
import { Fragment, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/theme-context';


const DarkMode = () => {
    const context = useContext(AppContext);
    const [autoFocus, setAutoFocus] = useState(false);

    useEffect(() => {
        setAutoFocus(true);
    }, [])
    return (
        <Fragment>
            {context.theme === 'light' && <button autoFocus={autoFocus} className={classes.light} onClick={() => { context.toggleTheme(); }}><FontAwesomeIcon icon={farMoon} /> Dark Mode</button>}
            {context.theme === 'dark' && <button autoFocus={autoFocus} className={classes.dark} onClick={() => { context.toggleTheme(); }}><FontAwesomeIcon icon={fasMoon} /> Dark Mode</button>}
        </Fragment >
    );
}

export default DarkMode;