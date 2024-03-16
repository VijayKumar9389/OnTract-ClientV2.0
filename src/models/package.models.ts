import {Stakeholder} from "./stakeholder.models.ts";
import {PackageItem} from "./item.models.ts";
import {Delivery} from "./delivery.models.ts";

// Package model
export interface Package {
    id: number;
    packageType: PackageType;
    stakeholder: Stakeholder;
    deliveryId: number;
    delivery: Delivery;
}

// Create new package
export interface NewPackageInput {
    stakeholderId: string;
    packageTypeId: string;
    deliveryId: string;
}

export interface NewPackageTypeInput {
    name: string;
    notes: string;
}

// Package type model
export interface PackageType {
    id: number;
    notes: string;
    name: string;
    items: PackageItem[];
}
