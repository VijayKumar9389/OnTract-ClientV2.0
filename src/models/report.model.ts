// Stakeholder Stats for Project
export interface StakeholderStatsDTO {
    totalCount: number;
    oneTractCount: number;
    moreThanOneTractCount: number;
    attemptedContactCount: number;
    notAttemptedContactCount: number;
    consultedCount: number;
    notConsultedCount: number;
    deliveryPlannedCount: number;
    deliveryNotPlannedCount: number;
    missingPhoneNumbers: number;
    contactedYesCount: number;
    contactedNoCount: number;
}

export interface Location {
    province: string;
    count: number;
    cities: City[];
}

interface City {
    name: string;
    count: number;
}

export interface LocationData {
    locations: Location[];
}