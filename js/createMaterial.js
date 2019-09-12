$(document).ready(function () {
    var plantList = JSON.parse(sessionStorage.getItem("plantList"));
    $("#name").val(sessionStorage.getItem("createNewMaterial"));

    // console.log(plantList.d.results);

    for (var i = 0; i < plantList.d.results.length; i++) {
        $("#storageLocation").append(new Option(plantList.d.results[i].SlocationText, plantList.d.results[i].SlocationText));

        $("#plant").append(new Option(plantList.d.results[i].PlantText, plantList.d.results[i].PlantText));
    }


    $("#createMaterialButton").on("click", function (event) {
        event.preventDefault()
        var createform = document.getElementById("createMaterialForm");
        console.log(createform.elements);
    });


});