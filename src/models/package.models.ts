import {Stakeholder} from "./stakeholder.models.ts";
import {PackageItem} from "./item.models.ts";
import {Delivery} from "./delivery.models.ts";

// PackageTypeGrid model
export interface Package {
    id: number;
    packageType: PackageType;
    stakeholder: Stakeholder;
    deliveryId: number;
    delivery: Delivery;

}

// Create new package
export interface NewPackageInput {
    stakeholderId: number;
    packageTypeId: number;
    deliveryId: number;
}

export interface NewPackageTypeInput {
    name: string;
    notes: string;
}

// PackageTypeGrid type model
export interface PackageType {
    id: number;
    notes: string;
    name: string;
    items: PackageItem[];
}
