var breedListEl = document.querySelector("#breedList")
// set all info to the page on load
window.addEventListener('DOMContentLoaded', function () {
    //pull object from session storage
    var breedobject = JSON.parse(window.sessionStorage.getItem('breedinfo'));
    // console.log(breedobject);
    // fill dog info area
    document.getElementById('dogname').innerText = breedobject.name;
    document.getElementById('height').innerText = "Height: " + breedobject.height.imperial + " inches";
    document.getElementById('weight').innerText = "Weight: " + breedobject.weight.imperial + " pounds";
    document.getElementById('lifespan').innerText = "Lifespan: " + breedobject.life_span;
    // we not always have temperament in object
    if (breedobject.temperament) {
        document.getElementById('temperament').innerText = "Temperament: " + breedobject.temperament;
    }
    // For Mike to use
    // console.log(breedobject.name)
    var breed = breedobject.name
    // console.log(breed)

    videoSearch(apiKey, breed, 1)
});



window.addEventListener('DOMContentLoaded', function () {
    fetch(
        `https://api.thedogapi.com/v1/breeds?api_key=74a8d6a7-fb77-4451-999a-01a85de265cc`
    )


        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (var i = 0; i < 10; i++) {
                randomIndex = Math.floor(Math.random() * 172);
                var listName = data[randomIndex]["name"];
                var listItem = document.createElement("li");
                listItem.setAttribute("id", randomIndex.toString());
                listItem.setAttribute("class", "random-dog");

                listItem.innerHTML = listName;
                breedListEl.appendChild(listItem);

                listItem.addEventListener("click", saveBreed, false)

                function saveBreed(element) {

                    sessionStorage.clear();
                    element.target.style.color = 'red'
                    var targetindex = Number(element.target.id);
                    console.log(element);
                    sessionStorage.setItem('breedinfo', JSON.stringify(data[targetindex]));

                    window.location.href = "./doginfo.html";
                }

            }

        })


});






var apiKey = "AIzaSyD7nrLoufr8z3u4tc3PrAogdFA8EHy3ufI"
var video = ""

var videoSearch = function (key, search, maxResults) {
    // $("#videos").empty
    // $.get("https://www.googleapis.com/youtube/v3/search?key=" + key
    //     + "&type=video&part=snippet&order=viewCount&maxResults=" + maxResults + "&q=" + search, function (data) {
    //         // console.log(data)

    //         data.items.forEach(item => {
                // video = `<iframe width="480" height="320" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder = "0" allowfullscreen></iframe>
            // `

                // console.log(video)
                

                //video placement
                video = `<iframe width="480" height="320" src="http://www.youtube.com/embed/GBZnnOe_n5g" frameborder = "0" allowfullscreen></iframe>`   
                video2 = `<iframe width="480" height="320" src="http://www.youtube.com/embed/KiP4jwiTazI" frameborder = "0" allowfullscreen></iframe>`  
                $("#videos").append(video)
                $("#video2").append(video2)
            // })
        // })
}

