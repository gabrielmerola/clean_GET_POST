

export async function validateToken() {
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (tokenExpiration) {
        const expirationDate = new Date(tokenExpiration);
        const currentDate = new Date();

        const threeDaysLater = new Date();
        threeDaysLater.setDate(currentDate.getDate() + 3);

        return expirationDate <= threeDaysLater;
    }

    return false;
}
