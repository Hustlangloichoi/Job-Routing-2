import './App.css';
import SearchAppBar from './components/SearchAppBar';
import InfoBox from './components/InfoBox'

function App() {
  return (
    <div>
      <SearchAppBar></SearchAppBar>
      <div className='info-container'>
      <InfoBox></InfoBox>
      <InfoBox></InfoBox>
      <InfoBox></InfoBox>
      <InfoBox></InfoBox>
      <InfoBox></InfoBox>
      </div>
    </div>
  );
}

export default App;
