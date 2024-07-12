import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { PageType } from "./types/PageType";
import { useState } from "react";
import { PAGES } from "./utils/constants";

function App() {
  const sessionStoragePages = sessionStorage.getItem('pages');
  const [pages, setPages] = useState<Array<PageType>>(
    sessionStoragePages ? JSON.parse(sessionStoragePages) : PAGES,
  );

  return (
    <BrowserRouter>
      <Navbar pages={pages} setPages={setPages}/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
