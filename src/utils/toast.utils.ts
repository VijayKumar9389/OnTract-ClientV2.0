import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom success toast component
export const showToastSuccess = (message: string) => {
    toast.success(message);
};

// Custom error toast component
export const showToastError = (message: string) => {
    toast.error(message);
};
