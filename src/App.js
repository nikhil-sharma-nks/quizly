import './App.scss';
import { Navbar } from './components';
import { useTheme } from './context';
import { Home } from './pages';

function App() {
  const { theme } = useTheme();
  return (
    <div className={`App theme-${theme}`}>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
