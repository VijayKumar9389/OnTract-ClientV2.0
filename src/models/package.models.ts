import {Stakeholder} from "./stakeholder.models.ts";
import {PackageItem} from "./item.models.ts";

// Package model
export interface Package {
    id: number;
    packageType: PackageType;
    stakeholder: Stakeholder;
}

// Create new package
export interface NewPackageInput {
    stakeholderId: string;
    packageTypeId: string;
    deliveryId: string;
}

// Package type model
export interface PackageType {
    id: number;
    notes: string;
    name: string;
    items: PackageItem[];
}
