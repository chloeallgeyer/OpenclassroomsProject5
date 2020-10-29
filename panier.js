//     ----------------------     PANIER     ----------------------     //

/**
 * 
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
 * 
 */
const renderForm = () => {
    if(localStorage.length > 0) {
        return `<p class="message">Veuillez renseigner le formulaire ci-dessous afin de finaliser votre commande.</p>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="firstName">Prénom</label>
                        <input type="text" name="firstName" class="form-control" id="firstName" minlength="2" maxlength="30" pattern="[A-Za-z'^¨éèàù -]+" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="lastName">Nom</label>
                        <input type="text" name="lastName" class="form-control" id="lastName" minlength="2" maxlength="30" pattern="[A-Za-z'^¨éèàù -]+" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="address">Adresse</label>
                        <input type="text" name="address" class="form-control" id="address" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="city">Ville</label>
                        <input type="text" name="city" class="form-control" id="city" required>
                    </div>
                </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="email">E-mail</label>
                        <input type="email" name="email" class="form-control" id="email" required>
                    </div>
                </div>
                <button type="submit" name="submit" class="btn btn-primary" id="submit">Valider ma commande</button>`
    } else {
        return null;
    }
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

                
        const formDisplay = renderForm();
        document.getElementById('form').innerHTML = formDisplay;

        const removeButtons = document.getElementsByClassName('remove-item');
        for(let removeButton of removeButtons) {
            const id = removeButton.getAttribute('data-id');
            removeButton.onclick = () => {
                localStorage.removeItem(id);
                renderCart();
            }    
        }

    } else {
        // affiche un message et vide le tableau
        emptyCartMessage.innerHTML = 'Votre panier est vide :(';
        document.getElementById('cart-table').innerHTML = '';  
        document.getElementById('empty-cart-amount').innerHTML = '';
        document.getElementById('form').innerHTML = '';
        document.getElementById('clear-cart').remove();

    }
}
renderCart();

/**
 * Appel de la fonction qui vide le contenu du panier (localStorage) au clic sur le bouton"vider mon panier"
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
 * 
 * @param {*} e 
 */
form.onsubmit = async (e) => {
    // On empêche la redirection et la propagation post submit
    e.preventDefault();
    e.stopPropagation();
    // Récuperation des data du formulaire à l'aide de la fonction formDataExtractor
    const contact = formDataExtractor(form);
    const products = Object.keys(localStorage);
    // appel de fonction formValidator
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
        // do something, appeler un rendererror/fonction
    } else {
        // ajouter response data dans mon sessionstorage
        sessionStorage.setItem('order', JSON.stringify(responseData));
        localStorage.clear();
        // renvoyer vers page de confirmation
        window.location.href = "confirmation.html";
    } 

}

/**
 * Fonction PROMISE qui envoie des données (body) vers une url a travers la méthode post et qui renvoie la réponse
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
