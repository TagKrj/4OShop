import AddressViewModel from '../../viewmodels/addressViewModel.js';
import AddressDefaultViewModel from '../../viewmodels/addressDefaultViewModel.js';
import EditAddressDefaultViewModel from '../../viewmodels/editAddressDefaultViewModels.js';

class AddressViews {
    constructor() {
        this.addressViewModel = new AddressViewModel();
        this.addressDefaultViewModel = new AddressDefaultViewModel();
        this.editAddressDefaultViewModel = new EditAddressDefaultViewModel();

    }

    async render() {
        try {
            const token = localStorage.getItem('authToken');
            await this.addressViewModel.fetchAddress(token);
            await this.addressDefaultViewModel.fetchAddressDefault(token);

            const fullHtml = this.addressViewModel.addressModel.map(address => {
                const isDefault = this.addressDefaultViewModel.addressModel &&
                    this.addressDefaultViewModel.addressModel.id === address.id;

                return `
                    <div class="item" data-id="${address.id}">
                        <i class="bi bi-geo-alt"></i>
                        <div class="info">
                            <h3>Địa chỉ: <span>${address.address}</span></h3>
                            <h3>Địa điểm: <span>${address.addressType}</span></h3>
                            <h3>SĐT: <span>${address.phone}</span></h3>
                        </div>
                        <div class="button">
                            <h3 class="default" style="background-color: ${isDefault ? '#EDBFFF' : ''}; 
                                color: ${isDefault ? '#000' : ''};"
                                data-id="${address.id}">
                                Mặc định
                            </h3>
                        </div>
                    </div>
                `;
            }).join('');

            document.querySelector('.addressContent').innerHTML = fullHtml;

            this.setupEventListeners(token);
        } catch (error) {
            console.error("Có lỗi xảy ra trong quá trình render:", error);
        }
    }

    setupEventListeners(token) {
        //chỉnh địa chỉ mặc định
        document.querySelectorAll('.default').forEach(button => {
            button.addEventListener('click', async (event) => {
                event.stopPropagation();

                const id = event.target.getAttribute('data-id');
                await this.editAddress(token, id);
            });
        });
    }


    //cập nhật điểm mạc định
    async editAddress(token, id) {
        try {
            const responseStatus = await this.editAddressDefaultViewModel.fetchEditAddressDefault(token, id);
            if (responseStatus === 200) {
                console.log(`Cập nhật địa chỉ mặc định thành công`);
                this.render();
            } else {
                console.error('Không tìm thấy địa chỉ hoặc lỗi khác');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật địa chỉ mặc định:', error);
        }
    }
}

const view = new AddressViews();
view.render();

export default AddressViews;
