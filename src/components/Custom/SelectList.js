import classes from "./SelectList.module.scss";
import { useImperativeHandle, useRef } from "react";
import React from 'react';

const SelectList = (props, ref) => {
    const listRef = useRef();

    useImperativeHandle(ref, () => ({
        firstChild: listRef.current.firstChild,
        lastChild: listRef.current.lastChild,
    }))

    const optionClickHandler = (event) => {
        props.onClick(event);
    }


    const keyHandler = (event) => {
        event.preventDefault();
        const tr = event.target;

        switch (event.key) {
            case "Enter":
                props.onClick(event);
                break;
            case "ArrowDown":
                if (tr.nextSibling) {
                    tr.nextSibling.focus();
                } else {
                    tr.offsetParent.firstChild.focus();
                }
                break;
            case "ArrowUp":
                if (tr.previousSibling) {
                    tr.previousSibling.focus();
                } else {
                    tr.offsetParent.lastChild.focus();
                }
                break;
        }
    };
    return (
        <ul
            className={props.className}
            id={props.id}
            role="listbox"
            onKeyDown={keyHandler}
            ref={listRef}
        >
            {props.list.map((item) => (
                <li role="option" tabIndex={-1} key={item} onClick={optionClickHandler}>
                    {item}{" "}
                </li>
            ))}
        </ul>
    );
};

export default React.forwardRef(SelectList);
