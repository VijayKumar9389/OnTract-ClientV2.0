import React, {useEffect, useState} from 'react';
import {getLocationReport} from '../../../../services/stakeholder.services.ts';
import {getProjectFromCookie} from '../../../../utils/cookieHelper.ts';
import './LocationReport.scss';
import {Location, LocationData} from "../../../../models/report.model.ts";

const LocationReport: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const project = getProjectFromCookie();

    useEffect(() => {
        if (project) {
            fetchLocations();
        }
    }, []);

    const fetchLocations = async () => {
        if (!project) {
            return;
        }
        try {
            const fetchedLocations: LocationData[] = await getLocationReport(project.id);
            const extractedLocations: Location[] = fetchedLocations.map(item => item.locations[0]);
            setLocations(extractedLocations);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    return (

        <div className="panel">
            <div className="panel-header">
                <label className="panel-label">Location Report</label>
            </div>
            <div className="panel-content">
                <div className="location-report">
                    {locations.map((location: Location, index: number) => (
                        <div key={index} className="location-item">
                            <div className="card-header">
                                <h3>{location.province}</h3>
                                <p>Total Count: <strong>{location.count}</strong></p>
                            </div>
                            {location.cities.length > 0 ? (
                                <ul className="city-list">
                                    {location.cities.map((city, cityIndex) => (
                                        <li key={cityIndex}>
                                            <span className="city-name">{city.name}</span>
                                            <strong><span className="city-count">{city.count}</span></strong>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No cities listed</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default LocationReport;
