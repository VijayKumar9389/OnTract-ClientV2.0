import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store';
import './ActiveStakeholderFilters.scss';

const ActiveStakeholderFilters: React.FC<{ count: number }> = ({count}) => {
    const contacted = useSelector((state: RootState) => state.stakeholder.contacted);
    const attempted = useSelector((state: RootState) => state.stakeholder.attempted);
    const consulted = useSelector((state: RootState) => state.stakeholder.consulted);
    const delivery = useSelector((state: RootState) => state.stakeholder.delivery);
    const missing = useSelector((state: RootState) => state.stakeholder.missing);
    const searchType = useSelector((state: RootState) => state.stakeholder.searchType);
    const searchText = useSelector((state: RootState) => state.stakeholder.searchText);

    const searchTypeFilter = {
        value: searchType,
        tags: ['Searching by Stakeholder Name', 'Searching by Phone No.', 'Searching by Street Address', 'Searching by Mailing Address'],
        colors: ['number', 'number', 'number', 'number']
    };

    const filters = [
        {
            value: contacted,
            tags: ['All', 'Searching Contacted', 'Searching No Contact'],
            colors: ['All', 'green', 'red']
        },
        {
            value: attempted,
            tags: ['All', 'Searching Attempted', 'Searching No Attempts'],
            colors: ['All', 'green', 'red']
        },
        {
            value: consulted,
            tags: ['All', 'Searching Consulted', 'Searching No Consultation'],
            colors: ['All', 'green', 'red']
        },
        {
            value: delivery,
            tags: ['All', 'Searching Delivery Planned', 'Searching No Delivery Planned'],
            colors: ['All', 'green', 'red']
        },
        {
            value: missing,
            tags: ['No Filter', 'Searching No Phone', 'Searching No Street Address', 'Searching No Mailing Address'],
            colors: ['All', 'red', 'red', 'red']
        },
    ];

    const allFiltersDefault = filters.every(filter => filter.value === 0);

    return (
        <div className="active-filters">
            <div className="filter-heading">
                <p>{searchTypeFilter.tags[searchType]}: <strong>{searchText}</strong></p>
                <p>Results: <strong>{count}</strong></p>
            </div>
            {allFiltersDefault ? (
                <div className="no-filters-message">No active filters applied</div>
            ) : (
                filters.map((filter, index) =>
                    filter.value !== 0 && (
                        <div key={index} className="filter-item">
                            <span className={`chip ${filter.colors[filter.value]}`}>{filter.tags[filter.value]}</span>
                        </div>
                    ))
            )}
        </div>
    );
}

export default ActiveStakeholderFilters;
