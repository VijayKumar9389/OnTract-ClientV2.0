import {Package} from "./package.models.ts";

// Delivery model
export interface Delivery {
    id: number;
    date: string;
    status: string;
    route: string;
    destination: string;
    delivery_method: string; // Use camelCase for consistency with JavaScript naming conventions
    notes: string;
    packages: Package[];
}

// Create new delivery
export interface NewDeliveryInput {
    projectId: number;
    route: string;
    destination: string;
    delivery_method: string;
    notes: string;
    stakeholderId: number;
    packageTypeId: number;
}

// Delivery statistics for a selected project
export interface DeliveryReport {
    count: number;
    stakeholderCount: number;
    packageTypeCountMap: {
        [key: string]: number;
    };
    deliveryRouteCountMap: {
        [key: string]: number;
    };
    pendingDeliveryCount: number;
    completedDeliveryCount: number;
}




