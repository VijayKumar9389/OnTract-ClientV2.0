import React from "react";

// Helper component for status items
export const StatusItem: React.FC<{
    icon: React.ReactNode,
    label: string,
    isAvailable: boolean,
    availableText?: string,
    unavailableText?: string
}> = ({
          icon,
          label,
          isAvailable,
          availableText = "Yes",
          unavailableText = "No"
      }) => (
    <li>
        <span>{icon}</span>
        <div>
            <p>{label}:</p>
            <a className={`chip ${isAvailable ? 'green' : 'red'}`}>{isAvailable ? availableText : unavailableText}</a>
        </div>
    </li>
);

