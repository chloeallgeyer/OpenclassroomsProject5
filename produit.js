/**
 * Fonction qui récupère un paramètre d'url et le renvoie
 * @param {string} param paramètre demandé
 */
const getParam = (param) => {
    const currentPage = window.location.href;
    const url = new URL(currentPage);
    return url.searchParams.get(param); 
}

/**
 * récupère une liste d'élements (data) et les ajoute à l'élément cible target
 * @param {*} data objet de  l'ourson sélectionné
 */
const renderProduct = (data) => {
    let select = '<option selected disabled>Coloris</option>';
    // On boucle sur chaque couleur existante des oursons
    for (let i=0 ; i < data.colors.length; i++) {
        // déclaration et initialisation des options de select
        select += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
        console.log(select);
    }
    const bearPrice = data.price / 100;
    const image = `<img src="${data.imageUrl}" class="card-img" alt="...">`

    document.getElementById('color-options').innerHTML = select;
    document.getElementById('bear-name').innerHTML = data.name;
    document.getElementById('bear-description').innerHTML = data.description;
    document.getElementById('bear-price').innerHTML = bearPrice + '€';
    document.getElementById('bear-image').innerHTML = image;
}
// Initialisation de la variable ayant pour valeur le résultat de la fonction getParam('id)
const pageId = getParam('id');

// appel de la base de données et display de la liste de produits (.then) et de la page d'erreur (.catch)
ajaxRequest(`${host}api/teddies/${pageId}`)
    .then( (data) => renderProduct(data))
    .catch( (error) => renderError(error));