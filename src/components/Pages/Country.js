import classes from "./Country.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from 'react';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
const Country = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const pageRef = useRef(null);
    const pathName = useLocation();

    useEffect(() => {
        // pageRef.current.scrollIntoView({ behavior: "smooth" });
        // window.scrollTo(0, 0 );
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [pathName]);


    const backClickHandler = () => {
        navigate("/");
    };

    if (!params) {
        return <h2>Ther is no country with such name!!</h2>;
    }

    const country = props.countries.find(
        (country) => country.name.toLowerCase() === params.name.toLowerCase()
    );
    let borders = [];
    let ctr;
    for (let symbol of country.borders || []) {
        ctr = props.countries.find((country) => country.alpha3Code === symbol);
        borders.push(ctr.name);
    }
    if (!country) {
        return <h2>Ther is no country with such name!!</h2>;
    }
    return (
        <main
            ref={pageRef}
            className={`${classes.main} ${props.theme === "dark" ? classes.dark : ""
                }`}
        >
            <button type="button" onClick={backClickHandler}>
                <FontAwesomeIcon icon={faArrowLeftLong} />
                Back
            </button>
            <section>
                <div className={classes['image-container']}>
                    <picture>
                        <source type="image/svg+xml" srcSet={country.flags.svg} />
                        <source type="image/png" srcSet={country.flags.png} />
                        <img
                            src={country.flags.png}
                            alt={country.name}
                            width={560}
                            height={400}
                        />
                    </picture>
                </div>
                <div className={classes.body}>
                    <h2>{country.name}</h2>
                    <div className={classes.details}>
                        <div className={classes["details--left"]}>
                            <p>Native Name: <span>{country.nativeName}</span></p>
                            <p>Population: <span>{country.population.toLocaleString()}</span></p>
                            <p>Region: <span>{country.region}</span></p>
                            <p>Sub Region: <span>{country.subregion}</span></p>
                            <p>Capital: <span>{country.capital || "Does not have a capital"}</span></p>
                        </div>
                        <div className={classes["details--right"]}>
                            <p>
                                Top Level Domain:{" "}<span>
                                    {(country.topLevelDomain || []).map((elm, i) => {
                                        if (i === country.topLevelDomain.length - 1) {
                                            return elm;
                                        } else return elm + ", ";
                                    })}</span>
                            </p>
                            <p>
                                Currencies:{" "}<span>
                                    {(country.currencies || []).map((elm, i) => {
                                        if (i === country.currencies.length - 1) {
                                            return elm.name;
                                        } else return elm.name + ", ";
                                    })}</span>
                            </p>
                            <p>
                                Languages:{" "}<span>
                                    {(country.languages || []).map((elm, i) => {
                                        if (i === country.languages.length - 1) {
                                            return elm.name;
                                        } else return elm.name + ", ";
                                    })}</span>
                            </p>
                        </div>
                    </div>
                    <div className={classes.border}>
                        <p>Border Countries: </p>
                        <ul className={classes["border--countries"]}>
                            {borders.length === 0 && <li><p>Does not have borders</p></li>}
                            {borders.length !== 0 &&
                                borders.map((country, i) => (
                                    <li key={i}>
                                        <Link to={`/country/${country}`}>{country}</Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Country;
