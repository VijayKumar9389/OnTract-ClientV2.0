import './ItemPage.scss';
import {useParams} from "react-router-dom";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";

const ItemPage = () => {
    const {id} = useParams();

    return (
        <div className="item-page-container">
            <PageHeading heading="Item"/>
            <p>{id}</p>
        </div>
    );
}

export default ItemPage;