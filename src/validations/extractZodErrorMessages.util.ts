import { ZodError, ZodIssue } from 'zod';

// Function to format a single Zod issue
const formatZodIssue = (issue: ZodIssue): string => {
    const { path, message } = issue;
    const pathString = path.join('.'); // Join array path into a string (e.g., "user.name")
    return pathString ? `${pathString}: ${message}` : message; // Include path if available
};

// Function to extract and format all error messages from a ZodError
export const extractZodErrorMessages = (error: ZodError): string[] => {
    return error.issues.map(formatZodIssue);
};
