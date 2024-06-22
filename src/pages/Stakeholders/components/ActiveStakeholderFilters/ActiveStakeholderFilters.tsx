import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import './ActiveStakeholderFilters.scss';

interface Filter {
    value: number;
    tags: string[];
    colors: string[];
}

const ActiveStakeholderFilters: React.FC<{ count: number }> = ({ count }) => {
    const { contacted, attempted, consulted, delivery, missing, searchType, searchText } = useSelector((state: RootState) => state.stakeholder);

    const searchTypeFilter: Filter = {
        value: searchType,
        tags: ['Searching by Stakeholder Name', 'Searching by Phone No.', 'Searching by Street Address', 'Searching by Mailing Address'],
        colors: ['number', 'number', 'number', 'number'],
    };

    const filters: Filter[] = [
        {
            value: contacted,
            tags: ['All', 'Searching Contacted', 'Searching No Contact'],
            colors: ['All', 'green', 'red'],
        },
        {
            value: attempted,
            tags: ['All', 'Searching Attempted', 'Searching No Attempts'],
            colors: ['All', 'green', 'red'],
        },
        {
            value: consulted,
            tags: ['All', 'Searching Consulted', 'Searching No Consultation'],
            colors: ['All', 'green', 'red'],
        },
        {
            value: delivery,
            tags: ['All', 'Searching Delivery Planned', 'Searching No Delivery Planned'],
            colors: ['All', 'green', 'red'],
        },
        {
            value: missing,
            tags: ['No Filter', 'Searching No Phone', 'Searching No Street Address', 'Searching No Mailing Address'],
            colors: ['All', 'red', 'red', 'red'],
        },
    ];

    const allFiltersDefault: boolean = filters.every(filter => filter.value === 0);

    const renderFilter = (filter: Filter, index: number) =>
        filter.value !== 0 && (
            <div key={index} className="filter-item">
                <span className={`chip ${filter.colors[filter.value]}`}>{filter.tags[filter.value]}</span>
            </div>
        );

    return (
        <div className="active-filters">
            <div className="filter-heading">
                <p>{searchTypeFilter.tags[searchType]}: <strong>{searchText}</strong></p>
                <p>Results: <strong>{count}</strong></p>
            </div>
            {allFiltersDefault ? (
                <div className="no-filters-message">No active filters applied</div>
            ) : (
                filters.map(renderFilter)
            )}
        </div>
    );
};

export default ActiveStakeholderFilters;
