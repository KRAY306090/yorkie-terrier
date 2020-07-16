// variable to use in the next fetch request
//var dogbreed = "";


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

            // if nothing found show the modal message
            if (response.length === 0) {
                var message = "If you are not sure about the exact name of the breed, you can enter as little as few letters. For example *bull* and choose from the list"
                callModal(message);
            }
            //add new div elements to html DOM 
            else {
                a = response;
                for (var i = 0; i < response.length && i < 5; i++) {
                    var newdiv = document.createElement("DIV");
                    newdiv.setAttribute("class", "new-div");
                    newdiv.setAttribute("id", i.toString());
                    

                    var innertext = document.createTextNode(response[i].name);
                    newdiv.appendChild(innertext);
                    var divparent = document.getElementById("response-container")
                    divparent.appendChild(newdiv);
                    
                }

                // find clicked element change picked text color and save object in the session storage
                 function saveBreed(element) {
                     sessionStorage.clear();
                    element.target.style.color = 'red'
                    var targetindex = Number(element.target.id);
                    sessionStorage.setItem('breedinfo', JSON.stringify(response[targetindex]));

                    window.location.href = "./doginfo.html";
                }
                divparent.addEventListener("click", saveBreed, false);

            }
            //show modal message 
            // just call it if you need an alert and pass string message as a parameter
            function callModal(value) {
                var messagecontainer = document.getElementById("modaltext");
                messagecontainer.innertext = value;
                var modal = document.getElementById("myModal");
                var span = document.getElementsByClassName("close")[0];
                //show modal
                modal.style.display = "block";
                //hide modal
                span.onclick = function () {
                    modal.style.display = "none";
                }
                window.onclick = function (event) {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                }
            }
        });


}