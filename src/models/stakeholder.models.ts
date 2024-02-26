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

export interface UpdateTrackRecordInput {
    structure: string;
    interest: string;
    occupants: number;
    worksLand: string;
    tractComments: string;
}

