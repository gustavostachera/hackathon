// src/App.js
import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import AirportsList from "./components/AirportList";
import PredictDelayForm from "./components/PredictDelayForm";

function App() {
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/airports">Airports List</Link>
                        </li>
                        <li>
                            <Link to="/predict_delay">Predict Delay</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/airports" element={<AirportsList />} />
                    <Route path="/predict_delay" element={<PredictDelayForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
