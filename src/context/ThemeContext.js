import { createContext, useContext, useReducer } from 'react';

const ThemeContext = createContext();

const themeReducer = (state, action) => {
 switch (action.type) {
    case 'SET_THEME':
      return action.payload;
    default:
      return state;
 }
};

const useTheme = () => {
 const context = useContext(ThemeContext);
 if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
 }
 return context;
};

const ThemeProvider = ({ children }) => {
 const [state, dispatch] = useReducer(themeReducer, { color: 'red' });

 const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
 };

 return (
    <ThemeContext.Provider value={{ theme: state, setTheme }}>
      {children}
    </ThemeContext.Provider>
 );
};

export { ThemeProvider, useTheme };