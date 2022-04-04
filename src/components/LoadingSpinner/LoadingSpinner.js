import classes from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
    return <div className={classes['lds-roller']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

}

export default LoadingSpinner;