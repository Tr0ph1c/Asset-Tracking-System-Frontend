export async function isConnected() {
    try {
        const response = await fetch('http://localhost:8080/api/tracker/asset', { method: 'GET' });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}