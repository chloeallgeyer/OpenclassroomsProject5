/**
 * Fonction qui récupère une liste d'élements (data) et les ajoute à l'élément cible bear-cards
 * @param {object} data objet de l'API
 */
const renderList = (data) => {
    const list = document.getElementById('bear-cards');

    for (let element of data) {
        const card = createCard(element);
        list.insertAdjacentHTML('beforeend', card);
    }
}

/**
 * Fonction qui crée une card HTML représentant un ourson
 * @param {string} element informations de chaque ourson (image, name, description, price, id)
 */
const createCard = (element) => {
    const bearPrice = (element.price / 100).toFixed(2);
    return `
    <div class="col-md-4">
        <div class="card">
            <img src="${element.imageUrl}" class="card-img-top" alt="Ours en peluche - Orinoco">
            <div class="card-body">
                <h5 class="card-title">Ourson ${element.name}</h5>
                <p class="card-text">${element.description}</p>
                <p>Prix : ${bearPrice}€</p>
                <a href="product.html?id=${element._id}" class="btn btn-primary">En savoir plus</a>
            </div>
        </div>
    </div>
`
}

/**
 * Appel de la base de données et display de la liste de produits (.then) et de la page d'erreur (.catch)
 */
ajaxRequest(`${host}api/teddies/`)
    .then( (data) => renderList(data))
    .catch( (error) => renderError('Une erreur serveur est survenue, veuillez recharger la page.'));