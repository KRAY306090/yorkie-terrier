// variable to use in the next fetch request
var dogbreed = "";

// this function runs on click of the search button
function myFunction() {

    // if new search clicked remove previous search items
    var node = document.getElementById("response-container");
    node.querySelectorAll('*').forEach(n => n.remove());

//input value
    breed = document.querySelector('#searchTerm').value;

    fetch(
        'https://api.thedogapi.com/v1/breeds/search?q=' + breed + '&api_key=74a8d6a7-fb77-4451-999a-01a85de265cc'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);

            // if nothing found need a massage here(console.log for now)
            if (response.length === 0) {
                console.log('Could not find anything for that.');
            }
            //add new div elements to html DOM 
            else {
                for (var i = 0; i < response.length && i < 5; i++) {
                    var newdiv = document.createElement("DIV");
                    newdiv.setAttribute("class", "new-div");

                    var innertext = document.createTextNode(response[i].name);
                    newdiv.appendChild(innertext);
                    var divparent = document.getElementById("response-container")
                    divparent.appendChild(newdiv);
                }

                // find clicked element change color and save breed name in var for future use
                function saveBreed(element) {
                    element.target.style.color = 'red'
                    dogbreed = element.target.textContent;
                    console.log(dogbreed);
                }
                divparent.addEventListener("click", saveBreed, false);

            }
        });


}