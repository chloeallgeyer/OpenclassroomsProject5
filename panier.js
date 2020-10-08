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


// Expects request to contain:
// * contact: {
// *   firstName: string,
// *   lastName: string,
// *   address: string,
// *   city: string,
// *   email: string
// * }
// * products: [string] <-- array of product _id 