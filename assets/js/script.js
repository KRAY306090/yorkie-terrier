function myFunction() {
    var node = document.getElementById("response-container");
    node.querySelectorAll('*').forEach(n => n.remove());
    
        breed = document.querySelector('#searchTerm').value;
        var dogbreed = "";

        fetch(
            'https://api.thedogapi.com/v1/breeds/search?q=' + breed + '&api_key=74a8d6a7-fb77-4451-999a-01a85de265cc'
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                console.log(response);
                if (response.length === 0) {
                    console.log('Could not find anything for that.');
                }
                else {
                    for (var i = 0; i < response.length && i < 5; i++) {
                        var newdiv = document.createElement("DIV");
                        newdiv.setAttribute("class", "new-div");

                        var innertext = document.createTextNode(response[i].name);
                        newdiv.appendChild(innertext);

                        var divparent = document.getElementById("response-container")
                        divparent.appendChild(newdiv);
                        function saveBreed(element) {
                            element.target.style.color = 'red'
                            dogbreed = element.target.textContent;
                        }
                        divparent.addEventListener("click", saveBreed, false);
                    }
                }
            });
    
    
}