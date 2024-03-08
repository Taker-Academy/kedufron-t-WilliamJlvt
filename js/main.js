const productListElement = document.getElementById('product-list');

axios.get('https://api.kedufront.juniortaker.com/item/')
    .then(response => {
        if (response.status !== 200) {
            console.error('Request failed with status code', response.status);
            return;
        }
        const products = response.data;

        products.forEach(product => {
            let imageURI = `https://api.kedufront.juniortaker.com/item/picture/${product._id}`;
            axios.get(imageURI)
                .then(() => {})
                .catch(error => console.error('Error fetching product details:', error));

            const productElement = document.createElement('div');
            productElement.innerHTML = `
                <div class="product">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <img src="${imageURI}" alt="${product.name}">
                    <p>${product.price} €</p>
                    <a href="product.html?id=${product._id}">View Product</a>
                </div>
            `;
            productListElement.appendChild(productElement);
        });
    })
    .catch(error => console.error('There was an error!', error));
