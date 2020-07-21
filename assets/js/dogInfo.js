var breedListEl = document.querySelector("#breedList")

 //pull object from session storage
var breedobject = JSON.parse(window.sessionStorage.getItem('breedinfo'));
console.log(breedobject);

// set all info to the page on load
var loadDogInfo = function () {
    // fill dog info area
    document.getElementById('dogname').innerText = breedobject.name;
    document.getElementById('height').innerText = "Height: " + breedobject.height.imperial + " inches";
    document.getElementById('weight').innerText = "Weight: " + breedobject.weight.imperial + " pounds";
    document.getElementById('lifespan').innerText = "Lifespan: " + breedobject.life_span;
    // we not always have temperament in object
    if (breedobject.temperament) {
        document.getElementById('temperament').innerText = "Temperament: " + breedobject.temperament;
    }
};

var discoverOtherBreed = function () {
    fetch(
        `https://api.thedogapi.com/v1/breeds?api_key=74a8d6a7-fb77-4451-999a-01a85de265cc`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
          

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
                    
                    sessionStorage.setItem('breedinfo', JSON.stringify(data[targetindex]));

                    window.location.href = "./doginfo.html";
                };

            };

        });
};

    
var wikiInfo = function() {
    var fulldogname = breedobject.name.split(' ').join('%20')

    fetch(
        "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=1&prop=pageimages%7Cextracts&pilimit=20&exintro=5&explaintext=4&exsentences=4&exlimit=max&origin=*&gsrsearch=" + fulldogname

    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var keys = Object.keys(response.query.pages);
            var a = response.query.pages[keys[0]].thumbnail.source;
            var b = response.query.pages[keys[0]].extract;
            console.log(a)
            console.log(b);
            document.getElementById('info-card').innerText = fulldogname
            document.getElementById('dogimage').setAttribute("src", a);
            document.getElementById('dogtext').innerText = b;
        })
};


    

// videoSearch(apiKey, breed, 1)
var apiKey = "AIzaSyAvPBSIiIgTwoAA8XqPnDNwOsaN0_9ckZA"
var breed = breedobject.name
var video = ""

var videoSearch = function (key, search, maxResults) {
    var breedobject = JSON.parse(window.sessionStorage.getItem('breedinfo'));
    $("#videos").empty
    $.get("https://www.googleapis.com/youtube/v3/search?key=" + key
        + "&type=video&part=snippet&order=viewCount&maxResults=" + maxResults + "&q=" + search, function (data) {
            console.log(data)

    //         data.items.forEach(item => {
                // video = `<iframe width="480" height="320" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder = "0" allowfullscreen></iframe>
            // `

                // console.log(video)
                

                //video placement

   

                video = `<iframe width="800" height="480" src="http://www.youtube.com/embed/GBZnnOe_n5g" frameborder = "0" allowfullscreen></iframe>`   
         
                $("#videos").append(video)

                resultsLoop()
            })
        // })
}

// var resultsLoop = function(data) {

//     // $.each(data.items, function(i, item){

//         // var thumb = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.insider.com%2Fmost-popular-dog-breeds-2019-google-search&psig=AOvVaw2z8IDhLdAw2TjhDayq-Y0w&ust=1595359798820000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjlq8PI3OoCFQAAAAAdAAAAABAJ" //item.snippet.thumbnail.medium.url; // change src
//         // var title = "Title" //item.snippet.title; //change in h4 tags
//         // var desc = "I am a description" //item.snippet.description.substring(0,100) //change in p tag


//         // $('#videos').append(
//         //     ` <article>
//         //         <img src="${thumb}" atl="" class = "thumb">
//         //         <div class = "details">
//         //             <h4>${title}</h4>
//         //             <p>${desc}</p>
//         //         </div>
//         //     </article>                    
//         //     `
//         // )
//     // })
// }

loadDogInfo();
discoverOtherBreed();
wikiInfo();