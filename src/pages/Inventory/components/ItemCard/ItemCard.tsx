import './ItemCard.scss';
import {useNavigate} from "react-router-dom";
import {Item} from "../../../../models/item.models.ts";

const ItemCard: React.FC<{item: Item}> = ({item}) => {

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
                <label className="panel-label">{item.name}</label>
                <p className="item-description">{item.description}</p>
                <p className="item-quantity">Quantity: <strong>{item.quantity}</strong></p>
            </div>
        </div>
    );
}

export default ItemCard;