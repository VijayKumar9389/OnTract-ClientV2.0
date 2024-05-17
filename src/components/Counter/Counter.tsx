import React, { useState } from 'react';
import './Counter.scss';

interface CounterProps {
    initialValue: number;
    onUpdateCount: (newValue: number) => void;
}

const Counter: React.FC<CounterProps> = ({ initialValue, onUpdateCount }) => {
    const [count, setCount] = useState(initialValue);

    const increment = (): void => {
        const newCount: number = count + 1;
        setCount(newCount);
        onUpdateCount(newCount);
    };

    const decrement = (): void => {
        if (count > 0) {
            const newCount: number = count - 1;
            setCount(newCount);
            onUpdateCount(newCount);
        }
    };

    return (
        <div className="counter">
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment}>+</button>
        </div>
    );
};

export default Counter;
