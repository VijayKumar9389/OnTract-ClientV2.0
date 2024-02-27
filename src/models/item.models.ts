import {PackageType} from "./package.models.ts";

// Item model
export interface Item {
    id: number;
    name: string;
    description: string;
    image: string;
    quantity: number;
}

// Package item model
export interface PackageItem {
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
    projectId: number;
    quantity: number;
}

// Change Item information
export interface UpdateItemInput {
    id: number;
    name: string;
    description: string;
    image: string;
    quantity: number;
    file?: File | null; // Make the file property optional
}