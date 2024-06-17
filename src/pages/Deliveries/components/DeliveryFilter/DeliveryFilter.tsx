import './DeliveryFilter.scss';
import {setCompleted, setDeliveryMethod, setRoute} from "../../../../store/reducers/delivery.reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import RadioButton from "../../../../components/RadioButton/RadioButton.tsx";
import {ChangeEvent} from "react";
import {setDeliverySearchType} from "../../../../store/reducers/delivery.reducer.ts";
import {getDeliveryRoutes} from "../../../../services/delivery.services.ts";
import {useEffect, useState} from "react";
import {getProjectFromCookie} from "../../../../utils/cookie.utils.ts";

const DeliveryFilter = () => {
    const dispatch = useDispatch();
    const completed: number = useSelector((state: RootState) => state.delivery.completed);
    const deliveryMethod: number = useSelector((state: RootState) => state.delivery.deliveryMethod);
    const searchType: number = useSelector((state: RootState) => state.delivery.searchType);
    const routeFilter: string = useSelector((state: RootState) => state.delivery.route);


    const [routes, setRoutes] = useState<string[]>([]);
    const project = getProjectFromCookie();

    useEffect(() => {
        if (!project) {
            return;
        }
        getDeliveryRoutes(project.id).then((data) => {
            setRoutes(data);
        });
    }, []);

    const handleSetCompleted = (value: number): void => {
        dispatch(setCompleted(value));
    }

    const handleSetType = (value: number): void => {
        dispatch(setDeliveryMethod(value));
    }

    const handleSetRouteFilter = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(setRoute(event.target.value));
    }
    const handleSetSearchType = (event: ChangeEvent<HTMLSelectElement>): void => {
        const value: number = parseInt(event.target.value, 10);
        dispatch(setDeliverySearchType(value));
    }

    return (
        <div className="filter-container">
            <div className="input-wrapper">
                <label htmlFor="search">Search By:</label>
                <select id="search" name="delivery-status" onChange={handleSetSearchType} value={searchType}>
                    <option value={0}>Destination</option>
                    <option value={1}>Stakeholder Name</option>
                </select>
            </div>
            <div className="input-wrapper">
                <label htmlFor="route">Select Route:</label>
                <select id="route" name="route" onChange={handleSetRouteFilter} value={routeFilter}>
                    <option value={""}>All</option>
                    {routes.map((route, index) => (
                        <option key={index} value={route}>{route}</option>
                    ))}
                </select>
            </div>
            <div className="filter-options">
                <div className="filter-wrapper">
                    <h3>Status</h3>
                    <div className="radio-group">
                        <RadioButton
                            id="completed-all"
                            name="completed"
                            value={0}
                            checked={completed === 0}
                            onChange={handleSetCompleted}
                            labelText="All"
                        />
                        <RadioButton
                            id="completed-yes"
                            name="completed"
                            value={1}
                            checked={completed === 1}
                            onChange={handleSetCompleted}
                            labelText="Completed"
                        />
                        <RadioButton
                            id="completed-no"
                            name="completed"
                            value={2}
                            checked={completed === 2}
                            onChange={handleSetCompleted}
                            labelText="Pending"
                        />
                    </div>
                </div>

                <div className="filter-wrapper">
                    <h3>Type</h3>
                    <div className="radio-group">
                        <RadioButton
                            id="type-all"
                            name="type"
                            value={0}
                            checked={deliveryMethod === 0}
                            onChange={handleSetType}
                            labelText="All"
                        />
                        <RadioButton
                            id="type-1"
                            name="type"
                            value={1}
                            checked={deliveryMethod === 1}
                            onChange={handleSetType}
                            labelText="In-Person"
                        />
                        <RadioButton
                            id="type-2"
                            name="type"
                            value={2}
                            checked={deliveryMethod === 2}
                            onChange={handleSetType}
                            labelText="Mail-Out"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DeliveryFilter;