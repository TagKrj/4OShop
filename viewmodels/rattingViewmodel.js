class RattingViewModel {
    async fetchRatting(token, reviewData) {
        try {
            const response = await fetch('http://20.255.56.110:8000/api/rating/review/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify(reviewData),
            });
            console.log(JSON.stringify(reviewData));

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Review posted:', data);
            return data;
        } catch (error) {
            console.error('Error posting review:', error);
            return null;
        }
    }
}

export default RattingViewModel;