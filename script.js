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
 * @param {*} errorMessage message d'erreur
 */
const renderError = (errorMessage) => {
    document.getElementById('error-modal').innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Une erreur est survenue</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>${errorMessage}</p>
            </div>
            <div class="modal-footer">
                <a href="${window.location}"><button type="button" class="btn btn-primary">Rafraîchir la page</button></a>
            </div>
        </div>
    </div>`
    $('#error-modal').modal('show');
}

