// utils/filterHelpers.ts
import { Stakeholder } from "../models/stakeholder.models";
import { isAvailable, isContacted } from "./functions.utils.ts";

export const isStakeholderContacted = (stakeholder: Stakeholder, contactFilter: number): boolean => {
    if (contactFilter === 0) return true;
    const contacted = isContacted(stakeholder.contacted);
    return contactFilter === 1 ? contacted : !contacted;
};

export const isStakeholderDeliveryPlanned = (stakeholder: Stakeholder, deliveryFilter: number): boolean => {
    if (deliveryFilter === 0) return true;
    const deliveryPlanned = stakeholder.packageId !== null;
    return deliveryFilter === 1 ? deliveryPlanned : !deliveryPlanned;
};

export const isStakeholderConsulted = (stakeholder: Stakeholder, consultedFilter: number): boolean => {
    if (consultedFilter === 0) return true;
    const consulted = isAvailable(stakeholder.consultation);
    return consultedFilter === 1 ? consulted : !consulted;
};

export const isStakeholderAttempted = (stakeholder: Stakeholder, attemptedFilter: number): boolean => {
    if (attemptedFilter === 0) return true;
    const attempted = isAvailable(stakeholder.attempts);
    return attemptedFilter === 1 ? attempted : !attempted;
};

export const isStakeholderMissing = (stakeholder: Stakeholder, missingFilter: number): boolean => {
    switch (missingFilter) {
        case 0:
            return true;
        case 1:
            return !isAvailable(stakeholder.phoneNumber);
        case 2:
            return !isAvailable(stakeholder.mailingAddress);
        case 3:
            return !isAvailable(stakeholder.streetAddress);
        default:
            return true;
    }
}

export const filterStakeholders = (
    stakeholders: Stakeholder[],
    searchText: string,
    searchType: number,
    contactFilter: number,
    consultedFilter: number,
    attemptedFilter: number,
    deliveryFilter: number,
    missingFilter: number
) => {
    const filteredBySearch: Stakeholder[] = searchText
        ? stakeholders.filter(stakeholder => {
            if (searchType === 1) {
                const sanitizedSearchText: string = searchText.replace(/\D/g, '');
                const sanitizedPhoneNumber: string = stakeholder.phoneNumber.replace(/\D/g, '');
                return sanitizedPhoneNumber.includes(sanitizedSearchText);
            } else if (searchType === 0) {
                return stakeholder.name.toLowerCase().includes(searchText.toLowerCase());
            } else if (searchType === 3) {
                const sanitizedSearchText: string = searchText.toLowerCase().trim();
                const mailingAddress: string = stakeholder.mailingAddress.toLowerCase();
                const streetAddress: string = stakeholder.streetAddress.toLowerCase();
                return mailingAddress.includes(sanitizedSearchText) || streetAddress.includes(sanitizedSearchText);
            } else if (searchType === 2) {
                const sanitizedSearchText: string = searchText.trim().toLowerCase();
                const searchTextAsNumber: number = parseInt(sanitizedSearchText, 10); // Convert searchText to number
                return stakeholder.tractRecords.some(tract =>
                    tract.tract === searchTextAsNumber // Convert tract to number for comparison
                );
            }
            return false;
        })
        : stakeholders;

    return filteredBySearch
        .filter(stakeholder => isStakeholderContacted(stakeholder, contactFilter))
        .filter(stakeholder => isStakeholderConsulted(stakeholder, consultedFilter))
        .filter(stakeholder => isStakeholderAttempted(stakeholder, attemptedFilter))
        .filter(stakeholder => isStakeholderDeliveryPlanned(stakeholder, deliveryFilter))
        .filter(stakeholder => isStakeholderMissing(stakeholder, missingFilter));
};
