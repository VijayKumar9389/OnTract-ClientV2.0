import './ItemCard.scss';
import { Item } from "../../../../models/item.models.ts";
import {Navigation} from "../../../../utils/navigation.ts";

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
    const {navigateToInventoryItem} = Navigation();

    return (
        <div className="item-card" onClick={() => navigateToInventoryItem(item.id)}>
            <div className="item-image">
                <img
                    src={`http://localhost:3005/images/${item.image}`}
                    alt={`Image for ${item.name}`}
                    className="item-image"
                />
            </div>
            <div className="card-header">
                <h3>{item.name}</h3>
                <p className="desc">{item.description}</p>
            </div>
            <p className="item-quantity">Quantity: <strong>{item.quantity}</strong></p>
        </div>
    );
}

export default ItemCard;
