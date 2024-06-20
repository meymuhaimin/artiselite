
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact />
          {/* <Route path="/services" component={Services} />
          <Route path="/products" component={Products} />
          <Route path="/sign-up" component={SignUp} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;