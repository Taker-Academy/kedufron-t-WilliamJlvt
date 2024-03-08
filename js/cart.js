function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    cart.forEach(item => {
        fetchProductDetails(item.id).then(product => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <div class="product">
                    <h2>${product.name}</h2>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: ${product.price} €</p>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
            cartItemsElement.appendChild(itemElement);
        });
    });
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // Refresh cart display
}

function checkout() {
    window.location.href = 'checkout.html';
}

async function fetchProductDetails(productId) {
    const response = await axios.get(`https://api.kedufront.juniortaker.com/item/${productId}`);
    return response.data.item;
}

loadCartItems();
