export async function isConnected() {
    try {
        const response = await fetch('http://localhost:8761/', { method: 'HEAD' });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}