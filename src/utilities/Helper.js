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
export const loginEndPoint             = `${SERVER_URL}api/auth/login`
export const assetEndPoint             = `${SERVER_URL}api/tracker/asset`
export const staffEndPoint             = `${SERVER_URL}api/tracker/staff`
export const historyEndPoint           = `${SERVER_URL}api/tracker/history`
export const assignAssetEndPoint       = `${SERVER_URL}api/tracker/assign-asset`
export const leaveAssetEndPoint        = `${SERVER_URL}api/tracker/leave-asset`
export const maintainAssetEndPoint     = `${SERVER_URL}api/tracker/maintain-asset`
