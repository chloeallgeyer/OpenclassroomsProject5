const renderList = (data) => {
    // récupération de l'élément cible (conteneur des cards à remplir avec les infos de chaque ourson)
    const target = document.getElementById('target');
    // On boucle sur chaque élement de la réponse de l'API (tableau des oursons)
    for (let element of data) {
        // déclaration et initialisation de la card
        const card = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${element.imageUrl}" class="card-img-top" alt="Ours en peluche">
                    <div class="card-body">
                        <h5 class="card-title">Ourson ${element.name}</h5>
                        <p class="card-text">${element.description}</p>
                        <p>Prix : ${element.price}</p>
                        <a href="produit.html?id=${element._id}" class="btn btn-primary">En savoir plus</a>
                    </div>
                </div>
            </div>
        `;
        console.log("element", element);
        // ajoute à l'élément cible (target) la card déclarée ci dessus
        target.insertAdjacentHTML('beforeend', card);
    }
}

const renderError = (error) => {
    const target = document.getElementById('target');
    // TODO: créer variable contenant structure message d'erreur + bouton refresh
    target.insertAdjacentHTML('beforeend', `<h2>Une erreur est survenue: impossible de charger la page</h2>`);
    console.log(`erreur survenue : ${error}`);
}
// appel de la base de données et display de la liste de produits (.then) et de la page d'erreur (.catch)
ajaxRequest("GET", `${host}api/teddies/`)
    .then( (data) => renderList(data))
    .catch( (error) => renderError(error));