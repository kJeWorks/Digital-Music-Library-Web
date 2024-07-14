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

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchInterval: Infinity,
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
          <Route path="/artists/:id" element={<ArtistDetails />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/:id" element={<AlbumDetails />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
