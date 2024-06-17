import {Package} from "./package.models.ts";

// Delivery model
export interface Delivery {
    id: number;
    date: string;
    completed: boolean;
    route: string;
    destination: string;
    delivery_method: string;
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

// Edit delivery details
export interface UpdateDeliveryInput {
    route: string;
    destination: string;
    delivery_method: string;
    notes: string;
}

// Delivery statistics for a selected project
export interface DeliveryReportDTO {
    count: number;
    noRouteCount: number;
    stakeholderCount: number;
    packageTypeCountMap: {
        [key: string]: number;
    };
    deliveryRouteCountMap: {
        [key: string]: number;
    };
    pendingDeliveryCount: number;
    completedDeliveryCount: number;
    mailCount: number;
    streetCount: number;
    deliveryCount: number;
}

