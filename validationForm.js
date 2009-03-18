/*
ValidationForm for AIESEC SPUEF website
URL: http://www.aiesec.spb.ru
Version: 1.01
Date: 13.09.2008
Author: Mijail Cisneros
e-mail: mijail.cisneros@aiesec.net
Browsers: Firefox, Opera, Safari, Seamonkey
License: GPL v3

TODO: 
- Refactoring
*/

// Input fields which should be checked for Patterns
var validatePattern = new Object();
validatePattern['phone'] = 'true';
validatePattern['email'] = 'true';

// Form validation
function validateForm(form){
	var submit = true; // The result of the validation
	//alert('Start Working on ' + form.elements.length);
	// Check every element of the form
	for(var i=0; i < form.elements.length; i++) {
		//alert('Got into the elements, checking: ' + form.elements[i].id);
		if(document.getElementById(form.elements[i].id+'Err')) {
			//alert('found what to validate');
			// Check if a given element has to be check for patterns (i.e: email - phone)
			if(validatePattern[form.elements[i].id] == 'true'){
				//alert('found Pattern to validate');
				if(!isPattern(form.elements[i].id)){
					submit = false;
					showErr(form.elements[i].id);
				} else {
					hideErr(form.elements[i].id);
				}
			} else { // Check for standart values
				//alert('Normal check to validate');
				if( !check(form.elements[i].id) ) {
					submit = false;
					showErr(form.elements[i].id);
				} else {
					hideErr(form.elements[i].id);
				}
			}
		}	
	}
	return submit;
}


// Pattern check
function isPattern(id){
	switch(id){
		case 'phone':
			return checkPhone(id);
			break;
		case 'email':
			return checkEmail(id);
			break;
		default: 
			return true;
	}
}

function checkPhone (id) {
	// Check if the phone field is not empty
	if (hasValue(document.getElementById(id).value)){
		var phone = document.getElementById(id).value.replace(/[\(\)\.\-\ ]/g, ''); // remove extra characters from the field
		if (isNaN(parseInt(phone)) || phone.length < 7 ) { // Check for illegal character and length of the phone (Min. length 7 numbers)
			return false;
		}
	}
	else return false;
	
	return true;
}

function checkEmail (id) {
	var emailFilter=/^.+@.+\..{2,3}$/;
	var illegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/
	// Check if email field is not empty
	if (hasValue(document.getElementById(id).value)){
		var email = document.getElementById(id).value;
		// Check for correct email and if it does not contain illegal characters.
		if (!(emailFilter.test(email)) || email.match(illegalChars)) { 
			return false;
		}
	}
	else return false;
	
    return true;
}


// Normal check
function check(field){
  switch(document.getElementById(field).type) {
    case 'checkbox':
      return checkCheckbox(field);
      break;
	case 'text':
      return checkText(field);
      break;
    case 'select-one':
    case 'select-multiple':
      return checkSelect(field);
      break;
    case 'textarea':
      return checkTextArea(field);
      break;
	case 'radio':
	  return checkRadio(field);
	  break;
    default:
      return true;
  }
}

function hasValue(value){
  if(value.length > 0) {
    return true;
  }
  return false;
}
function checkCheckbox(field){
  return document.getElementById(field).checked;
}
function checkText(field){
  return hasValue(document.getElementById(field).value);
}
function checkSelect(field){
  var elem = document.getElementById(field);
  return  hasValue(elem.options[elem.selectedIndex].value);
}
function checkTextArea(field){
  return hasValue(document.getElementById(field).innerHTML);
}
function checkRadio(field){
	var radio = document.getElementById(field);
	var radios = radio.form[radio.id];
	for (var i=0;i<radios.length;i++) {
		if (radios[i].checked) return true;
	}
	return false;
}

// Show or hide error message
function showErr(field){
  show_field(field+'Err');
  document.getElementById(field).style.border = '2px solid #f00';
}
function hideErr(field){
  hide_field(field+'Err');
  document.getElementById(field).style.border = '';
}
function show_field(id){
  document.getElementById(id).style.display = 'block';
}
function hide_field(id){
  document.getElementById(id).style.display = 'none';
}


// Function for displaying extra input fields if a certain option from a dropdown list is selected.
// Specially used for the University field
function display(obj,id1) {
	txt = obj.options[obj.selectedIndex].value;
	document.getElementById(id1).style.display = 'none';
	if ( txt.match(id1) ) {
		document.getElementById(id1).style.display = 'block';
	}
}
