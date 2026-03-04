import { useState } from "react";
import SongsPage from "./SongsPage";
import BrowserHistoryPage from "./BrowserHistoryPage";

function App() {
  const [page, setPage] = useState<"songs" | "browser">("songs");

  return (
    <div>
      <h1>Challenge 07</h1>
      <button onClick={() => setPage("songs")}>Songs Page</button>
      <button onClick={() => setPage("browser")}>Browser Page</button>
      <hr />
      {page === "songs" && <SongsPage />}
      {page === "browser" && <BrowserHistoryPage />}
    </div>
  );
}

export default App;
