import './ItemCard.scss';
import {useNavigate} from "react-router-dom";
import {Item} from "../../../../models/item.models.ts";

const ItemCard: React.FC<{ item: Item }> = ({item}) => {

    const navigate = useNavigate();

    const selectItem = (id: number): void => {
        navigate(`/inventory/${id}`);
    }

    return (
        <div className="item-card" onClick={() => selectItem(item.id)}>
            <div className="item-image">
                <img
                    src={`http://localhost:3005/images/${item.image}`}
                    alt={`Image for ${item.name}`}
                    className="item-image"
                />
            </div>
            <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-description">{item.description}</p>
            </div>
            <p className="item-quantity">Quantity: <strong>{item.quantity}</strong></p>
        </div>
    );
}

export default ItemCard;