class Store {
    constructor() {
        this.itemsInCart = {
            itemCount: 0,
            subTotal: 0
        }

        this.inventory = {
            item1: {
                id: 1,
                img: 'https://via.placeholder.com/150x150',
                alt: 'placeholder img',
                class: 'img-fluid product-img',
                price: 300.00,
                qty: 0,
                name: 'branded shoe',
            },

            item2: {
                id: 2,
                img: 'https://via.placeholder.com/150x150',
                alt: 'placeholder img',
                class: 'img-fluid product-img',
                price: 300.00,
                qty: 0,
                name: 'branded tees',
            },

            item3: {
                id: 3,
                img: 'https://via.placeholder.com/150x150',
                alt: 'placeholder img',
                class: 'img-fluid product-img',
                price: 300.00,
                qty: 0,
                name: 'branded shirt',
            },

            item4: {
                id: 4,
                img: 'https://via.placeholder.com/150x150',
                alt: 'placeholder img',
                class: 'img-fluid product-img',
                price: 300.00,
                qty: 0,
                name: 'branded wallet',
            },

            item5: {
                id: 5,
                img: 'https://via.placeholder.com/150x150',
                alt: 'placeholder img',
                class: 'img-fluid product-img',
                price: 300.00,
                qty: 0,
                name: 'branded purse',
            },

            item6: {
                id: 6,
                img: 'https://via.placeholder.com/150x150',
                alt: 'placeholder img',
                class: 'img-fluid product-img',
                price: 300.00,
                qty: 0,
                name: 'branded cargos',
            }
        }
    }

    init() {
        this.loadItems();
        this.addToCart();
        this.checkout();
    }

    loadItems() {
        let productSection = document.getElementById('productSection');

        for (const key in this.inventory) {
            const item = this.inventory[key];
            const product = document.createElement('div');
            product.className = 'col-md-4 product';
            product.innerHTML = `
            <img src="${item.img}" alt="${item.alt}" class="${item.class}">
            <p class="product-name">${item.name}</p>
            <p><span class="product-price">$${item.price}</span><span><button class="add-btn" data-id="${item.id}">buy now</button></span></p>
            `

            productSection.append(product);
        }
    }

    addToCart() {
        let buttons = document.querySelectorAll('.add-btn');
        let balance = document.querySelector('.balance');
        let itemCount = 0;
        let price = 0;

        for (const key in this.inventory) {
            const item = this.inventory[key];

            buttons.forEach(button => {
                button.addEventListener('click', ()=> {
                    if (button.dataset['id'] == item.id) {
                        itemCount++;
                        price = price + item.price;

                        this.itemsInCart.itemCount = itemCount;
                        this.itemsInCart.subTotal = price;

                        item.qty++;
                    }

                    balance.innerText = `$${price}`
                })
            })
        }
    }

    checkout() {
        let table = document.getElementById('tbody');
        let cartButton = document.getElementById('cartButton');
        let mainPage = document.querySelector('.main-page');
        let checkoutPage = document.querySelector('.checkout-page');
        let subTimesQty = 0;
        let subtotalValue = document.getElementById('subtotalValue');
        let taxValue = document.getElementById('taxValue');
        let totalValue = document.getElementById('totalValue');
        let tax = 0;
        let shippingValue = document.getElementById('shippingValue');
        let checkoutItemCount = document.getElementById('checkoutItemCount');
        let shipping = 6;

        console.log(checkoutPage);

        cartButton.addEventListener('click', ()=> {
            if (mainPage.classList.contains('d-none')) return;
            checkoutPage.classList.remove('d-none');
            mainPage.classList.add('d-none');

            if (this.itemsInCart.itemCount == 1) {
                checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`;
            } else {
                checkoutItemCount.innerText = `${this.itemsInCart.itemCount} items`;
            }

            for (const key in this.inventory) {
                const item = this.inventory[key];

                subTimesQty = (item.qty * item.price).toFixed(2);
                subtotalValue.innerText = this.itemsInCart.subTotal.toFixed(2);
                shippingValue.innerText = shipping.toFixed(2);
                tax = this.itemsInCart.subTotal * .07;
                taxValue.innerText = tax.toFixed(2);
                totalValue.innerText = (this.itemsInCart.subTotal + tax + shipping).toFixed(2);

                if (item.qty > 0) {
                    const tableRow = document.createElement('tr');
                    tableRow.className = 'product-checkout';

                    tableRow.innerHTML = `
                        <td id="checkoutImg">
                            <img src="${item.img}" alt="${item.alt}" class="img-fluid checkout-img">
                            <div class="product-desc">
                                <p class="item-name">${item.name}</p>
                            </div>
                        </td>
                        <td>
                            <p class="unit-price">${item.price.toFixed(2)}</p>
                        </td>
                        <td>
                            <div id="itemQuantity">
                                <p class="unit-qty" id="qtyInput">${item.qty}</p>
                            </div>
                        </td>
                        <td class="unit-subtotal" id="itemSubtotal">${subTimesQty}</td>
                    `
                    table.append(tableRow);
                }
            }
        })
    }
}

let action = new Store();

action.init();