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
 * Fonction qui récupère le nom de l'ourson sélectionné et le renvoie
 * @param {string} data 
 */
const renderArticleName = (data) => {
    const articleName = data.name;
    return `${articleName} a bien été ajouté à votre panier :)`;
}

/**
 * récupère une liste d'élements (data) et les ajoute à l'élément cible target
 * @param {*} data objet de  l'ourson sélectionné
 */
const renderProduct = (data) => {
    let select = '<option selected disabled>Couleurs</option>';
    // On boucle sur chaque couleur existante des oursons
    for (let i=0 ; i < data.colors.length; i++) {
        // déclaration et initialisation des options de select
        select += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
        console.log(select);
    }
    const bearPrice = (data.price / 100).toFixed(2);
    const image = `<img src="${data.imageUrl}" class="card-img" alt="...">`

    document.getElementById('color-options').innerHTML = select;
    document.getElementById('bear-name').innerHTML = data.name;
    document.getElementById('bear-description').innerHTML = data.description;
    document.getElementById('bear-price').innerHTML = bearPrice + '€';
    document.getElementById('bear-image').innerHTML = image;

    const articleName = renderArticleName(data);
    document.getElementById('article-name').insertAdjacentHTML('beforeend', articleName);
}

/**
 * Fonction qui ajoute un ourson au localStorage au clic sur le bouton "ajouter au panier"
 */
const addToCart = (info) => {
    const submitBear = document.getElementById('add-to-cart');
    submitBear.onclick = (e) => {
        e.preventDefault;
        const addBear = getParam('id');
        localStorage.setItem(addBear, info);     
    }
}

/**
 * Fonction qui récupère les données des produits ajoutés dans le panier et les stocke dans localStorage
 */
const run = async () => {

    // Initialisation de la variable ayant pour valeur le résultat de la fonction getParam('id)
    const pageId = getParam('id');

    const ajaxResponse = await ajaxRequest(`${host}api/teddies/${pageId}`)
    .then( (data) => {
        renderProduct(data);
        return data;
    })
    .catch( (error) => {
        renderError(error);
        return null;
    });

    document.getElementById('add-to-cart').onclick = (e) => {
        const info = {};
        info.imageUrl = ajaxResponse.imageUrl;
        info.name = ajaxResponse.name;
        info.price = ajaxResponse.price;

        localStorage.setItem(pageId, JSON.stringify(info));   
    }
}

run();

console.log(localStorage);