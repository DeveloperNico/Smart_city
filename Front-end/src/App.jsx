import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PageIntro } from "./Pages/PageIntro";
import { Login } from "./Pages/Login";

function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<PageIntro/>} />

                <Route path="/login" element={<Login/>} />

            </Routes>
        </Router>
    );
}

export default App;