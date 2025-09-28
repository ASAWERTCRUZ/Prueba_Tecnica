import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import DetailPost from "./pages/DetailPost";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirección inicial */}
        <Route path="/" element={<Navigate to="/pagina-principal" />} />

        {/* Home */}
        <Route path="/pagina-principal" element={<Home />} />

        {/* Post */}
        <Route path="/pagina-principal/detail/:id" element={<DetailPost />} />
      </Routes>
    </Router>
  );
}

export default App;
