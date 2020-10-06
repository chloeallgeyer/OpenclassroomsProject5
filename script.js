const host = 'http://localhost:3000/';

const ajaxRequest = (method, url) => {
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




