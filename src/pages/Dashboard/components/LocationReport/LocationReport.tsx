// components/LocationReport.tsx
import React from 'react';
import './LocationReport.scss';
import { useLocationReport} from "../../../../hooks/project.hooks.ts";
import {City, Location} from "../../../../models/report.model.ts";

const LocationReport: React.FC = () => {
    const { locations, loading, error } = useLocationReport();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (locations.length === 0) return <p>No locations available</p>;

    return (
        <div className="location-report">
            {locations.map((location: Location, index: number) => (
                <div key={index} className="location-item">
                    <div className="location-header">
                        <h3>{location.province}</h3>
                        <p>Total Count: <strong>{location.count}</strong></p>
                    </div>
                    {location.cities.length > 0 ? (
                        <ul className="city-list">
                            {location.cities.map((city: City, cityIndex: number) => (
                                <li key={cityIndex} className="city-item">
                                    <span>{city.name}</span>
                                    <strong><span>{city.count}</span></strong>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-cities">No cities listed</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default LocationReport;
