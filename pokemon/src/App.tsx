import Details from "./pages/Details/Details";
import LayoutHome from "./pages/home/layout/LayoutHome";
import { Routes, Route, BrowserRouter } from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pokemon" element={<LayoutHome />} />
        <Route path="/pokemon/details/:id" element={<Details />} />
        <Route path="*" element={<LayoutHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
