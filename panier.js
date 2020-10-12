// Validation des inputs du formulaire avant envoi


// Initialisation des éléments
const submit = document.getElementById("submit");
const form = document.getElementById("form");
// Déclaration de la fonction formDataExtractor avec le paramètre form: element formulaire
const formDataExtractor = (form) => {
    // Instanciation de la classe FormData
    const formData = new FormData(form);
    // Récupération des entrées du formulaire (name="") via la méthode entries()
    const entries = formData.entries();
    // Initialisation de l'objet de retour
    const obj = {};
    // Boucle sur chaque entrée du formulaire
    for (var pair of entries) {
        // Affectation clé = valeur dans l'objet de retour
        const key = pair[0];
        const value = pair[1];
        obj[key] = value;
    }
    // On retourne l'objet complet
    return obj;
}

// Event listener onclik
submit.onclick = (e) => {
    // On empêche la redirection post submit
    e.preventDefault();
    // Récuperation des data du formulaire à l'aide de la fonction formDataExtractor
    const contact = formDataExtractor(form);
    // Print data dans la console
    console.log("contact", contact);
}



// {
//     "contact": {
//         "firstName": "Chloé",
//         "lastName": "Allgeyer",
//         "address": "923, chemin de roumagoua, résidence ouliveto, apt C13",
//         "city": "La Ciotat",
//         "email": "kzjerhg@akjzberf.com"
//     },

//     "products": [
//         "5be9c8541c9d440000665243",
//         "5be9c8541c9d440000665243"
//     ]
// }

























// function sendData(data) {
//     var XHR = new XMLHttpRequest();
//     var FD  = new FormData();
  
//     // Mettez les données dans l'objet FormData
//     for(name in data) {
//       FD.append(name, data[name]);
//     }
  
//     // Définissez ce qui se passe si la soumission s'est opérée avec succès
//     XHR.addEventListener('load', function(event) {
//       alert('Ouais ! Données envoyées et réponse chargée.');
//     });
  
//     // Definissez ce qui se passe en cas d'erreur
//     XHR.addEventListener('error', function(event) {
//       alert('Oups! Quelque chose s\'est mal passé.');
//     });
  
//     // Configurez la requête
//     XHR.open('POST', 'https://example.com/cors.php');
  
//     // Expédiez l'objet FormData ; les en-têtes HTTP sont automatiquement définies
//     XHR.send(FD);
//   }

// Expects request to contain:
// * contact: {
// *   firstName: string,
// *   lastName: string,
// *   address: string,
// *   city: string,
// *   email: string
// * }
// * products: [string] <-- array of product _id 