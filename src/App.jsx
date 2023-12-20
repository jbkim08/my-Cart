import Navbar from './components/Nabvar/Navbar';
import Routing from './components/Routing/Routing';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routing />
      </main>
    </div>
  );
}

export default App;
