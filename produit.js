// !!! VERSION A VALIDER AVEC MENTOR !!!
// var currentPage = window.location.href;
// var url = new URL(currentPage);
// var pageId = url.searchParams.get('id');
// console.log(pageId);

const queryParamsStr = location.search.substring(1);
const queryParams = JSON.parse('{"' + decodeURI(queryParamsStr).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
console.log(queryParams.id);

const renderProduct = (data) => {
    let select = '';
    // On boucle sur chaque couleur des oursons
    for (let i=0 ; i < data.colors.length; i++) {
        // déclaration et initialisation des options de select
        select += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
        console.log(select);
    }

    // récupération de l'élément cible (conteneur de la card à remplir avec les infos de l'ourson sélectionné au clic)
    const target2 = document.getElementById('target2');
    // déclaration et initialisation de la card 
    const card2 = `
        <div class="col-md-4">
            <img src="${data.imageUrl}" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.description}</p>
                <div class="form-row align-items-center">
                    <div class="col-auto my-1">
                        <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
                        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                            <option selected>Coloris</option>
                            ${select}
                        </select>
                    </div>
                    <div class="col-auto my-1">
                        <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
                        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                            <option selected>Quantité</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div class="col-auto my-1">
                        <button type="submit" class="btn btn-primary">Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    console.log("data", data);
    // ajoute à l'élément cible (target) la card déclarée ci dessus
    target2.insertAdjacentHTML('beforeend', card2);
}

const renderError = (error) => {
    const target2 = document.getElementById('target2');
    // TODO: créer variable contenant structure message d'erreur + bouton refresh
    target2.insertAdjacentHTML('beforeend', `<h2>Une erreur est survenue: impossible de charger la page</h2>`);
    console.log(`erreur survenue : ${error}`);
}
// appel de la base de données et display de la liste de produits (.then) et de la page d'erreur (.catch)
ajaxRequest("GET", `${host}api/teddies/${queryParams.id}`)
    .then( (data) => renderProduct(data))
    .catch( (error) => renderError(error));