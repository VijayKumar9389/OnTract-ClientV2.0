import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store';
import './ActiveDeliveryFilters.scss';

const ActiveDeliveryFilters: React.FC<{ count: number }> = ({count}) => {
    const completed = useSelector((state: RootState) => state.delivery.completed);
    const deliveryMethod = useSelector((state: RootState) => state.delivery.deliveryMethod);
    const searchType = useSelector((state: RootState) => state.delivery.searchType);
    const searchText  = useSelector((state: RootState) => state.delivery.searchText);
    const routeFilter = useSelector((state: RootState) => state.delivery.route);

    const searchTypeFilter = {
        value: searchType,
        tags: ['Searching by Destination', 'Searching by Stakeholder Name'],
        colors: ['number', 'number']
    };

    const filters = [
        {
            value: completed,
            tags: ['All Deliveries', 'Completed Deliveries', 'Pending Deliveries'],
            colors: ['all', 'green', 'red']
        },
        {
            value: deliveryMethod,
            tags: ['All Methods', 'In-Person Deliveries', 'Mail-Out Deliveries'],
            colors: ['all', 'green', 'red']
        }
    ];

    const allFiltersDefault = filters.every(filter => filter.value === 0) && routeFilter === '';

    return (
        <div className="active-filters">
            <div className="filter-heading">
                <p>{searchTypeFilter.tags[searchTypeFilter.value]}: <strong>{searchText}</strong></p>
                <p>Results: <strong>{count}</strong></p>
            </div>
            {routeFilter !== '' && (
                <div className="filter-item">
                    <span className="chip green">Viewing Route: {routeFilter}</span>
                </div>
            )}
            {allFiltersDefault ? (
                <div className="no-filters-message">No active filters applied</div>
            ) : (
                filters.map((filter, index) =>
                    filter.value !== 0 && (
                        <div key={index} className="filter-item">
                            <span className={`chip ${filter.colors[filter.value]}`}>{filter.tags[filter.value]}</span>
                        </div>
                    )
                )
            )}
        </div>
    );
};

export default ActiveDeliveryFilters;
