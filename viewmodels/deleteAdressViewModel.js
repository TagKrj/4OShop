import AddressModel from '../models/addressModel.js';

class DeleteAddressViewModel {
    constructor() {
        this.addressModel = [];
    }

    async fetchDeleteAddress(token, id) {
        try {
            const response = await fetch(`http://20.255.56.110:8000/api/address/delete/?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Lỗi khi gọi API');
            }

            return response.status;
        } catch (error) {
            console.error('Lỗi khi gọi API delete address:', error);
            throw error;
        }
    }


}

export default DeleteAddressViewModel; 