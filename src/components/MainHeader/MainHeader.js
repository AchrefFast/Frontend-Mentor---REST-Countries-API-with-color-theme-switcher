import DarkMode from './DarkMode';
import classes from './MainHeader.module.scss';

const MainHeader = (props) => {

    return (<header className={`${classes.header} ${props.theme === 'dark' && classes.dark}`}>
        <h1>Where in the world?</h1>
        <DarkMode theme={props.theme} />
    </header>);
}

export default MainHeader;