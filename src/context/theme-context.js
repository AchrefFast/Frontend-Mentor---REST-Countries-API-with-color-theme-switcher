import React, { useState } from 'react';

export const AppContext = React.createContext({
    theme: 'light',
    toggleTheme: () => { }
})

export const AppContextProvider = (props) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const toggleTheme = () => {
        setTheme(state => {
            if (state === 'dark') {
                localStorage.setItem('theme', 'light');
                return 'light'
            } else {
                localStorage.setItem('theme', 'dark');
                return 'dark';
            }
        })
    }

    return (
        <AppContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
            {props.children}
        </AppContext.Provider>
    );
}

