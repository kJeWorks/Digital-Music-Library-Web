import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { PageType } from "./types/PageType";
import { useState } from "react";
import { PAGES } from "./utils/constants";
import Artists from "./pages/Artists";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Albums from "./pages/Albums";
import ArtistDetails from "./pages/ArtistDetails";
import AlbumDetails from "./pages/AlbumDetails";
import Error from "./pages/Error";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchInterval: 1000,
    },
  },
});

function App() {
  const sessionStoragePages = sessionStorage.getItem('pages');
  const [pages, setPages] = useState<Array<PageType>>(
    sessionStoragePages ? JSON.parse(sessionStoragePages) : PAGES,
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar pages={pages} setPages={setPages} />
        <Routes>
          <Route path="/" element={<Home pages={pages} setPages={setPages} />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artists/:id" element={<ArtistDetails pages={pages} setPages={setPages}/>} />
          <Route path="/albums" element={<Albums pages={pages} setPages={setPages}/>} />
          <Route path="/albums/:id" element={<AlbumDetails pages={pages} setPages={setPages} />} />
          <Route path="*" element={<Error pages={pages} setPages={setPages} />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
