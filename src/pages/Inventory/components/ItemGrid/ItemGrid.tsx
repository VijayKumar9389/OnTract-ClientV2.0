import { Item } from "../../../../models/item.models.ts";
import { NavigationUtils } from "../../../../utils/navigation.utils.ts";
import React from "react";
import ImageWithAlt from "../../../../components/ImageWithAlt/ImageWithAlt.tsx";

const ItemGrid: React.FC<{ items: Item[] }> = ({ items }) => {
    const { navigateToInventoryItem } = NavigationUtils();

    return (
        <div className="grid">
            {items.length > 0 ? (
                <ul className="grid-list">
                    {items.map((item: Item, index: number) => (
                        <li className="grid-item" key={index} onClick={() => navigateToInventoryItem(item.id)}>
                            <div className="grid-card">
                                <div className="card-image">
                                    <ImageWithAlt imageName={item.image}/>
                                </div>
                                <div className="card-content">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <label>Stored: <strong>{item.quantity}</strong></label>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="no-data-message">
                    <span>No Items Created.</span>
                </div>
            )}
        </div>
    );
}

export default ItemGrid;
