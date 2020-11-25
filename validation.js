/*File: validation.js
Connor Gonthier
connor_gonthier@student.uml.edu
UMass Lowell student taking course 91.61 GUI Programming I
My multiplication table made via Javascript Enhanced with jQeuery part 1, some Table sources have been cull and left in hw5 comments
This was updated on 11/25/2020 with slider and tab functionality

*/
/*
inspiration for some of the rules comes from :https://stackoverflow.com/questions/1260984/jquery-validate-less-than
This Video series usesd to learn basic of jQuery validation:
https://www.youtube.com/watch?v=zQUbb2ZtdIc&list=PL5ze0DjYv5DaAm5eC2chbTK1Y6uoTUtZ9&index=4
Document start */

var tabNumber = 0; // tab number vairable uses for tabs management

$(document).ready(function(){
  //adding Methods for rules
  // Rules inspiration inspiration for some of the rules comes from :https://stackoverflow.com/questions/1260984/jquery-validate-less-than
  // Crafting the rules to check less than or greater than and leaving messages to be overwirrten later.
  //less than

  jQuery.validator.addMethod('lessThan', function(value, element, param){
    return this.optional(element) || $(param).val() == '' || parseInt(value) <= parseInt($(param).val());
  },'    Value is not less than the Maximum Value');

  //Greater than
  jQuery.validator.addMethod('greaterThan', function(value, element, param){
    return this.optional(element) || $(param).val() == '' || parseInt(value) >= parseInt($(param).val());
  },'    Value is not greater than the Minimum  Value');

// used https://www.youtube.com/watch?v=xNSQ3i-BWMo&list=PL5ze0DjYv5DaAm5eC2chbTK1Y6uoTUtZ9&index=1
// to craft these sections with help from stack overflow:https://stackoverflow.com/questions/15060292/a-simple-jquery-form-validation-script
  $('#forumInput').submit(function(e){
    e.preventDefault();
  }).validate({
    rules: {
      //here im setting up the required rules to be validated on each input
      minimumRow:{
        required: true,  // required it to not be empty
        number: true,   // requirs input to be a number
        range: [-100,100], // requires the number to be with in a range of -150 to 150
        lessThan: "#maxRow" // uses my custom lessThan method and requires the valeus to be lessThan the #maxRow value
      },
      maximumRow:{
        required: true,
        number: true,
        range: [-100,100],
        greaterThan: "#minRow" // Just like above but now the greater than method and making sure its greather than the #minRow Value
      },
      minimumColumn:{
        required: true,
        number: true,
        range: [-100,100],
        lessThan: "#maxColumn"
      },
      maximumColumn:{
        required: true,
        number: true,
        range: [-100,100],
        greaterThan: "#minColumn"
      }
    },
    messages:{
      // here just setting up the messages to  be custom made for each input for maximum clarity and feedback
      minimumRow:{
        required: '  Entering a Minimum Row number is required',
        number: '    Error: Only numbers are accepted',
        range: '    Value must be within a range from -100 to 100',
        lessThan:'    Minimum Row Value must be less than Maximum Row Value'

      },
      maximumRow:{
        required:'   Entering a Maximum Row number is required',
        number: '    Error: only numbers are accepted',
        range: '    Value must be within a range from -100 to 100',
        greaterThan:'    Maximum Row Value must be greater than Minimum Row Value'
      },
      minimumColumn:{
        required:'   Entering a Minimum Column number is required',
        number: '    Error: only numbers are accepted',
        range: '    Value must be within a range from -100 to 100',
        lessThan:'    Minimum Row Value must be less than Maximum Column Value'
      },
      maximumColumn:{
        required:'   Entering a Maximum Column number is required',
        number: '    Error: only numbers are accepted',
        range: '    Value must be within a range from -100 to 100',
        greaterThan:'    Maximum Row Value must be greater than Minimum Column Value'
      }
    },
    // this handles what happends when my "submit" input is presses
    submitHandler: generate_multitable
  });
/*Old code
submitHandler: function(form) {
  // here we chech if the form is valid and if so it calls my function to generate the multipication table
  if($('#forumInput').valid()){
    generate_multitable();
  }
  // else it returns false so it doesnt call the func and waits for you to fix the values and resubmit
  else {
    return false;
  }
}

*/


  //Here is beggining of SLiders for HW7
  $('#sliderMinR').slider({
    min:-100,
    max:100,
    slide: function(event,ui) {
      $('#minRow').val(ui.value).change();
    }
  });
// Here im setting the min and max of sliders to -100 to 100 to show a reasobanble range
//that makes the slider still percise
// The slide function updates the input box number with every change to the slider which makes it easier to select correct number
// as oppsed to change function

  $('#sliderMaxR').slider({
    min:-100,
    max:100,
    slide: function(event,ui) {
      $('#maxRow').val(ui.value).change();
    }
  });

  $('#sliderMinC').slider({
    min:-100,
    max:100,
    slide: function(event,ui) {
      $('#minColumn').val(ui.value).change();
    }
  });

  $('#sliderMaxC').slider({
    min:-100,
    max:100,
    slide: function(event,ui) {
      $('#maxColumn').val(ui.value).change();
    }
  });


// two way binding reference :
//https://infoheap.com/jquery-ui-slider-and-input-text-box-two-way-binding/

//sliderMinR
$("#minRow").change(function(){
var oldvalue1=$("#sliderMinR").slider("option", "value");
var newvalue1=$(this).val();

if (isNaN(newvalue1) || newvalue1 < -100 || newvalue1 > 100) {
      $("#sliderMinR").val(oldvalue1);
    } else {
      $("#sliderMinR").slider("option", "value", newvalue1);
    }
    // Corrects vallidation so that only submits and checks when there is an input value in bot min/max
    if ($('#maxRow').val()!=''){
      $("#forumInput").validate().element("#minRow");
      $("#forumInput").validate().element("#maxRow");
    }
    if($("#maxColumn").val()!='' && $("#minColumn").val() !='' && $("#minRow").val() !='' && $("maxRow").val() !=''){
    $("#forumInput").submit();
  }
});

//sliderMaxR
$("#maxRow").change(function(){
var oldvalue2=$("#sliderMaxR").slider("option", "value");
var newvalue2=$(this).val();

if (isNaN(newvalue2) || newvalue2 < -100 || newvalue2 > 100) {
      $("#sliderMaxR").val(oldvalue2);
    } else {
      $("#sliderMaxR").slider("option", "value", newvalue2);
    }
    // Corrects vallidation, so that only submits and checks when there is an input value in bot min/max
    if ($('#minRow').val()!=''){
      $("#forumInput").validate().element("#maxRow");
      $("#forumInput").validate().element("#minRow");
    }
    if($("#maxColumn").val()!='' && $("#minColumn").val() !='' && $("#minRow").val() !='' && $("maxRow").val() !=''){
    $("#forumInput").submit();
  }

});

//sliderMinC
$("#minColumn").change(function(){
var oldvalue3=$("#sliderMinC").slider("option", "value");
var newvalue3=$(this).val();

if (isNaN(newvalue3) || newvalue3 < -100 || newvalue3 > 100) {
      $("#sliderMinC").val(oldvalue3);
    } else {
      $("#sliderMinC").slider("option", "value", newvalue3);
    }
    // Corrects vallidation, so that only submits and checks when there is an input value in bot min/max
    if ($('#maxColumn').val()!=''){
      $("#forumInput").validate().element("#maxColumn");
      $("#forumInput").validate().element("#minColumn");
    }
    if($("#maxColumn").val()!='' && $("#minColumn").val() !='' && $("#minRow").val() !='' && $("maxRow").val() !=''){
    $("#forumInput").submit();
  }
});

//sliderMaxC
$("#maxColumn").change(function(){
var oldvalue4=$("#sliderMaxC").slider("option", "value");
var newvalue4=$(this).val();

if (isNaN(newvalue4) || newvalue4 < -100 || newvalue4 > 100) {
      $("#sliderMaxC").val(oldvalue4);
    } else {
      $("#sliderMaxC").slider("option", "value", newvalue4);
    }
    if ($('#minColumn').val()!=''){
      $("#forumInput").validate().element("#minColumn");
      $("#forumInput").validate().element("#maxColumn");
    }
    if($("#maxColumn").val()!='' && $("#minColumn").val() !='' && $("#minRow").val() !='' && $("maxRow").val() !=''){
    $("#forumInput").submit();
  }
});


// End of my two way binding stuff
//Tabs Stuff reference: https://api.jqueryui.com/1.9/tabs/
var index=0;
$("#newTabButton").click(function(){
//dont create tab on improper inputs
var flag = true;
if($('#forumInput').valid()){
  flag =false;
}
if(flag)
return;


index++;
tabNumber= "#" + index;

// tab header values
var a = Number(document.getElementById("minRow").value);
var b = Number(document.getElementById("maxRow").value);
var c = Number(document.getElementById("minColumn").value);
var d = Number(document.getElementById("maxColumn").value);

// uses tab header values to create tab header on bbutton click
$("#myTabs ul").append("<li><a href='#"+ index +"'> Tab " + index + " " + a + "," + b + "," + c + "," + d + "</a> <input type= 'checkbox' class=\"checkbox_check\" /> </li>");
//Div that pertains to the content of the tab
$("#myTabs").append("<div id='" + index + "'>" + "</div>");
//creatse tab Tabs
$("#myTabs").tabs();
//Refresh tabs
$("#myTabs").tabs("refresh");
//set the active tab
$("#myTabs").tabs("option", "active", -1 );

//submit the form properly
if($("#maxColumnNumber").val()!='' && $("#minColumnNumber").val() !='' && $("#minRowNumber").val() !='' && $("maxRowNumber").val() !=''){
$("#inputForm").submit();
}
})

//Delete tab button
// reference : https://stackoverflow.com/questions/7960208/jquery-if-checkbox-is-checked
$("#deleteTabButton").click(function(){
  $("#myTabs ul li").each(function(){
   if ($(this).find(".checkbox_check").is(':checked')){
   var panelId = $(this).closest("li").remove().attr("aria-controls");
   $("#" + panelId).remove();
   $("#tabs").tabs("refresh");
   }
  })
});

}); //end jQuery

// the Function actuall generating my multiplication table, untouched from HW5
function generate_multitable() {
  console.log("Generating...");

  //Here delete container holding table if it exists
  if(document.querySelector(".tContainer")){
    var remove= document.querySelector(".tContainer")
    var parent1= remove.parentElement;
    parent1.removeChild(remove);
  }

  //im parseInt on the values so they are read in as ints
  //not string of int specificall bc of negatives
  var minR = parseInt(document.getElementById('minRow').value);
  var maxR = parseInt(document.getElementById('maxRow').value);
  var minC = parseInt(document.getElementById('minColumn').value);
  var maxC = parseInt(document.getElementById('maxColumn').value);

//Error Checking
/*
//checking that the taken in values are Valid Ints
if ((Number.isInteger(minR)&&Number.isInteger(minC)&&Number.isInteger(maxC)&&Number.isInteger(maxR))==false){
  document.getElementById("ErrorOutput").innerHTML='All values must be valid integers';
  return 0;
}
//Checking that the Min Values are less than or equal to the max values
if (minR > maxR ){
  document.getElementById("ErrorOutput").innerHTML='Enter a Minimum Row value that is less than or equal to the Max row value';
  return 0;
}
if (minC > maxC ){
  document.getElementById("ErrorOutput").innerHTML='Enter a Minimum Column value that is less than or equal to the Max Column value';
  return 0;
}
*/
  //Error Checking End

  // row column lengths + 2 to account for the
  // correct lenth + outer edge to show values
  //ie 5-3 =2, [3 4 5] = 3,so + 1 and +1  for the guiding values
  var rlength = ((maxR - minR)+2)
  var clength = ((maxC - minC)+2)

 // arrays to hold row values
  var rarr =[];
  for(x=minR; x <=maxR; x++){
    rarr.push(x);
  }
// arrays to hold column values
  var carr =[];
  for(x=minC; x <=maxC; x++){
      carr.push(x);
  }

/* Style of crafting table and code im using is cited here::
https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
*/
  // get the reference for the body
  var body = document.getElementsByTagName("body")[0];
  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");
  var wrapper = document.createElement("div");
  wrapper.classList.add("tContainer")

  // creating all cells
  for (var i = 0; i < rlength; i++) {
    // creates a table row
    var row = document.createElement("tr");
    row.setAttribute("id","mtRow")
    //
    for (var j = 0; j < clength; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row

      //Here allows me to enter in the first cell that is blank
      if(i ==0 && j ==0){
        var cell = document.createElement("td");
        var cellText = document.createTextNode('');
        cell.setAttribute("id","mtCell");
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      //here allows me to end the guiding values for the row
       else if (i==0 ) {

        var cell = document.createElement("td");
        var cellText = document.createTextNode(carr[j-1]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      //here allows me to end the guiding values for the row column
       else if (j==0 ) {

        var cell = document.createElement("td");
        var cellText = document.createTextNode(rarr[i-1]);
        cell.setAttribute("id","mtCellC");
        cell.appendChild(cellText);
        row.appendChild(cell);

      }
      //here filling in the rest of the table
      else{
        var cell = document.createElement("td");
        var cellText = document.createTextNode(rarr[i-1]*carr[j-1]);
        cell.setAttribute("id","mtCellG");
        cell.appendChild(cellText);
        row.appendChild(cell);
     }
    }
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);

  wrapper.appendChild(tbl)
  // appends <table> into <body>
  body.appendChild(wrapper);

  $("#myTabs div:visible").append(wrapper); // appends table to tab
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
  tbl.setAttribute("id","multiTable");

}
