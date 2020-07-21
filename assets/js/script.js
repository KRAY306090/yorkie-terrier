function searchCursor() {
    document.getElementById('searchTerm').value = "";
    document.getElementById('searchTerm').focus();

}

// this function runs on click of the search button
function myFunction() {

    var emptyinput = document.getElementById('searchTerm');
    if (emptyinput.value === "") {
        return;
    }
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


            // if nothing found show the modal message
            if (response.length === 0) {
                var inputvalue = document.getElementById('searchTerm').value;
                var cutvalue = inputvalue.substring(0, inputvalue.length - 1);
                document.getElementById('searchTerm').value = cutvalue;
                var message = "We can't find enything. Please try another name or choose from the list below"
                document.getElementById('searchTerm').disabled = true;
                callModal(message);
            }
            //add new div elements to html DOM 
            else {
                a = response;
                for (var i = 0; i < response.length; i++) {
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

                document.getElementById("modaltext").textContent = value;
                var modal = document.getElementById("myModal");
                var span = document.getElementsByClassName("close")[0];

                //show modal
                modal.style.display = "block";

                //hide modal
                span.onclick = function () {
                    modal.style.display = "none";
                    document.getElementById('searchTerm').disabled = false;
                    document.getElementById('searchTerm').focus();
                    myFunction();

                }
                window.onclick = function (event) {
                    if (event.target === modal) {
                        modal.style.display = "none";
                        document.getElementById('searchTerm').disabled = false;
                        document.getElementById('searchTerm').focus();
                        myFunction();
                    }
                }
            }
        });


}