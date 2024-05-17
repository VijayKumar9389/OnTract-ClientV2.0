export interface Project {
    id: number;
    name: string;
    year: number;
    notes: string;
    surveyLink: string;
    stakeholders: Stakeholder[];
}

export interface Stakeholder {
    id: number;
    name: string;
    streetAddress: string;
    mailingAddress: string;
    phoneNumber: string;
    isPerson: string;
    stakeholderComments: string;
    stakeholderStatus: string;
    contacted: string;
    consultation: string;
    attempts: string;
    email: string;
    followUp: string;
    projectId: number;
    packageId: number;
    tractRecords: TractRecord[];
}

export interface TractRecord {
    id: number;
    tract: number;
    pin: string;
    structure: string;
    interest: string;
    occupants: number;
    worksLand: string;
    tractComments: string;
    pipelineStatus: string;
    commodity: string;
    pageNumber: number;
    keepdelete: string;
}

// Update Stakeholder Details
export interface UpdateStakeholderInput {
    name: string;
    streetAddress: string;
    mailingAddress: string;
    phoneNumber: string;
    isPerson: string;  // Updated to boolean
    stakeholderComments: string;
    stakeholderStatus: string;
    contacted: string;  // Updated to boolean
    consultation: string;
    attempts: string;
    email: string;
    followUp: string;
}

// Update Tract Record
export interface UpdateTrackRecordInput {
    structure: string;
    interest: string;
    occupants: number;
    worksLand: string;
    tractComments: string;
}

// Stakeholder with Tract Records for a
export interface RelatedStakeholder {
    stakeholder: Stakeholder; // Assuming StakeholderWithTractRecords is your existing interface or type
    isPhoneSame: boolean;
    isMailingAddressSame: boolean;
    isStreetAddressSame: boolean;
}

