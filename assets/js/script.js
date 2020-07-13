var getBreed = function() {
    fetch (
        `https://api.thedogapi.com/v1/breeds?api_key=74a8d6a7-fb77-4451-999a-01a85de265cc`
    )
    .then (response => response.json())
    .then (data => {
        console.log(data);
    })
};