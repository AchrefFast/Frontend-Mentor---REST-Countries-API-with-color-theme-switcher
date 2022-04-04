import { Fragment, useState, useEffect, useRef } from "react";
import classes from "./Select.module.scss";
import SelectList from "./SelectList";

const Select = (props) => {
    const [listState, setListState] = useState("initial");
    const buttonRef = useRef();
    const listRef = useRef();
    const selectRef = useRef();

    // Handling the click outside the select component which will reset the state of our list
    const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setListState("close");
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);
    /////////////////////////////////////////////////

    const clickOptionHandler = (event) => {
        buttonRef.current.focus();
        buttonRef.current.textContent = event.target.textContent;
        setListState("close");
        props.onChange(event.target.textContent);
    };

    const selectKeyDownHandler = (event) => {
        if (event.key === "Escape") {
            setListState("close");
            buttonRef.current.focus();
        }
    };

    const buttonKeyDownHandler = (event) => {
        event.preventDefault();
        if (event.key === "Tab") {

            buttonRef.current.parentElement.parentElement.nextElementSibling.firstChild.focus();
        }
        if (event.key === "ArrowDown") {
            setListState("open");
            listRef.current && listRef.current.firstChild.focus();
        }
        if (event.key === "ArrowUp") {
            setListState("open");
            listRef.current && listRef.current.lastChild.focus();
        }
        if (event.key === "Enter") {
            setListState((state) => {
                if (state === "open") {
                    return "close";
                } else {
                    return "open";
                }
            });
        }
    };

    const clickButtonHandler = () => {
        setListState((state) => {
            if (state === "open") {
                return "close";
            } else {
                return "open";
            }
        });
    };

    return (
        <Fragment>
            <label
                htmlFor="custom-select-input"
                className={classes["hidden-visually"]}
            >
                {props.label}
            </label>
            <div
                className={`${classes["custom-select-element"]} ${props.theme === 'dark' ? classes.dark : ''}`}
                id="select-element"
                onKeyDown={selectKeyDownHandler}
                ref={selectRef}
                aria-expanded={listState === "open"}
                role="combobox"
                aria-haspopup="listbox"
                aria-owns="custom-select-list"
            >
                <button
                    id="custom-select-input"
                    className={classes["custom-select-button"]}
                    aria-describedby="custom-select-info"
                    aria-controls="custom-select-list"
                    ref={buttonRef}
                    onMouseDown={clickButtonHandler}
                    onKeyDown={buttonKeyDownHandler}
                >
                    {props.defaultValue}
                </button>
                <span id="custom-select-info" className={classes["hidden-visually"]}>
                    Arrow down or up for options or click enter
                </span>
                <span className={classes["custom-select-icons"]}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        width={14}
                        height={14}
                        focusable={false}
                        aria-hidden={true}
                        id="icon-circle-down"
                        className={classes.icon}
                        role="img"
                    >
                        <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
                    </svg>
                </span>
                {listState === "open" && (
                    <SelectList
                        list={props.list}
                        className={classes["custom-select-list"]}
                        id="custom-select-list"
                        onClick={clickOptionHandler}
                        ref={listRef}
                    />
                )}
            </div>
        </Fragment>
    );
};

export default Select;
