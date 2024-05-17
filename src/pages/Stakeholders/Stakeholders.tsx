import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getStakeholdersByProjectId} from "../../services/stakeholder.services";
import {Project, Stakeholder} from "../../models/stakeholder.models";
import StakeholderCard from "./components/StakeholderCard/StakeholderCard";
import StakeholderInput from "./components/StakeholderInput/StakeholderInput";
import StakeholderStats from "./components/StakeholderStats/StakeholderStats";
import Heading from "../../components/Heading/Heading";
import {getProjectFromCookie} from "../../utils/cookieHelper";
import {RootState} from "../../store";
import {isAvailable, isContacted} from "../../utils/helpers.ts";

const Stakeholders = () => {
    // Declare state variables
    const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Get project from cookie
    const project: Project | null = getProjectFromCookie();

    // Get search text and contact filter from store
    const searchText: string = useSelector((state: RootState) => state.stakeholder.searchText);
    const searchType: number = useSelector((state: RootState) => state.stakeholder.searchType);
    const contactFilter: number = useSelector((state: RootState) => state.stakeholder.contacted);
    const consultedFilter: number = useSelector((state: RootState) => state.stakeholder.consulted);
    const attemptedFilter: number = useSelector((state: RootState) => state.stakeholder.attempted);
    const deliveryFilter: number = useSelector((state: RootState) => state.stakeholder.delivery);

    // Function to check if stakeholder is contacted based on filter
    const isStakeholderContacted = (stakeholder: Stakeholder): boolean => {
        if (contactFilter === 0) {
            return true; // All stakeholders
        }

        const contacted: boolean = isContacted(stakeholder.contacted);
        return contactFilter === 1 ? contacted : !contacted;
    }

    // Function to check if stakeholder has delivery planned based on filter
    const isStakeholderDeliveryPlanned = (stakeholder: Stakeholder): boolean => {
        if (deliveryFilter === 0) {
            return true;
        }

        const deliveryPlanned: boolean = stakeholder.packageId !== null;
        return deliveryFilter === 1 ? deliveryPlanned : !deliveryPlanned;
    }

    // Function to check if stakeholder is consulted based on filter
    const isStakeholderConsulted = (stakeholder: Stakeholder): boolean => {
        if (consultedFilter === 0) {
            return true; // All stakeholders
        }

        const consulted: boolean = isAvailable(stakeholder.consultation);
        return consultedFilter === 1 ? consulted : !consulted;
    }

    // Function to check if stakeholder is attempted based on filter
    const isStakeholderAttempted = (stakeholder: Stakeholder): boolean => {
        if (attemptedFilter === 0) {
            return true;
        }

        const attempted: boolean = isAvailable(stakeholder.attempts);
        return attemptedFilter === 1 ? attempted : !attempted;
    }

    const fetchStakeholders = async (): Promise<void> => {
        if (!project) {
            return;
        }
        try {
            setLoading(true);
            const fetchedStakeholders: Stakeholder[] = await getStakeholdersByProjectId(project.id);
            setStakeholders(fetchedStakeholders);
            setError(null); // Clear error state if successful
        } catch (error) {
            setError('Failed to fetch stakeholders');
        } finally {
            setLoading(false);
        }
    };

    useEffect((): void => {
        fetchStakeholders()
            .then(() => console.log('Stakeholders fetched'));
    }, []);

// Filter stakeholders based on search text and contact filter
    const filteredStakeholders: Stakeholder[] = searchText
        ? stakeholders.filter(stakeholder => {
            if (searchType === 1) {
                // Search by phone number
                const sanitizedSearchText: string = searchText.replace(/\D/g, ''); // Remove non-numeric characters from search text
                const sanitizedPhoneNumber: string = stakeholder.phoneNumber.replace(/\D/g, ''); // Remove non-numeric characters from phone number
                return sanitizedPhoneNumber.includes(sanitizedSearchText);
            } else if (searchType === 0) {
                // Search by name
                return stakeholder.name.toLowerCase().includes(searchText.toLowerCase());
            } else if (searchType === 3) {
                // Search both mailingAddress and streetAddress
                const sanitizedSearchText: string = searchText.toLowerCase().trim(); // Convert search text to lowercase and remove leading/trailing spaces
                const mailingAddress: string = stakeholder.mailingAddress.toLowerCase();
                const streetAddress: string = stakeholder.streetAddress.toLowerCase();
                return mailingAddress.includes(sanitizedSearchText) || streetAddress.includes(sanitizedSearchText);
            } else if (searchType === 2) {
                // Search for tract
                const sanitizedSearchText: string = searchText.trim(); // Remove leading/trailing spaces
                return stakeholder.tractRecords.some(tract => tract.tract.toString().toLowerCase().includes(sanitizedSearchText.toLowerCase()));
            } else {
                // Handle other search types if needed
                return false;
            }
        })
        : stakeholders; // If no search text, return all stakeholders

    const filteredAndContactedStakeholders: Stakeholder[] = filteredStakeholders.filter(isStakeholderContacted);
    const filteredContactedAndConsultedStakeholders: Stakeholder[] = filteredAndContactedStakeholders.filter(isStakeholderConsulted);
    const filterdContactedConsultedAndAttemptedStakeholders: Stakeholder[] = filteredContactedAndConsultedStakeholders.filter(isStakeholderAttempted);
    const filteredContactedConsultedAndAttemptedAndDeliveryStakeholders: Stakeholder[] = filterdContactedConsultedAndAttemptedStakeholders.filter(isStakeholderDeliveryPlanned);

    return (
        <div className="section">
            <Heading heading="Stakeholders"/>
            <div className="page-content">

                {/* Conditionally render loading message */}
                {loading && <p>Loading...</p>}

                {/* Conditionally render error message */}
                {error && <p className="error-message">{error}</p>}

                {/* Render stakeholders if no loading or error */}
                {!loading && !error && (
                    <>
                        <StakeholderStats/>
                        <div className="panel">
                            <div className="panel-header">
                                <h3>Stakeholders</h3>
                            </div>
                            <div className="panel-content">
                                <StakeholderInput/>
                                <ul className="card-list">
                                    {filteredContactedConsultedAndAttemptedAndDeliveryStakeholders.map(stakeholder => (
                                        <StakeholderCard key={stakeholder.id} stakeholder={stakeholder}/>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Stakeholders;
