
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Components/pages/Home";
import AdvanceSearch from "./Components/pages/AdvanceSearch";

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home}/>
          <Route path="/advanceSearch" exact Component={AdvanceSearch}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;