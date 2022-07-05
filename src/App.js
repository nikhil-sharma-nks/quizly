import './App.scss';
import { Navbar } from './components';
import { useTheme } from './context';
import RoutesContainer from './routes/RoutesContainer';
import { ToastContainer } from 'react-toastify';

function App() {
  const { theme } = useTheme();
  return (
    <div className={`App theme-${theme}`}>
      <Navbar />
      <ToastContainer style={{ top: '5rem' }} />
      <RoutesContainer />
    </div>
  );
}

export default App;
