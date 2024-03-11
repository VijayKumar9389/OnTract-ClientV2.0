import './ItemStats.scss';
import React from "react";
import {Item} from "../../../../models/item.models.ts";
import {Package} from "../../../../models/package.models.ts";

const ItemStats: React.FC<{item: Item, packages: Package[] | null}> = ({item, packages}) => {

    if (!packages) return null;

    return (
        <div className="item-stats">

            <p className="info-list">
                Original Stock: <span className="info-item">{item.quantity}</span>
                <span className="separator">|</span>
                In Stock: <span className="info-item">{item.quantity - packages.length}</span>
                <span className="separator">|</span>
                Used: <span className="info-item">{packages.length}</span>
            </p>
        </div>
    );
}

export default ItemStats;