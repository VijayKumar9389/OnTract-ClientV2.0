import {PackageType} from "./package.models.ts";

// Item model
export interface Item {
    id: number;
    name: string;
    description: string;
    image: string;
    quantity: number;
}

// PackageTypeGrid item model
export interface PackageItem {
    quantity: number;
    id: number;
    item: Item;
    packageType: PackageType;
    notes: string;
}

// Create new item
export interface NewItemInput {
    name: string;
    description: string;
    image: File | null; // Multer file object
    projectId: number | null;
    quantity: number;
}

export interface UpdateItemInput {
    id: number;
    name: string;
    description: string;
    quantity: number;
    image?: File | null; // Make the file property optional
}

export interface NewPackageItem {
    itemID: number;
    packageTypeID: number;
    notes: string;
}