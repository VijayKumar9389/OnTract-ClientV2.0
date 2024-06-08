import {Item} from "../../../../models/item.models.ts";
import {Navigation} from "../../../../utils/navigation.ts";
import React from "react";
import ImageWithAlt from "../../../../components/ImageWithAlt/ImageWithAlt.tsx";

const ItemTable: React.FC<{ items: Item[] }> = ({items}) => {
    const {navigateToInventoryItem} = Navigation();
    return (
        <div className="panel">
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
                    {items.map((item: Item, index: number) => (
                        <tr onClick={() => navigateToInventoryItem(item.id)} key={index}>
                            <td className="item-image">
                                <ImageWithAlt imageName={item.image}/>
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
    );
}

export default ItemTable;
