//     ----------------------     PANIER     ----------------------     //

/**
 * Fonction qui ajoute une ligne au tableau comprenant les informations de chaque ourson ajouté au panier
 * @param {string} image 
 * @param {string} name 
 * @param {number} price 
 * @param {string} item 
 */
const renderCartLine = (image, name, price, item) => {
    return `
            <tr>
                <td><img src='${image}'></td>
                <td>${name}</td>
                <td>${price.toFixed(2)}€</td>
                <td><button class="remove-item btn btn-light " data-id="${item}"><i class="fas fa-trash-alt"></i></button></td>
            </tr>
`;
}

/**
 * Fonction qui récupère les données du panier présentes dans localStorage et les affiche dans l'élément cible
 */
const renderCart = () => {
    const numberOfArticles = document.getElementById('article-number');
    const emptyCartMessage = document.getElementById('empty-cart');

    if(localStorage.length > 0) {
        numberOfArticles.innerHTML = localStorage.length;
        let tBody = '';
        let amount = 0;

        // Récupère les clés de l'objet localStorage sous forme de tableau
        const itemsArray = Object.keys(localStorage);
        itemsArray.forEach((item) => {
            const info = JSON.parse(localStorage.getItem(item));
            const image = info.imageUrl;
            const name = info.name;
            const price = info.price / 100;
            console.log('itemsarray', itemsArray);
            tBody += renderCartLine(image, name, price, item);
            amount += price;
        })

        document.getElementById('cart-table').innerHTML = tBody;  
        document.getElementById('amount').innerHTML = amount.toFixed(2);

        const removeButtons = document.getElementsByClassName('remove-item');
        for(let removeButton of removeButtons) {
            const id = removeButton.getAttribute('data-id');
            removeButton.onclick = () => {
                localStorage.removeItem(id);
                renderCart();
            }    
        }

    } else {
        // Affiche un message et vide le tableau
        emptyCartMessage.innerHTML = 'Votre panier est vide :(';
        document.getElementById('cart-table').innerHTML = '';  
        document.getElementById('empty-cart-amount').innerHTML = '';
        document.getElementById('form').innerHTML = '';
        document.getElementById('clear-cart').remove();

    }
}
renderCart();

/**
 * Appel de la fonction qui vide le contenu du panier (localStorage) au clic sur le bouton "vider mon panier"
 */
document.getElementById('clear-cart').onclick = (e) => {   
    localStorage.clear();
    renderCart();
}


//     ----------------------     FORMULAIRE     ----------------------     //

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

/**
 * Fonction qui récupère les informations recueillies dans le formulaire et crée un objet body 
 * @param {*} e 
 */
form.onsubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Récuperation des data du formulaire à l'aide de la fonction formDataExtractor
    const contact = formDataExtractor(form);
    const products = Object.keys(localStorage);
    const body = {contact, products};
    const url = 'http://localhost:3000/api/teddies/order';
    const responseData = await sendData(url, body)
        .then( (data) => {
            return data;
        })
        .catch( (error) => {
            console.log('error in sendData', error);
            return null;
        });
    console.log('data', responseData);
    if (!responseData) {
        renderError(error);
    } else {
        // Ajoute responseData dans le sessionStorage
        sessionStorage.setItem('order', JSON.stringify(responseData));
        localStorage.clear();
        // Renvoie vers la page de confirmation
        window.location.href = "confirmation.html";
    } 

}

/**
 * Fonction PROMISE qui envoie des données (body) vers une url à travers la méthode post et qui renvoie la réponse
 * @param {object} body (données à envoyer)
 */
const sendData = async (url, body) => {
    const formResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return formResponse.json();
}
