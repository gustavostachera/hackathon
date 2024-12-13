// src/components/AirportsList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const AirportsList = () => {
    const [airports, setAirports] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:5000/airports")
            .then((response) => {
                setAirports(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the airports!", error);
            });
    }, []);

    return (
        <div>
            <h1>Airports List</h1>
            <ul>
                {airports.map((airport) => (
                    <li key={airport.AirportID}>
                        {airport.AirportID} - {airport.AirportName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AirportsList;
