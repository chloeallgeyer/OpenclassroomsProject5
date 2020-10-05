let norbertPrice = document.getElementById('price');
let norbertName = document.getElementById('name');
let norbertDescription = document.getElementById('description');


const makeAjaxCall = () => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {   
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            var response = JSON.parse(request.responseText);
            console.log(response.price);
            norbertPrice.innerHTML = response.price;
        }
    }
    request.open("GET", "http://localhost:3000/api/teddies/5be9c8541c9d440000665243");
    request.send();
};

makeAjaxCall();