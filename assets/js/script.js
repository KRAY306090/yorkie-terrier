var getBreed = function() {
    fetch (
       // `https://api.thedogapi.com/v1/breeds?api_key=74a8d6a7-fb77-4451-999a-01a85de265cc`
       `https://api.petfinder.com/v2/animals?type=dog&page=2grant_type=client_credentials&client_id=oXqZiwGXCkCICaZDcZXyeMbEJAKNmPPC7021p3fc9oBz39rc6A&client_secret=RZuNYKaa5Qeb3BaKCyb2sCFG4okvJpPFNpvmejzA`
    )
    .then (response => response.json())
    .then (data => {
        console.log(data);
    })
};