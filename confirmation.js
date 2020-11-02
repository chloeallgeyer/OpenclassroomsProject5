//  recupérer le session storage
console.log(sessionStorage);


// getAmount recupère price et additionne
const getAmount = (products) => {
    let amount = 0;
    products.forEach((product) => {
        amount += product.price / 100;
    })
    return amount;
}

/**
 * 
 */
const renderOrder = () => {
    const order = JSON.parse(sessionStorage.getItem('order'));
    const contact = order.contact;
    const products = order.products;
    const orderId = order.orderId;

    const date = new Date();
    const dateOrder = date.toLocaleString('fr-FR',{
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const expeditionDate = new Date(date.setDate(date.getDate() + 5));
    const expeditionDateStr = expeditionDate.toLocaleString('fr-FR',{
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let orderDetails = '';

    products.forEach((product) => {
        const image = product.imageUrl;
        const name = product.name;
        const price = product.price / 100;

        orderDetails += `
            <tr>
                <td><img src='${image}'></td>
                <td>${name}</td>
                <td>${price.toFixed(2)}€</td>
            </tr>
        `
    })

    const amount = getAmount(products);

    document.getElementById('date').innerHTML = dateOrder;
    document.getElementById('order-id').innerHTML = orderId;
    document.getElementById('details').innerHTML = orderDetails;
    document.getElementById('amount').innerHTML = amount.toFixed(2);
    document.getElementById('name').innerHTML = `${contact.firstName} ${contact.lastName}`;
    document.getElementById('email-confirmation').innerHTML = contact.email;
    document.getElementById('address').innerHTML = contact.address;
    document.getElementById('city').innerHTML = contact.city;
    document.getElementById('expedition').innerHTML = expeditionDateStr;

}

renderOrder();




