import { Route, Routes } from "react-router-dom";

import CamerasPage from "./modules/admin/pages/CamerasPage";
import Main from "./modules/main/Main";
import NavBar from "./modules/admin/NavBar";
import NewsPage from "./modules/admin/pages/NewsPage";
import SignIn from "./modules/admin/auth/SignIn";
import VideoPage from "./modules/admin/pages/VideoPage";
import WeatherPage from "./modules/admin/pages/WeatherPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<SignIn />} />
        <Route path="/admin" element={<NavBar />}>
          <Route path="weather" element={<WeatherPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="cameras" element={<CamerasPage />} />
          <Route path="video" element={<VideoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
