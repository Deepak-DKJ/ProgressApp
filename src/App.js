import logo from './logo.svg';
import './App.css';
import HomePage from './Components/HomePage';
import { AppProvider } from './Context/AppContext';

function App() {
  return (
    <>
    <AppProvider>
      <div>
        <HomePage />
      </div>
    </AppProvider>
    </>
  );
}

export default App;
