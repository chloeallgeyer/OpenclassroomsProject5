const host = 'http://localhost:3000/';

/**
 * Crée une requête Ajax
 * @param {*} url url sélectionnée
 * @param {*} method méthode utilisée
 */
const ajaxRequest = (url, method="GET") => {
    return new Promise( (resolve, reject) => {
        // instanciation de la classe XMLHttpRequest 
        const request = new XMLHttpRequest();
        // appel de la méthode onreadystatechange
        request.onreadystatechange = function() {   
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                const response = JSON.parse(request.responseText);
                resolve(response);
            } else if (request.status > 400) {
                // Gestion des erreurs server > 400
                reject(request.status)
            }
        }
        // appel de la méthode onerror (autres types d'erreur)
        request.onerror = (error) => reject(error);
        //  appel des méthodes open et send
        request.open(method, url);
        request.send();
    })
}

/**
 * Affiche un message d'erreur
 * @param {*} error message d'erreur
 */
const renderError = (error) => {
    const target2 = document.getElementById('target2');
    // TODO: créer variable contenant structure message d'erreur + bouton refresh
    target2.insertAdjacentHTML('beforeend', `<h2>Une erreur est survenue: impossible de charger la page</h2>`);
    console.log(`erreur survenue : ${error}`);
}