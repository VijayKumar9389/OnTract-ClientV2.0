// helpers.ts

// Checks if a field is blank or not
export const isAvailable = (value: string): boolean => (value !== "");

export const isContacted = (contacted: string): boolean => contacted === "YES";

// Get the number of attempts
export const getAttemptNo = (attempts: string): number => {
    const cleanedAttempts = attempts.trim();

    if (cleanedAttempts !== "") {
        const splitAttempts = cleanedAttempts.split(",");
        return splitAttempts.length;
    } else {
        return 0;
    }
};

// Checks if a field is null or not and returns a boolean
export const isNotNull = (value: number | null): boolean => value !== null;

// Get the location from the street address
export const getLocation = (streetAddress: string): string => {
    const location = streetAddress.split(",");

    if (location.length >= 3) {
        return `${location[location.length - 3].trim()}, ${location[location.length - 2].trim()}`;
    }

    return "MISSING LOCATION";
};

// Get the safety status of the stakeholder
export const getStatus = (stakeholderStatus: string): string => {
    if (stakeholderStatus === "GREEN") {
        return "green";
    } else if (stakeholderStatus === "YELLOW") {
        return "yellow";
    }
    return "red";
};

// Compare the stakeholder id from the URL with the stakeholder id from the state
export const isStakeholderProfile = (stakeholderId: string | number, idFromParams: string | undefined): boolean => {
    return stakeholderId !== Number(idFromParams);
};

export const isMailout = (method: string) => method === 'mail';