export const password = value =>
    value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
        ? 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
        : undefined

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined

export const text = value =>
    value && !/^[A-Za-z]{2,64}$/i.test(value)
        ? 'Please enter correct information'
        : undefined

