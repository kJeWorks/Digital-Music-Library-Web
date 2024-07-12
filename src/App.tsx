import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { PageType } from "./types/PageType";
import { useState } from "react";
import { PAGES } from "./utils/constants";

function App() {
  const [pages, setPages] = useState<Array<PageType>>(PAGES as PageType[]);

  return (
    <BrowserRouter>
      <Navbar pages={pages} setPages={setPages} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
