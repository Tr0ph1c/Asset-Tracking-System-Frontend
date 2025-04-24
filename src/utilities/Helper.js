// Validation
export const validateEmail = (email) => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
    return '';
};
export const validateRequiredField = (name, value) => {
    if (!value) return `${name} is required`;
    return '';
};

// Endpoints

export const SERVER_URL                = "http://localhost:8080/"
export const assetEndPoint             = `${SERVER_URL}api/asset`
export const staffEndPoint             = `${SERVER_URL}api/staff`
export const assignAssetEndPoint       = `${SERVER_URL}api/assign-asset`
export const leaveAssetEndPoint        = `${SERVER_URL}api/leave-asset`
export const maintainAssetEndPoint     = `${SERVER_URL}api/maintain-asset`
