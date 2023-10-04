import './App.css';
import {routes } from './routes'
import { useRoutes } from 'react-router';
import NavBar from './components/NavBar';

const App = () => {
  const element = useRoutes(routes)
  return (
    <div>
      <NavBar />
      {element}
    </div>
  );
}

export default App;