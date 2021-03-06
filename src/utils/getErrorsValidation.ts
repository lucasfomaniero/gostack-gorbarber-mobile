import { ValidationError } from 'yup';

interface Errors {
    [key: string]: string;
}

export default function getErrorsValidation(err: ValidationError): Errors {
    const errors: Errors = {};
    err.inner.forEach(error => {
        errors[error.path] = error.message;
    });

    return errors;
}
