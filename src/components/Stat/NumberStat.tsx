// Helper component for displaying numbers
import React from "react";

export const NumberItem: React.FC<{
    icon: React.ReactNode,
    label: string,
    number: number
}> = ({
          icon,
          label,
          number
      }) => (
    <li>
        <span>{icon}</span>
        <div>
            <p>{label}:</p>
            <a className="number">{number}</a>
        </div>
    </li>
);