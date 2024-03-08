function getProductID() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

//
function getProductImage(productId) {

}

function displayProductDetails(product) {
    let imageURI = `https://api.kedufront.juniortaker.com/item/picture/${product._id}`;

    axios.get(imageURI)
    .then(() => {})
    .catch(error => console.error('Error fetching product details:', error));
    const productDetailsElement = document.getElementById('product-details');
    productDetailsElement.innerHTML = `
        <div class="product">
            <h2>${product.name}</h2>
            <img src="${imageURI}" alt="${product.name}">
            <p>${product.description}</p>
            <p>Price: ${product.price} €</p>
            <button onclick="addToCart(${product._id})">Add to Cart</button>
        </div>
    `;
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if(productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({id: productId, quantity: 1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

axios.get(`https://api.kedufront.juniortaker.com/item/${getProductID()}`)
    .then(response => displayProductDetails(response.data.item))
    .catch(error => console.error('Error fetching product details:', error));
