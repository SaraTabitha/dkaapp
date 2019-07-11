$(function() {
    if(sessionStorage.cwKg == "undefined" || sessionStorage.cwKg == "" ) {
        infoPrompt();
    } else {
        $("#dka-warning").css("display", "none");
        $("#dka-table").css("display", "table");
        populateTable(); 
    }

    $("#saveInfo").click(function() {
        if(sessionStorage.cwKg == "undefined" || sessionStorage.cwKg == "") {
            infoPrompt();
        }
        else{
            $("#dka-warning").css("display", "none");
            $("#dka-table").css("display", "table");
        }
    })
})