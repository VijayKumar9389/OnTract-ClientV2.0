// components/RelatedStakeholderRow.tsx
import React from 'react';
import { RelatedStakeholder } from '../../../../models/stakeholder.models.ts';
import { NavigationUtils } from '../../../../utils/navigation.utils.ts';

interface RelatedStakeholderRowProps {
    relatedStakeholder: RelatedStakeholder;
}

const RelatedStakeholderRow: React.FC<RelatedStakeholderRowProps> = ({ relatedStakeholder }) => {
    const { navigateToStakeholder } = NavigationUtils();

    return (
        <tr
            className="stakeholder-item"
            onClick={() => navigateToStakeholder(relatedStakeholder.stakeholder.id)}
        >
            <td>
                <span>{relatedStakeholder.stakeholder.name}</span>
            </td>
            <td>
                <span>
                    <a className={`chip ${relatedStakeholder.isPhoneSame ? 'green' : 'red'}`}>
                        {relatedStakeholder.isPhoneSame ? 'Match' : 'No Match'}
                    </a>
                </span>
            </td>
            <td>
                <span>
                    <a className={`chip ${relatedStakeholder.isMailingAddressSame ? 'green' : 'red'}`}>
                        {relatedStakeholder.isMailingAddressSame ? 'Match' : 'No Match'}
                    </a>
                </span>
            </td>
            <td>
                <span>
                    <a className={`chip ${relatedStakeholder.isStreetAddressSame ? 'green' : 'red'}`}>
                        {relatedStakeholder.isStreetAddressSame ? 'Match' : 'No Match'}
                    </a>
                </span>
            </td>
        </tr>
    );
};

export default RelatedStakeholderRow;
