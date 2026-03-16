import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import PartdoHomePage from "./pages/HomePage";
import AuthCard from "./components/auth/AuthCard";
import About from "./pages/About";
import OrderTrackingPage from "./pages/Ordertracking";
import WishlistPage from "./pages/Wishlist";
import Showroom from "./pages/showroom";
import OurPartner from "./pages/OurPartner";
import Catalogue from "./pages/Catalogue";
import UserProfile from "./components/profile/userProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PartdoHomePage />} />
          <Route path="/auth" element={<AuthCard />} />
          <Route path="/about" element={<About />} />
          <Route path="/wishlist" element={<WishlistPage/>} />
          <Route path="/showroom" element={<Showroom/>} />
          <Route path="/partenaires" element={<OurPartner/>} />
          <Route path="/catalogues" element={<Catalogue/>} />
          <Route path="/profile" element={<UserProfile />} />


          

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
