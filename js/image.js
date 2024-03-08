async function getProductImage(productId) {
    const response = await axios.get(`https://api.kedufront.juniortaker.com/item/${productId}`);
    return response.data.item.image;
}