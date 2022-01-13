import React, { useState } from 'react';
import CategoriesList from './components/CategoryList';
import { getCategories } from './utils/getData';

export const Context = React.createContext();

const App = () => {
    const [categories, setCategories] = useState(getCategories())

    return (
        <Context.Provider value={{ categories, setCategories }}>
            <CategoriesList />
        </Context.Provider>
    );
}

export default App;
