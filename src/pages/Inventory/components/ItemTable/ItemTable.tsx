import {Item} from "../../../../models/item.models.ts";
import {Navigation} from "../../../../utils/navigation.ts";
import React from "react";

const ItemTable: React.FC<{ items: Item[] }> = ({items}) => {
    const {navigateToInventoryItem} = Navigation();
    return (
        <div className="panel">
            <div className="panel-content">
                {items.length > 0 ? (
                    <table className="select-table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Item</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item: Item) => (
                            <tr onClick={() => navigateToInventoryItem(item.id)}>
                                <td className="item-image">
                                    <img
                                        src={`http://localhost:3005/images/${item.image}`}
                                        alt={`Image for ${item.name}`}
                                        className="form-image"
                                    />
                                </td>
                                <td>
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                </td>
                                <td>
                                    <strong>{item.quantity}</strong>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-data-message">
                        <span>No Items Created.</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ItemTable;
