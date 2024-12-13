// src/components/PredictDelayForm.js
import React, { useState } from "react";
import axios from "axios";

const PredictDelayForm = () => {
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [origin, setOrigin] = useState("");
    const [dest, setDest] = useState("");
    const [result, setResult] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("http://127.0.0.1:5000/predict_delay", {
                day_of_week: parseInt(dayOfWeek),
                origin: parseInt(origin),
                dest: parseInt(dest),
            })
            .then((response) => {
                setResult(response.data.probability_of_delay);
            })
            .catch((error) => {
                console.error("There was an error predicting the delay!", error);
            });
    };

    return (
        <div>
            <h1>Predict Delay</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Day of Week:</label>
                    <input type="number" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} required />
                </div>
                <div>
                    <label>Origin:</label>
                    <input type="number" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
                </div>
                <div>
                    <label>Destination:</label>
                    <input type="number" value={dest} onChange={(e) => setDest(e.target.value)} required />
                </div>
                <button type="submit">Predict</button>
            </form>
            {result !== null && (
                <div>
                    <h2>Probability of Delay: {result}</h2>
                </div>
            )}
        </div>
    );
};

export default PredictDelayForm;
