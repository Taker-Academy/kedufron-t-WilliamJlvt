document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const orderPayload = {
        email: email,
        name: name,
        address: address,
        cart: cart.map(item => ({
            id: item.id,
            amount: item.quantity
        }))
    };

    const options = {
        method: 'POST',
        url: 'https://api.kedufront.juniortaker.com/order/',
    };
    options.data = JSON.stringify(orderPayload);

    console.log('Order payload:', options.data);
    axios.post('https://api.kedufront.juniortaker.com/order/', orderPayload)
        .then(function(response) {
            console.log('Order successful:', response);
            localStorage.removeItem('cart');
            window.location.href = 'confirmation.html';
        })
        .catch(function(error) {
            console.error('Order failed:', error);
        });
});
