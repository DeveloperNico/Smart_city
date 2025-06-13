import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PageIntro } from "./Pages/PageIntro";

function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<PageIntro/>} />

            </Routes>
        </Router>
    );
}

export default App;