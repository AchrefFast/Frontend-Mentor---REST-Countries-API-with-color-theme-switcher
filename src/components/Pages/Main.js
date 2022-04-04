import React, { useState, Fragment, useRef, useEffect } from "react";
import CountryList from "../Country/CountryList";
import Search from "../Inputs/Search";
import Select from "../Custom/Select";
import classes from "./Main.module.scss";
import Pagination from "../Pagination/Pagination";
import { Route, useParams, useNavigate } from "react-router-dom";

let initial = true;

const Main = ({ theme, countries }) => {
    console.log(countries);
    let navigate = useNavigate();
    const params = useParams();
    // const [filter, setFilter] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 28;
    const mainRef = useRef(null);

    const selectClickHandler = (val) => {
        const region = val.toString().toLowerCase().trim();
        // setFilter(region);
        navigate(`/region/${region}`);
        setCurrentPage(1);
    };

    const region = params && params.region;
    const page = params && params.page;

    useEffect(() => {
        if (initial) {
            initial = false;
            return;
        }
        mainRef.current.scrollIntoView({ behavior: "smooth" });
    }, [currentPage]);

    const changePageHandler = (page) => {
        setCurrentPage(page);
        if (region) {
            navigate(`/region/${region}/${page}`);
        } else navigate(`/${page}`);
    };

    const searchFilterHandler = (value) => {
        setSearchFilter(value);
        if (region) {
            navigate(`/region/${region}/${1}`);
        } else navigate(`/${1}`);
    };

    let countriesList = [];
    if (region === "all" || region === "" || !region) {
        countriesList = countries;
    } else {
        countriesList = countries.filter((country) => {
            return country.region.toLowerCase() === region;
        });
    }
    const numberOfPages = Math.ceil(countriesList.length / itemsPerPage);
    let selPage = 1;
    if (page && +page <= numberOfPages) {
        selPage = +page;
    } else {
        selPage = 1;
    }

    const lastItemOfPage = selPage * itemsPerPage;
    const firstItemOfPage = lastItemOfPage - itemsPerPage;
    let content;
    let search_aria = '';
    if (searchFilter) {
        countriesList = countriesList.filter((country) =>
            country.name
                .toLowerCase()
                .trim()
                .includes(searchFilter.toLowerCase().trim())
        );
        if (countriesList.length === 0) {
            search_aria = 'no country was found';
        } else {
            search_aria = countriesList.length + ' countries was found';
        }
    }
    content = countriesList.slice(firstItemOfPage, lastItemOfPage);

    return (
        <Fragment>
            <main className={classes.main} ref={mainRef}>
                <div className={classes.inputs}>
                    <Search onChange={searchFilterHandler} theme={theme} searchAria={search_aria} />
                    {/* <Selection /> */}
                    {/* <Select selected='Filter by Region' /> */}
                    <Select
                        label="List of Regions"
                        defaultValue="Filter by Region"
                        theme={theme}
                        onChange={selectClickHandler}
                        list={["All", "Africa", "Americas", "Asia", "Europe", "Oceania"]}
                    />
                </div>
                {countriesList.length === 0 && <h2>No country is found.</h2>}
                {countriesList.length !== 0 && (
                    <CountryList countries={content} theme={theme} />
                )}
                <Pagination
                    theme={theme}
                    totalItems={countriesList.length}
                    itemsPerPage={itemsPerPage}
                    onClick={changePageHandler}
                    active={selPage}
                />
            </main>
        </Fragment>
    );
};

export default Main;
