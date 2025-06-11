import AddressViewModel from '../../viewmodels/addressViewModel.js';
import AddressDefaultViewModel from '../../viewmodels/addressDefaultViewModel.js';
import EditAddressDefaultViewModel from '../../viewmodels/editAddressDefaultViewModels.js';
import DeleteAddressViewModel from '../../viewmodels/deleteAdressViewModel.js';
import AddAddressViewModel from '../../viewmodels/addAddressViewmodel.js';

class AddressViews {
    constructor() {
        this.addressViewModel = new AddressViewModel();
        this.addressDefaultViewModel = new AddressDefaultViewModel();
        this.editAddressDefaultViewModel = new EditAddressDefaultViewModel();
        this.deleteAddressViewModel = new DeleteAddressViewModel();
        this.addAddressViewModel = new AddAddressViewModel();
        this.isAddedType = null;
    }

    async render() {
        try {
            const token = localStorage.getItem('authToken');
            await this.addressViewModel.fetchAddress(token);
            await this.addressDefaultViewModel.fetchAddressDefault(token);

            const addressHtml = this.addressViewModel.addressModel.map(address => {
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
                            <h3 class="delete" data-id="${address.id}">Xóa</h3>
                        </div>
                    </div>
                `;
            }).join('');

            const fullHtml = `
                <div class="contentAddress">
                    <div class="add">
                        <i class="bi bi-plus-square"></i>
                    </div>

                     <div class="addAddress">
                        <h2>Thêm địa chỉ</h2>
                        <div class="addAddressForm">
                            <label for="">Nhập địa chỉ:</label>
                            <input type="text" placeholder="Địa chỉ" id="address" required>
                           <label for="">Chọn loại địa điểm:</label>
                            <div class="type">
                                <h3 id="addressType">home</h3>
                                <h3 id="addressType">office</h3>
                                <h3 id="addressType">school</h3>
                            </div>
                            <label for="">Nhập SĐT:</label>
                            <input type="text" placeholder="SĐT" id="phone" required>
                            <button id="addAddressBtn">Thêm</button>
                        </div>
                    </div>
                    <div class="contentDetail">
                        ${addressHtml}
                    </div>
                </div>
            `;
            document.querySelector('.containerRight').innerHTML = fullHtml;

            this.setupAddEvents();
            this.setupEventListeners(token);
        } catch (error) {
            console.error("Có lỗi xảy ra trong quá trình render:", error);
        }
    }

    //set sự kiện cho nút thêm điểm khi ấn vào
    setupAddEvents() {
        const add = document.querySelector('.add');
        let isAdded = false; // biến để lưu trạng thái đã ấn thêm hay chưa

        add.addEventListener('click', () => {
            const addAddress = document.querySelector('.addAddress');

            if (!isAdded) {
                addAddress.style.transform = 'translateX(0)';
                addAddress.style.transition = 'all 1s ease';
                addAddress.style.opacity = '1';
                isAdded = true;
            } else {
                addAddress.style.transform = 'translateX(500px)';
                addAddress.style.transition = 'all 1s ease';
                addAddress.style.opacity = '0';
                isAdded = false;
            }
        });

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

        //xóa điểm
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', async (event) => {
                event.stopPropagation();

                const id = event.target.getAttribute('data-id');
                await this.deleteAddress(token, id);
            });
        });

        //them điểm
        const addAddressBtn = document.getElementById('addAddressBtn');
        addAddressBtn.addEventListener('click', async () => {
            await this.addAddress(token);

            const addAddress = document.querySelector('.addAddress');
            addAddress.style.transform = 'translateX(500px)';
            addAddress.style.transition = 'all 1s ease';
            addAddress.style.opacity = '0';
        });

        //loại địa điểm
        const addressType = document.querySelectorAll('#addressType');
        addressType.forEach(typeElement => {
            typeElement.addEventListener('click', (event) => {
                // Reset màu của tất cả các loại địa điểm
                addressType.forEach(el => {
                    el.style.backgroundColor = '';
                    el.style.color = '';
                });

                // Đổi màu loại địa điểm được chọn
                const selectedType = event.target;
                selectedType.style.backgroundColor = '#EDBFFF';
                selectedType.style.color = '#000';
                this.isAddedType = selectedType.innerText;
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

    //xóa điểm
    async deleteAddress(token, id) {
        try {
            const responseStatus = await this.deleteAddressViewModel.fetchDeleteAddress(token, id);
            if (responseStatus === 200) {
                console.log(`Xóa thành công`);
                this.render();
            }
            else {
                console.error('Không tìm thấy điểm hoặc lỗi khác');
            }
        } catch (error) {
            console.error('Lỗi khi xóa điểm:', error);
            alert(`Không thể xóa vì địa chỉ đang sử dụng cho một số đơn hàng`)
            window.location.reload();
        }
    }

    //them điểm
    async addAddress(token) {
        try {
            const address = document.getElementById('address').value.trim();
            const addressType = this.isAddedType ? this.isAddedType.trim() : null;
            const phone = document.getElementById('phone').value.trim();
            const lat = 0;
            const lng = 0;
            const isDefault = false;
            if (!address || !addressType || !phone) {
                alert('Vui lòng nhập đầy đủ thông tin');
                return;
            }
            await this.addAddressViewModel.fetchAddAddress(token, lat, lng, isDefault, address, phone, addressType);
            this.render();
        }
        catch (error) {
            console.error('Lỗi khi thêm địa chỉ:', error);
        }
    }
}

const view = new AddressViews();
view.render();

export default AddressViews;
