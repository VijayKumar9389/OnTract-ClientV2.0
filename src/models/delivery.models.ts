import {Package} from "./package.models.ts";

// Delivery model
export interface Delivery {
    id: number;
    date: string;
    completed: boolean;
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
export interface DeliveryReportDTO {
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

// Edit delivery details
export interface EditDeliveryDTO {
    route: string;
    destination: string;
    delivery_method: string;
    notes: string;
}