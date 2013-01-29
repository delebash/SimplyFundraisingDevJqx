/**
 * Gets querystring parameter value that is after the hash tag
 * @param {String} sParam                querystring parameter whose value you want.
 * @return {String}                      returns value of sParam
 */
function getQuerystringParamsFromHash(sParam) {
    //var sPageURL = window.location//search.substring(1);
    var sPageURL = document.URL.split('?')[1];
    if ( typeof sPageURL === "undefined") {
        return;
    }
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

/**
 * Function to get all validations erros from KendoUI.Validator and add to errormsg div
 * @param {Object} validator    KendoUI validator object that holds the errors
 */
function displayErrors(validator) {
    var errorList = $('ul.errorMessages');
    errorList.empty();
    var myerrors = validator._errors;
    var count = 0;
    $.each(myerrors, function(field, errmsg) {
        //Set focus on first field
        if (count === 0) {
            $('#' + field).focus();
            count++;
        }
        //Set css
        $('#' + field).css({
            'box-shadow' : '0 0 5px #d45252',
            'border-color' : '#b03535'
        });
        var titlerrmsg = $('#' + field).attr("title");
        var friendly = $('#' + field).attr("data-myfriendly");
        errorList.append('<li><span>' + friendly + ' is</span> ' + titlerrmsg + '</li>');
    });
    errorList.show();
}

/**
 * Function to setup css validation classes for OnBlur event of inputs
 * @param {String} myForID  ID of form to setup validation
 * @return {Object}         Returns a new KendoUI.Validator for myFormID
 */
function setupValidationBlur(myFormID) {
    var validator;
    $('input:not([type=button]').blur(function(event) {

        var isValid = event.target.checkValidity();
        if (isValid === false) {

            $(event.target).css({
                'box-shadow' : '0 0 5px #d45252',
                'border-color' : '#b03535'
            });
        } else {
            $(event.target).css({
                'box-shadow' : '0 0 5px #5cd053',
                'border-color' : '#28921f'
            });
        }
    });

    if (myFormID.jquery) {//KendoUI object is being passed
        validator = myFormID.kendoValidator().data("kendoValidator");
    } else {//String id passed
        validator = $('#' + myFormID).kendoValidator().data("kendoValidator");
    }
    return validator;
}

/**
 * Function to determine if form is in add or edit mode based on ID and global DataRows Object
 * Also checks if form name is "dataform" if not we shouldn't be doing data operations on this form
 * @param {String} myForID      ID of form to setup validation
 * @return {Boolean}            Returns true if form is in edit mode false if add new
 */
function myFormIsEdit(myForm) {
    var id = getQuerystringParamsFromHash('ID');
    var isEdit = null;
    //Make sure we are on a form using a standard of dataform for the id
    if (myForm !== "dataform") {
        return "Form is not a dataform";
    }
    //Determine if Add or Edit'
    //DataRows is a global object filled from listview datagrid page represents selected grid row

    if ( typeof id === "undefined" || typeof DataRows === "undefined")//New
    {
        isEdit = false;
    } else {
        isEdit = true;
    }
    return isEdit;
}

function hideEditOnlyDiv() {
    //Hide all elements that require an existing record
    $('*[data-myeditonly="true"]').hide();
}

//Hack to re-enable button if user changes 1 element and clicks save
// function enableDisabledButtons() {
    // // find the disabled elements
    // var $disabled = $("input:disabled");
// 
    // // loop through each of the disable elements and create an overlay
    // $disabled.each(function() {
        // // get the disabled element
        // var $self = $(this)
        // // get it's parent label element
        // , $parent = $self.closest("span")
        // // create an overlay
        // , $overlay = $("<div />");
// 
        // // style the overlay
        // $overlay.css({
            // // position the overlay in the same real estate as the original parent element
            // position : "absolute",
            // top : $parent.position().top,
            // left : $parent.position().left,
            // width : $parent.outerWidth(),
            // height : $parent.outerHeight(),
            // zIndex : 10000
            // // IE needs a color in order for the layer to respond to mouse events
            // ,
            // backgroundColor : "#fff"
            // // set the opacity to 0,      so the element is transparent
            // ,
            // opacity : 0
        // })
        // // attach the click behavior
        // .click(function() {
            // // trigger the original event handler
            // //if ($('#StartButton').is(':disabled') == false)
            // if (!($self).is(':disabled')) {
                // return $self.trigger("click");
            // }
        // });
// 
        // // add the overlay to the page
        // $parent.append($overlay);
    // });
// 
// }
