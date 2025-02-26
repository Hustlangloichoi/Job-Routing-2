import './App.css';
import { useState, useContext, createContext } from 'react';
import SearchAppBar from './components/SearchAppBar';
import InfoBox from './components/InfoBox'
import BasicPagination from './components/BasicPagination';
// import { Box } from '@mui/material';
// import Grid from '@mui/material/Grid';
import { Container, Grid2} from '@mui/material';
import jobs from './jobs.json';
import { fakeAuthProvider } from './Auth';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from "react-router-dom";

function App() {
  return (
<AuthProvider>
<SearchAppBar/>
<Container maxWidth="lg" sx={{mt:'10px'}} >
<Grid2 container spacing = {2}>
{jobs.slice(0,5).map(job => (<Grid2 size={4}><InfoBox job={job}></InfoBox></Grid2>))}
</Grid2>
</Container>
<BasicPagination/>
</AuthProvider>
  );
}

export default App;

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}


// route bọc lấy nút sign in,