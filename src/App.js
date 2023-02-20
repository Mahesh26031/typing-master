import "./App.css";
import { Router, Routes, Route, Switch, BrowserRouter } from "react-router-dom";

import Form from "./components/Form";
import Type from "./components/Type";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/type" element={<Type />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
