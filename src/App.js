import './App.css';
import * as React from 'react';
import SearchAppBar from './components/SearchAppBar';
import InfoBox from './components/InfoBox'
import BasicPagination from './components/BasicPagination';
// import { Box } from '@mui/material';
// import Grid from '@mui/material/Grid';
import { Container, Grid2} from '@mui/material';
import jobs from './jobs.json'

function App() {
  return (
<div>
<SearchAppBar></SearchAppBar>

<Container maxWidth="lg" sx={{mt:'10px'}} >
<Grid2 container spacing = {2}>
{jobs.slice(0,5).map(job => (<Grid2 size={4}><InfoBox job={job}></InfoBox></Grid2>))}
</Grid2>
</Container>
<BasicPagination></BasicPagination>
</div>
  );
}

export default App;
