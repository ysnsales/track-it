import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HabitsPage from "./pages/HabitsPage/HabitsPage";


export default function App() {
  return (
          <BrowserRouter>
              {/*<Topo/>*/}
              {/*<Menu/>*/}
  
              <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/registro" element={<RegisterPage />} /> 
                  {/*<Route path="/" element={<HabitsPage />} />
                  {/*<Route path="/hoje" element={<TodayPage />} />}
  {<Route path="/historico" element={<HistoryPage />} />*/}
              </Routes>
          </BrowserRouter>
      )
  }
