// src/components/SubMenu/SubMenu.tsx
import React from 'react';
import './SubMenu.scss';

interface SubMenuProps {
    items: { label: string, value: string }[];
    selected: string;
    onSelect: (value: string) => void;
}

const SubMenu: React.FC<SubMenuProps> = ({ items, selected, onSelect }) => {
    return (
        <div className="submenu">
            {items.map(item => (
                <div
                    key={item.value}
                    className={`submenu-item ${selected === item.value ? 'selected' : ''}`}
                    onClick={() => onSelect(item.value)}
                >
                    {item.label}
                </div>
            ))}
        </div>
    );
};

export default SubMenu;
