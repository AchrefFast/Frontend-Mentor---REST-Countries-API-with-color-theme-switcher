import classes from "./Pagination.module.scss";
import { Link } from 'react-router-dom';
const Pagination = (props) => {
    const pagesNumber = Math.ceil(props.totalItems / props.itemsPerPage);
    let pages = [];
    for (let i = 1; i <= pagesNumber; i++) {
        pages.push(i);
    }
    return (
        <nav role='navigation' aria-label="Pagination Navigation" className={`${classes.nav} ${props.theme === 'dark' ? classes.dark : ''}`}>
            <ul className={classes.pagination}>
                {pages.map((page) => (
                    <li className={props.active === page ? classes.active : ''} key={page}  ><button onClick={() => { props.onClick(page) }} aria-label={props.active === page ? `Current Page, Page ${page}` : `Go to Page ${page}`} aria-current={props.active === page}>{page}</button></li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
