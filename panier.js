const renderCart = () => {
    const numberOfArticles = document.getElementById('article-number');
    const emptyCartMessage = document.getElementById('empty-cart');

    if(localStorage.length > 0) {
        numberOfArticles.innerHTML = localStorage.length;
        let body = '';
        let amount = 0;

        // Récupère les clés de l'objet localStorage sous forme de tableau
        const itemsArray = Object.keys(localStorage);
        itemsArray.forEach((item) => {
            const info = JSON.parse(localStorage.getItem(item));
            const image = info.imageUrl;
            const name = info.name;
            const price = info.price / 100;
            console.log(itemsArray);
            body += `
                <tr>
                    <td><img src='${image}' style='max-height:50px;'></td>
                    <td>${name}</td>
                    <td>${price}€</td>
                    <td><button class="remove-item" data-id="${item}">X</button></td>
                </tr>
            `;
            amount += price;
        })

        document.getElementById('cart-table').innerHTML = body;  
        document.getElementById('amount').innerHTML = amount;

        const removeButtons = document.getElementsByClassName('remove-item');
        for(let removeButton of removeButtons) {
            const id = removeButton.getAttribute('data-id');
            removeButton.onclick = (e) => {
                localStorage.removeItem(id);
                renderCart();
            }
            
        }
        
    } else {
        // affiche un message et vide le tableau
        emptyCartMessage.innerHTML = 'Votre panier est vide :(';
        document.getElementById('cart-table').innerHTML = '';  
        document.getElementById('amount').innerHTML = '';

    }
}

renderCart();



document.getElementById('clear-cart').onclick = (e) => {   
    clearCart();   
}



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