var breedListEl = document.querySelector("#breedList")
// set all info to the page on load
window.addEventListener('DOMContentLoaded', function () {
    //pull object from session storage
    var breedobject = JSON.parse(window.sessionStorage.getItem('breedinfo'));
    console.log(breedobject);
    // fill dog info area
    document.getElementById('dogname').innerText = breedobject.name;
    document.getElementById('height').innerText = "Height: " + breedobject.height.imperial + " inches";
    document.getElementById('weight').innerText = "Weight: " + breedobject.weight.imperial + " pounds";
    document.getElementById('lifespan').innerText = "Lifespan: " + breedobject.life_span ;
    // we not always have temperament in object
    if(breedobject.temperament){
    document.getElementById('temperament').innerText = "Temperament: " + breedobject.temperament;
    }
// For Mike to use
    console.log(breedobject.name)
    var breed = breedobject.name
    console.log(breed)

    videoSearch(apiKey, breed, 2)
});
var newBreed = function(data, index) {
    console.log(data);
    console.log(index);
}


window.addEventListener('DOMContentLoaded', function () {
    fetch(
        `https://api.thedogapi.com/v1/breeds?api_key=74a8d6a7-fb77-4451-999a-01a85de265cc`
        )
    .then(response => response.json())
    .then(data => {
        
        for (var i = 0; i < 15; i++) {
            randomIndex = Math.floor(Math.random() * 172);
            var listName = data[randomIndex]["name"];
            var listItem = document.createElement("li");
            listItem.setAttribute("id", randomIndex);
            
            listItem.innerHTML = "<button class='button'>" + listName + "</button>";
            breedListEl.appendChild(listItem);
            listItem.addEventListener("click", newBreed(data, listItem.id))
            

        }
        
    })
    
});




var apiKey = "AIzaSyD7nrLoufr8z3u4tc3PrAogdFA8EHy3ufI"
var video = ""

var videoSearch = function(key, search, maxResults){
   $("#videos").empty 
   $.get("https://www.googleapis.com/youtube/v3/search?key="+ key
        + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function(data){
            console.log(data)

        data.items.forEach(item => {
            video = `<iframe width="480" height="320" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder = "0" allowfullscreen></iframe>
            `
        console.log(video)

         $("#videos").append(video)
        })
        })
    }

