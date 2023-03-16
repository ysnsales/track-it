import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HabitsPage from "./pages/HabitsPage/HabitsPage";
import TodayPage from "./pages/TodayPage/TodayPage";
import HistoricPage from "./pages/HistoricPage/HistoricPage";

import { createContext } from 'react';


export default function App() {
    //const [user, setUser] = useState({})
    return (
        <>            <BrowserRouter>
            {/*<Topo/>*/}
            {/*<Menu/>*/}

            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
                <Route path="/habitos" element={<HabitsPage />} />
                <Route path="/hoje" element={<TodayPage />} />
                <Route path="/historico" element={<HistoricPage />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}
