import React from 'react';
import PageHeading from '../../components/PageHeading/PageHeading.tsx';
import DeliveryInput from './components/DeliveryInput/DeliveryInput';
import DeliveryStats from "./components/DeliveryStats/DeliveryStats";
import {useGetDeliveriesByProjectID} from "../../hooks/delivery.hooks.ts";
import NoDataMessage from "../../components/NoDataMessage/NoDataMessage.tsx";
import DeliveryList from "./components/DeliveryList/DeliveryList.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Delivery} from "../../models/delivery.models.ts";
import ActiveDeliveryFilters from "./components/ActiveDeliveryFilters/ActiveDeliveryFilters.tsx";
import LastViewedDelivery from "./components/LastViewedDelivery/LastViewedDelivery.tsx";

const Deliveries: React.FC = () => {
    const {deliveries, loading, error} = useGetDeliveriesByProjectID();
    const searchText: string = useSelector((state: RootState) => state.delivery.searchText);
    const searchType: number = useSelector((state: RootState) => state.delivery.searchType);
    const completedFilter: number = useSelector((state: RootState) => state.delivery.completed);
    const deliveryMethodFilter: number = useSelector((state: RootState) => state.delivery.deliveryMethod);
    const routeFilter: string = useSelector((state: RootState) => state.delivery.route);

    const filteredDeliveries: Delivery[] = deliveries.filter(delivery => {
        if (searchType === 0) {
            return delivery.destination.toLowerCase().includes(searchText.toLowerCase());
        } else if (searchType === 1) {
            return delivery.packages.some(pkg =>
                pkg.stakeholder.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }
        return true;
    });

    const completedDeliveries: Delivery[] = filteredDeliveries.filter(delivery => {
            if (completedFilter === 1) {
                return delivery.completed;
            } else if (completedFilter === 2) {
                return !delivery.completed;
            }
            return true;
        }
    );

    const deliveryMethodDeliveries: Delivery[] = completedDeliveries.filter(delivery => {
        if (deliveryMethodFilter === 1) {
            return delivery.delivery_method === "person";
        } else if (deliveryMethodFilter === 2) {
            return delivery.delivery_method === "mail";
        }
        return true;
    });

    const routeDeliveries: Delivery[] = deliveryMethodDeliveries.filter(delivery => {
        if (routeFilter !== "") {
            return delivery.route === routeFilter;
        }
        return true;
    });

    return (
        <div className="section">
            <PageHeading heading="Deliveries"/>
            <div className="page-content">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && (
                    deliveries.length > 0 ? (
                        <>
                            <LastViewedDelivery />
                            <DeliveryStats/>
                            <DeliveryInput/>
                            <ActiveDeliveryFilters count={routeDeliveries.length}/>
                            <DeliveryList deliveries={routeDeliveries}/>
                        </>
                    ) : (
                        <NoDataMessage message={"No Deliveries Created"}/>
                    )
                )}
            </div>

        </div>
    );
};

export default Deliveries;
