import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PageIntro } from "./Pages/PageIntro";
import { Login } from "./Pages/Login";
import { SingUp }  from "./Pages/SingUp";
import { PageApp } from "./Pages/PageApp";

function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<PageIntro/>} />

                <Route path="/login" element={<Login/>} />

                <Route path="/singUp" element={<SingUp />} />

                <Route path="/pageApp" element={<PageApp/>} />

            </Routes>
        </Router>
    );
}

export default App;