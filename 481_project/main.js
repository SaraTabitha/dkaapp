$(document).ready(function () {
    loadInfo = function () {
        $("#cwLbs").val(sessionStorage.cwLbs);
        $("#cwOz").val(sessionStorage.cwOz);
        $("#cwKg").val(sessionStorage.cwKg);
        $("#age").val(sessionStorage.age);
        $("#bwLbs").val(sessionStorage.bwLbs);
        $("#bwOz").val(sessionStorage.bwOz);
        $("#bwKg").val(sessionStorage.bwKg);
        $("#ageType").val(sessionStorage.ageType);
    };

    loadInfo();

    // convert lbs to kg
    $("#cwLbs").on('keyup input', function () {
        var input = $("#cwLbs").val();
        input = input.replace(/[^0-9.]/g, '');
        $("#cwLbs").val(input);

        if (input == ""){
            if ($("#cwOz").val() == "")
                $("#cwKg").val("");
            return; 
        }

        var pounds = parseFloat($("#cwLbs").val());
        var oz = parseFloat($("#cwOz").val());
        if (isNaN(oz))
            oz = 0;

        var kg = pounds + oz / 16;
        kg = kg * 0.45359237

        kg = kg.toFixed(2);
        $("#cwKg").val(kg);
    });

    // convert kg to lbs and oz
    $("#cwKg").on('keyup input', function ($event) {
        var input = $("#cwKg").val();
        input = input.replace(/[^0-9.]/g, '');
        $("#cwKg").val(input);

        if (input == ""){
            $("#cwOz").val("");
            $("#cwLbs").val("");
            return; 
        }

        var weight = parseFloat($("#cwKg").val()) * 2.20462;
        var lbs = Math.floor(weight);
        var oz = ((weight - lbs) * 16);
        $("#cwLbs").val(lbs.toFixed(2));

        $("#cwOz").val(oz.toFixed(2));
    });
    // convert oz to kg
    $("#cwOz").on('keyup input', function () {
        var input = $("#cwOz").val();
        input = input.replace(/[^0-9.]/g, '');
        $("#cwOz").val(input);

        if (input == ""){
            if ($("#cwLbs").val() == "")
                $("#cwKg").val("");
            return; 
        }

        var pounds = parseFloat($("#cwLbs").val());
        var oz = parseFloat($("#cwOz").val());
        if (isNaN(pounds))
            pounds = 0;

        var kg = pounds + oz / 16;
        kg = kg * 0.45359237

        kg = kg.toFixed(2);
        $("#cwKg").val(kg);
    });
    //convert lbs to kg
    $("#bwLbs").on('keyup input', function () {
        var input = $("#bwLbs").val();
        input = input.replace(/[^0-9.]/g, '');
        $("#bwLbs").val(input);

        if (input == ""){
            if ($("#bwOz").val() == "")
                $("#bwKg").val("");
            return; 
        }

        var pounds = parseFloat($("#bwLbs").val());
        var oz = parseFloat($("#bwOz").val());
        if (isNaN(oz))
            oz = 0;

        var kg = pounds + oz / 16;
        kg = kg * 0.45359237

        kg = kg.toFixed(2);
        $("#bwKg").val(kg);
    });
    //convert kg to lbs and oz
    $("#bwKg").on('keyup input', function () {
        var input = $("#bwKg").val();
        input = input.replace(/[^0-9.]/g, '');
        $("#bwKg").val(input);

        if (input == ""){
            $("#bwOz").val("");
            $("#bwLbs").val("");
            return; 
        }

        var weight = parseFloat($("#bwKg").val()) * 2.20462;
        var lbs = Math.floor(weight);
        var oz = ((weight - lbs) * 16);
        $("#bwLbs").val(lbs.toFixed(2));

        $("#bwOz").val(oz.toFixed(2));
    });
    //convert oz to kg
    $("#bwOz").on('keyup input', function () {
        var input = $("#bwOz").val();
        input = input.replace(/[^0-9.]/g, '');
        $("#bwOz").val(input);

        if (input == ""){
            if ($("#bwLbs").val() == "")
                $("#bwKg").val("");
            return; 
        }

        var pounds = parseFloat($("#bwLbs").val());
        var oz = parseFloat($("#bwOz").val());
        if (isNaN(pounds))
            pounds = 0;

        var kg = pounds + oz / 16;
        kg = kg * 0.45359237

        kg = kg.toFixed(2);
        $("#bwKg").val(kg);
    });

    $("#infoButton").click(function () {
        $("#info").removeClass("infoHidden").addClass("infoShow");
    });

    $("#saveInfo").click(function () {
        saveInfo();
        $("#info").removeClass("infoShow").addClass("infoHidden");

        //info does notweightctually save yet
    });

    saveInfo = function () {
        sessionStorage.cwLbs = $("#cwLbs").val();
        sessionStorage.cwOz = $("#cwOz").val();
        sessionStorage.cwKg = $("#cwKg").val();
        sessionStorage.age = $("#age").val();
        sessionStorage.bwLbs = $("#bwLbs").val();
        sessionStorage.bwOz = $("#bwOz").val();
        sessionStorage.bwKg = $("#bwKg").val();
        sessionStorage.ageType = $("#ageType").children("option:selected").val();
        populateTable();
    };

    //2bag dka 
    populateTable = function() {
        var kgWeight = sessionStorage.cwKg;
        var maintenanceFluid;
        if(kgWeight <= 10) {
            maintenanceFluid = kgWeight * 100;
        } else if(kgWeight <= 20) {
            maintenanceFluid = 1000 + (kgWeight-10) * 50;
        } else {
            maintenanceFluid = 1500 + (kgWeight-20) * 20;
        }
        if(maintenanceFluid > 2400) {
            maintenanceFluid = 2400;
        }
        var dropFactor = 20;
        var infusionRate = (maintenanceFluid/1440 * dropFactor);
        var insulinInfusionUnits = 0.1 * kgWeight;

        $(".fullRate").text(infusionRate.toFixed(2));
        $(".halfRate").text((infusionRate * .5).toFixed(2));
        $(".threeQuarterRate").text((infusionRate * .75).toFixed(2));
        $(".quarterRate").text((infusionRate * .25).toFixed(2));
        $(".zeroRate").text(0);
        $(".infusionRate").text(insulinInfusionUnits.toFixed(2));
    }

    infoPrompt = function(message) {
        $("#infoButton").click();
        alert(message);
    }


    // START Birth Weight Javascript
    function displayWeights(){
            // $("#displayBirthWeight").val(birthWeight.toFixed(1));
            $("#display_bwlbs").text(sessionStorage.bwLbs);
            $("#display_bwOz").text(sessionStorage.bwOz);
            $("#display_bwkgs").text(sessionStorage.bwKg);

            //$("#displayCurrentWeight").val(currentWeight.toFixed(1));
            $("#display_cwlbs").text(sessionStorage.cwLbs);
            $("#display_cwOz").text(sessionStorage.cwOz);
            $("#display_cwkgs").text(sessionStorage.cwKg);

    }
    
    bwOnLoad();
    function bwOnLoad (){
        displayWeights();
        if(sessionStorage.bwOz === "" || sessionStorage.bwOz === null || sessionStorage.bwOz==="undefined")
        {
            var birthWeight = sessionStorage.bwLbs;
        }else{
            var  birthWeight = parseFloat(sessionStorage.bwLbs) + parseFloat(sessionStorage.bwOz * 0.0625);
        }
              
        if(sessionStorage.cwOz === "" || sessionStorage.cwOz === null || sessionStorage.cwOz==="undefined")
        {
            var currentWeight = sessionStorage.cwLbs;
        }else{
            var currentWeight = parseFloat(sessionStorage.cwLbs) +parseFloat(sessionStorage.cwOz * 0.0625);
        }
            
        var difference = currentWeight - birthWeight;
            $("#DifferenceOutput").text(difference.toFixed(1));

        var PercentFromBirthWeight = (difference/birthWeight)* 100;
        
        if(PercentFromBirthWeight < 0){
            $("#DisplayPercentage").text(PercentFromBirthWeight.toFixed(1));
            $('#DisplayPercentage').css("color", "red");
        }else{
            $("#DisplayPercentage").text(PercentFromBirthWeight.toFixed(1));
            $('#DisplayPercentage').css("color", "green");
        }
    }
    //end birth weight javascript
/*
    $("#saveInfo").on("click", function(){
        displayWeights();
        if(sessionStorage.bwOz === "" || sessionStorage.bwOz === null || sessionStorage.bwOz==="undefined")
        {
            var birthWeight = sessionStorage.bwLbs;
        }else{
            var  birthWeight = parseFloat(sessionStorage.bwLbs) + parseFloat(sessionStorage.bwOz * 0.0625);
        }
              
        if(sessionStorage.cwOz === "" || sessionStorage.cwOz === null || sessionStorage.cwOz==="undefined")
        {
            var currentWeight = sessionStorage.cwLbs;
        }else{
            var currentWeight = parseFloat(sessionStorage.cwLbs) +parseFloat(sessionStorage.cwOz * 0.0625);
        }
            
           
        var difference = currentWeight - birthWeight;
            $("#DifferenceOutput").val(difference.toFixed(1));

        var PercentFromBirthWeight = (difference/birthWeight)* 100;
        
        if(PercentFromBirthWeight < 0){
            $("#DisplayPercentage").val(PercentFromBirthWeight.toFixed(1));
            $('#DisplayPercentage').css("color", "red");
        }else{
            $("#DisplayPercentage").val(PercentFromBirthWeight.toFixed(1));
        }

        });*/
    
    // START Glasgow Coma Javascript

    function convertAge(val, type){
        //returns true if val >= 2; returns false if val < 2
        if(type == 'years'){
            if(val >= 2){
                return true; 
            }
            else if(val < 2){
                return false;
            }
        }
        else if(type == 'months'){
            //24 months = 2 years
            if(val >= 24){
                return true;
            }
            else if( val < 24){
                return false;
            }
        }
        else if(type == 'days'){
            //365 * 2 = 730 days = 2 years
            if(val >= 730){
                return true;
            }
            else if(val < 730){
                return false
            }
        }
    }

    function checkAge(){
        var val = $("#age").val();
        var type = $("#ageType").val();

        console.log("age: " + val + " " + type);
        if(val == "" || type == null){
            $("#no-age-warning").css("display", "initial");
            $("#younger").css("display", "none");
            $("#older").css("display", "none");
            $("#glasgow-submit").css("display", "none");
            $("#age-copy").text("");
        }
        else{
            $("#no-age-warning").css("display", "none");
            $("#age-copy").text(val + " " + type);

            if(convertAge(val, type)){
                //greater than or equal to 2 years old
                $("#younger").css("display", "none");
                $("#older").css("display", "initial");
                $("#glasgow-submit").css("display", "initial");
            }
            else{
                //less than 2 years old
                $("#younger").css("display", "initial");
                $("#older").css("display", "none");
                $("#glasgow-submit").css("display", "initial");

            }
        }
    }
    checkAge();
    $("saveInfo").click(function(){
        checkAge();
    });
    
    $("#glasgow-form").submit(function(){
        // prevents page from refreshing when the submit button is pressed
        return false;
    }); 

    $("#glasgow-submit").click(function(){
        var val = $("#age").val();
        var type = $("#ageType").val();

        if(convertAge(val, type)){
            var eye = $("#eye-opening-response2").val();
            var verbal = $("#verbal-response2").val();
            var motor = $("#motor-response2").val();
        }
        else{
            var eye = $("#eye-opening-response").val();
            var verbal = $("#verbal-response").val();
            var motor = $("#motor-response").val();
        }
        
        console.log(eye + ", " + verbal +  ", "  + motor );
        if(eye == "" ||verbal == "" || motor == "" ){
            //if any are empty
            $("#glasgow-response-error").css("display", "initial");
        }
        else{
            $("#glasgow-response-error").css("display", "none");
            var score = parseInt(eye) + parseInt(verbal) + parseInt(motor);
            $("#glasgow-score-here").text(score);
        }
    });


    // Page colors set here
    // var bodyColor = "white";
    // var textColor = "black";
    // var sectionBackgroundColorA = "white";
    // var sectionBackgroundColor = "white";
    // var selectedColor = "burlywood";
    // var goodColor = "rgb(144,238,144,0.75)";
    // var comaColor = "rgb(255,255,0,0.75)";
    // var ageNum = sessionStorage.age;
    // var ageUnit = sessionStorage.ageType;
    // var age = ageNum + "," + ageUnit;
    // checkIfUpdate();

    // // Set all element colors based on defined incoming values
    // $('.gcBody').css("background-color", bodyColor);
    // $('.gcBody').css("color", textColor);
    // $('.selection').css("background-color", sectionBackgroundColorA);
    // $('.gcTable').css("background-color", sectionBackgroundColor);
    // $('.gcNum').css("background-color", sectionBackgroundColor);
    // $('.gcNum').css("color", textColor);
    // $('.gcResult').css("background-color", sectionBackgroundColor);
    // $('.gcResult').css("color", textColor);

    // function gcCalculate() {
    //     var g1 = getGroupValues("group1").split(',');
    //     var g2 = getGroupValues("group2").split(',');
    //     var g3 = getGroupValues("group3").split(',');
    //     if (parseInt(g1[2]) > 0 && parseInt(g2[2]) > 0 && parseInt(g3[2])) {
    //         var value = parseInt(g1[2]) + parseInt(g2[2]) + parseInt(g3[2]);
    //     } else {
    //         var value = 0;
    //     }
    //     if (value >= 3 && value < 8) {
    //         $('#output').css("background-color", comaColor);
    //         $('#outputResult').css("background-color", comaColor);
    //     } else if (value >= 8) {
    //         $('#output').css("background-color", goodColor);
    //         $('#outputResult').css("background-color", goodColor);
    //     } else {
    //         $('#output').css("background-color", sectionBackgroundColor);
    //         $('#outputResult').css("background-color", sectionBackgroundColor);
    //     }
    //     if (value >= 8) {
    //         $('#outputResult').val("Good chance for recovery");
    //     } else if (value >= 3 && value <= 5) {
    //         $('#outputResult').val("Potentially fatal");
    //     } else if (value > 5 && value < 8) {
    //         $('#outputResult').val("Recovery may be possible");
    //     } else {
    //         $('#outputResult').val("");
    //     }
    //     if (value >= 3) {
    //         $('#output').val(value);
    //     } else {
    //         $('#output').val(0);
    //     }
    // }
    // function getGroupValues(groupName) {
    //     var group = "input[name='" + groupName + "']:checked";
    //     var val = $(group.toString()).val();
    //     if (typeof val != "undefined") {
    //         return val;
    //     } else {
    //         return val = '"","",0';
    //     }
    // }

    // // Functionality for age input collection
    // $('.age-num').on('input', ageNumberChange);
    // $('.age-unit').change(function () {
    //     $("select option:selected").each(function () {
    //         ageUnit = $(this).text();
    //     });
    //     convertUnit();
    //     age = ageNum + "," + ageUnit;
    //     sessionStorage.age = ageNum;
    //     sessionStorage.ageType = ageUnit;
    //     groupUpdate();
    // });
    // function convertUnit() {
    //     if (ageUnit === "Months") {
    //         ageUnit = "months";
    //     } else if (ageUnit === "Years") {
    //         ageUnit = "years";
    //     } else if (ageUnit === "Days") {
    //         ageUnit = "days";
    //     }
    // }
    // function ageNumberChange() {
    //     ageNum = $(this).val();
    //     convertUnit();
    //     age = ageNum + "," + ageUnit;
    //     sessionStorage.age = ageNum;
    //     sessionStorage.ageType = ageUnit;
    //     groupUpdate();
    // }
    // function checkIfUpdate() {
    //     var input = age.split(',');
    //     if (input[0] != "" && input[1] != "") {
    //         groupUpdate();
    //     }
    // }

    // // Change verbal response fields based on age (<5 years)
    // function groupUpdate() {
    //     $('.group').each(function () {
    //         var input = age.split(',');
    //         var num = parseInt(input[0]);
    //         var unit = input[1].toString();
    //         if (unit === "months" || unit === "days") {
    //             if (num >= 0 && num <= 23) {
    //                 $("#o1").text("Smiles or coos appropriately");
    //                 $("#o2").text("Cries and consolable");
    //                 $("#o3").text("Persistent inappropriate crying &/or screaming");
    //                 $("#o4").text("Grunts or is agitated or restless");
    //                 $("#o5").text("No response");
    //             }
    //         } else if (unit === "years") {
    //             if (num >= 2 && num <= 5) {
    //                 $("#o1").text("Appropriate words or phrases");
    //                 $("#o2").text("Inappropriate words");
    //                 $("#o3").text("Persistent cries and/or screams");
    //                 $("#o4").text("Grunts");
    //                 $("#o5").text("No response");
    //             } else if (num > 5) {
    //                 $("#o1").text("Oriented");
    //                 $("#o2").text("Confused conversation, but able to answer questions");
    //                 $("#o3").text("Inappropriate responses, words discernible");
    //                 $("#o4").text("Incomprehensible speech");
    //                 $("#o5").text("None");
    //             }
    //         }
    //     });
    // }
    // // Highlight row and select radio on row, label, or radio select
    // $(".selection").click(function (e) {
    //     var $radio = $(this).find('input:radio');
    //     if (!$(e.target).is('input:radio')) {
    //         $radio.prop('checked', !$radio.prop('checked'));
    //         if ($radio.is(':checked')) {
    //             if ($(e.target).is('label')) {
    //                 $(e.target).parent().parent().children().css("background-color", sectionBackgroundColorA);
    //                 $(e.target).parent().css("background-color", selectedColor);
    //             } else {
    //                 $(e.target).parent().children().css("background-color", sectionBackgroundColorA);
    //                 $(e.target).css("background-color", selectedColor);
    //             }
    //         } else {
    //             if ($(e.target).is('label')) {
    //                 $(e.target).parent().parent().children().css("background-color", sectionBackgroundColorA);
    //                 $(e.target).parent().css("background-color", sectionBackgroundColorA);
    //             } else {
    //                 $(e.target).parent().children().css("background-color", sectionBackgroundColorA);
    //                 $(e.target).css("background-color", sectionBackgroundColorA);
    //             }
    //         }
    //     } else {
    //         $(e.target).parent().parent().children().css("background-color", sectionBackgroundColorA);
    //         $(e.target).parent().css("background-color", selectedColor);
    //     }
    //     gcCalculate();
    // });
    // END Glasgow Coma Javascript
})
