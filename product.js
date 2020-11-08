/**
 * Fonction qui récupère un paramètre de l'url de la page courante et le retourne
 * @param {string} param paramètre demandé
 */
const getParam = (param) => {
    const currentPage = window.location.href;
    const url = new URL(currentPage);
    return url.searchParams.get(param); 
}

/**
 * Fonction qui récupère le nom de l'ourson sélectionné et le renvoie
 * @param {object} data 
 */
const renderArticleName = (data) => {
    const articleName = data.name;
    return `${articleName} a bien été ajouté à votre panier :)`;
}

/**
 * Fonction qui récupère une liste d'élements (data) et les ajoute à l'élément cible 
 * @param {object} data objet de l'ourson sélectionné
 */
const renderProduct = (data) => {
    let select = '';
    for (let i=0 ; i < data.colors.length; i++) {
        select += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
    }
    const bearPrice = (data.price / 100).toFixed(2);
    const image = `<img src="${data.imageUrl}" class="card-img" alt="Ours en peluche - Orinoco">`

    document.getElementById('color-options').insertAdjacentHTML('beforeend', select);
    document.getElementById('bear-name').innerHTML = data.name;
    document.getElementById('bear-description').innerHTML = data.description;
    document.getElementById('bear-price').innerHTML = bearPrice + '€';
    document.getElementById('bear-image').innerHTML = image;

    const articleName = renderArticleName(data);
    document.getElementById('article-name').insertAdjacentHTML('beforeend', articleName);
}

/**
 * Fonction qui récupère les données des produits ajoutés dans le panier et les stocke dans le localStorage
 */
const run = async () => {

    const pageId = getParam('id');

    const ajaxResponse = await ajaxRequest(`${host}api/teddies/${pageId}`)
    .then( (data) => {
        renderProduct(data);
        return data;
    })
    .catch( (error) => {
        renderError('Une erreur est survenue, veuillez recharger la page.');
        return null;
    });

    document.getElementById('product-form').onsubmit = (e) => {
        e.preventDefault();
        $('#cartModal').modal('show');

        const info = {};
        info.imageUrl = ajaxResponse.imageUrl;
        info.name = ajaxResponse.name;
        info.price = ajaxResponse.price;

        localStorage.setItem(pageId, JSON.stringify(info));   
    }
}

run();
