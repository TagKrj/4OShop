import CategoryViewModel from '../../viewmodels/categoryViewModel.js';

class CategoryIndexWidget {
    constructor() {
        this.categoryViewModel = new CategoryViewModel();
        this.imageArray = [
            {
                image1: "",
                image2: "https://vn.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-quan-ngan-hoa-tiet-monogram-lv-x-ac--FRPT64EFY610_PM2_Front%20view.jpg"
            },
            {
                image1: "https://vn.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-monogram-pocket-t-shirt--FRTS47API001_PM2_Front%20view.jpg",
                image2: ""
            },
            {
                image1: "",
                image2: "https://vn.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-trainer-sneaker--AQ9U4APC11_PM2_Front%20view.jpg"
            }
        ];
    }


    async render() {
        await this.categoryViewModel.fetchCategories();
        const categoryHtml = this.categoryViewModel.category.slice(0, 3).map((category, index) => {
            const images = this.imageArray[index];
            return `
     <div class="elem">
                <img src="${images.image1}"
                    alt="">
                <div class="text-div">
                    <h1>${category.title}</h1>
                    <h1>${category.title}</h1>
                </div>
                <img src="${images.image2}"
                    alt="">
            </div> 
      `;
        }).join('');
        document.getElementById('category-list').innerHTML = categoryHtml;
    }
}

const view = new CategoryIndexWidget();
view.render();

export default CategoryIndexWidget;