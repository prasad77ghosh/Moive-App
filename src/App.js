import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import List from "./Components/List";
import Favourite from "./Components/Favourite";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <List />
            </>
          }
        />
        <Route path="/favourites" element={<Favourite />} />
      </Routes>
    </Router>
  );
};

export default App;
