

$(function () {

    "use strict";
    var submit_value = "";
    var messages = {
        'requiredMin2Max10000': 'This field is required & length should be between 2 to 10000.',
        'requiredCsv': "Please upload a valid CSV file.",
        'mandatory': 'This field is required.',
        'price': 'This field is required. Maximum length allowed - 16 digits. Expected format: 350.74.',
        'nonzeroprice': 'This field is required. The maximum length allowed is 16 digits. The value must be a natural number. Expected format: 350.74.',
        'email': 'This field is required & must be a valid email address.',
        'notRequiredEmail': 'This field is optional & must be a valid email address.',
        'passwd': 'This field is required. Minimum 5 characters with at least one Capital letter, one Special character and one Number.',
        'notRequiredPasswd': 'Minimum 5 characters with at least one Capital letter, one Special character and one Number.',
        'mobile': 'This field is required & must be having 10 digits only.',
        'addressLine1': 'This field is required. Maximum length allowed - 255 characters.',
        'addressLine2': 'Maximum length allowed - 255 characters.',
        'digit': 'This field is required. Only Numeric values allowed.',
        'notRequiredDigit': 'Only Numeric values allowed.',
        'firstname': 'This field is required. Maximum length allowed - 60 characters.',
        'lastname': 'This field is required. Maximum length allowed - 60 characters.',
        'middlename': 'Maximum length allowed - 60 characters.',
        'requiredMin2Max60NoSpecial': 'This field is required & length should be between 2 to 60 with no special character.',
        'requiredip': 'Required field with expected IP format: XXX.XXX.XXX.XXX.',
        'optionalip': 'Invalid IP Format. Expected format: XXX.XXX.XXX.XXX.',
        'requiredimage': 'Required Field with allowed image types - gif, png, jpeg, jpg. Maximum size 2 MB.',
        'optionalimage': 'Allowed image types gif, png, jpeg, jpg. Maximum size 2 MB.',
        'requiredcharonly': 'This fields is required. Only alphabets allowed.',
        'optionalcharonly': 'Only alphabets allowed.',
        'barcode': 'Maximum length allowed - 255 characters. Special characters not allowed.',
        'ean': 'Maximum length allowed - 14 characters. Special characters not allowed.',
        'upc': 'Maximum length allowed - 12 characters. Special characters not allowed.',
        'size': 'Maximum length allowed - 10 characters. Special characters not allowed.',
        'requiredurl': 'This fields is required. Maximum length allowed - 255 characters. Expected format: http://www.example.com',
        'optionalurl': 'Maximum length allowed - 255 characters. Expected format: http://www.example.com',
        'carrier': 'Length should be between 3 to 255.',
        'brand': 'Length should be between 3 to 64.',
        'optionalcompany': 'Length should be between 3 to 32.',
        'requiredcompany': 'This field is required & length should be between 3 to 32.',
        'sku': 'Length should be between 3 to 64 and should not contain any special character.',
        'requiredmmddyy': 'This field is required. Expected format: mm/dd/yyyy or mm-dd-yyyy.',
        'optionalmmddyy': 'Expected format: mm/dd/yyyy or mm-dd-yyyy.',
        'requiredddmmyy': 'This field is required. Expected format: dd/mm/yyyy or dd-mm-yyyy.',
        'optionalddmmyy': 'Expected format: dd/mm/yyyy or dd-mm-yyyy.',
        'optionalpercentage': 'Allowed numbers between 0 and 100.',
        'requiredpercentage': 'This field is required. Allowed numbers between 0 and 100.',
        'checktags': 'This field must not have any script, iframe and style tag.',
        'checkhtmltags': 'This field must not have any HTML tags.',
        'requireddocs': 'This field is required. Maximum size 2MB.',
        'optionaldocs': 'Maximum size 2MB.',
        'requiredcolor': 'This field is required. Color Code in Hexadecimal format required. Example: #FFFFFF',
        'optionalcolor': 'Color Code in Hexadecimal format required. Example: #FFFFFF',
        'requiredMin1Max2': 'This field is required & length should be between 1 to 2.',
        'requiredMin10Max500': 'This field is required & length should be between 10 to 500.',
        'notRequiredMin10Max500': 'Length should be between 10 to 500.',
        'requiredMin2Max100': 'This field is required & length should be between 2 to 100.',
        'requiredMin2Max255withNoSpace': 'This field name required and length should be between 2 to 255 characters. Only alphabets, numbers and underscore are allowed.',
        'requiredMin2Max100withSpace': 'This field name required and length should be between 2 to 100 characters. Only alphabets and numbers are allowed with spaces.',
        'requiredMin2Max255withSpace': 'This field name required and length should be between 2 to 255 characters. Only alphabets and numbers are allowed with spaces.',
        //BOC #48940 neeraj.kumar@velsof.com 21-June-2019 add validation for not requiredMin2Max1500
        'notRequiredMin2Max1500': 'This field is required & length should be between 2 to 1500.',
        'requiredMin2Max1500': 'This field is required & length should be between 2 to 1500.',
        //EOC
        //BOC #48940 neeraj.kumar@velsof.com 17-July-2019 add validation for requiredMin2Max2000
        'requiredMin2Max2000': 'This field is required & length should be between 2 to 2000.',
        //EOC
        'requiredMin1Max255': 'This field is required & length should be between 1 to 255.',
        'requiredMin2Max255': 'This field is required & length should be between 2 to 255.',
        'notRequiredMin1Max255': 'Length should be between 1 to 255.',
        'notRequiredMin1Max100': 'Length should be between 1 to 100.',
        'notRequiredMin2Max255': 'Length should be between 2 to 255.',
        'requiredMin2Max500': 'This field is required & length should be between 2 to 500.',
        'requiredMin2Max20': 'This field is required & length should be between 2 to 20.',
        'notrequiredMin2Max500': 'This field is optional & length should be between 2 to 500.',
        'notrequiredMin2Max1000': 'This field is optional & length should be between 2 to 1000.',
        'notRequiredMin2Max20': 'Length should be between 2 to 20.',
        'requiredMin2Max40': 'This field is required & length should be between 2 to 40.',
        'notRequiredMin2Max40': 'Length should be between 2 to 40.',
        'requiredMin2Max50': 'This field is required & length should be between 2 to 50.',
        'requiredMin3Max50': 'This field is required & length should be between 3 to 50.',
        'requiredMin1Max50': 'This field is required & length should be between 1 to 50.',
        'requiredMin5Max50NoSpecial': 'This field is required & length should be between 5 to 50 with no special character.',
        'requiredMin1Max10': 'This field is required & length should be between 1 to 10.',
        'requiredMin1Max7Decimal2': 'This field is required with max length of 7 & must be in format e.g. 350.74.',
        'notRequiredMin1Max7Decimal2': 'Maximum length of 7 & must be in format e.g. 350.74.',
        'notRequiredPrice': 'Maximum length allowed - 16 digits. Expected format: 350.74.',
        'requiredMinValue0MaxValue100Decimal2': 'Required input between 0 to 100 & must be in format e.g. 45.74.',
        'notRequiredMinValue0MaxValue100Decimal2': 'Value should be between 0 to 100 & must be in format e.g. 45.74.',
        'pincode': 'This field is required & must be having 6 digits only.',
        'notRequiredPincode': 'This field must be having 6 digits only.',
        'requiredGSTIN': 'Please enter a valid Indian GST Number (15 characters in format: 2 digits state code + 10 characters PAN + 3 characters entity/check code).',
        //BOC  Added the code to add the validation for digital sign unique id value. CHANGES BY: SHIS PAL SINGH ON 18-DEC-2023 PMS ID: 144653.
        'requiredUniqueSignId': 'This field is required & must contain 16 alphanumeric characters.',
        //BOC  Added the code to add the validation for digital sign unique id value. CHANGES BY: SHIS PAL SINGH ON 18-DEC-2023 PMS ID: 144653.
        'notRequiredGSTIN': 'Please enter a valid Indian GST Number (15 characters in format: 2 digits state code + 10 characters PAN + 3 characters entity/check code).',
        'panNo': 'This field is required & must contain 10 alphanumeric characters.',
        //BOC #84932 neeraj.kumar@velsof.com 13-Aug-2019 VDMS Pan & Vendor Code added
        'notRequiredPanNo': 'This field should contain 10 alphanumeric characters.',
        //EOC
        'confirmPasswd': 'Password and Confirm Password do not match.',
        'notRequiredMobile': 'This field must be having 10 digits only.',
        'multipleContact': 'This field is required and allow comma separated contact numbers with only +, -.',
        'notRequiredMultipleContact': 'This field allows comma separated contact numbers with only +, -.',
        'singleContact': 'This field is required and allow single contact number with only - and +.',
        'notRequiredSingleContact': 'This field allows single contact number with only - and +.',
        'optionaldocsMax5MB': 'Document type should be docx, pdf, xlsx, png, jpeg or jpg & should not exceed 5 MB in size.',
        'requireddocsMax5MB': 'Document type should be docx, pdf, xlsx, png, jpeg or jpg & should not exceed 5 MB in size.',
        'requireddocsMax10MB': 'Document type should be docx, pdf, xlsx, png, jpeg or jpg, tif or tiff & should not exceed 10 MB in size.',
        'requiredExcel': 'This field is required and document type should be xls or xlsx.',
        'latitude': 'Invalid Latitude value.',
        'longitude': 'Invalid Longitude value.',
        'requiredMax100': 'This field is required & length should not be more than 100 characters.',
        'requiredMax255': 'This field is required & length should not be more than 255 characters.',
        'notrequiredMax255': 'This field is optional & length should not be more than 255 characters.',
        'notrequiredMax6Decimal2': 'This field is optional & value should be lie between 0 to 100. e.g. 99.74.', //added new validation. By sanjana@velsof.com. Date - 23-11-2022.  #135498
        'requiredMin10Max249': 'This field is required & length should be between 10 to 249.',// Message of newly added Method for - Mandatory + Minimum Length 2 + Maximum Length 249. CHANGES BY: SHIS PAL SINGH ON 03-October-2023 (PM ID: #142466)
        'notrequiredMin10Max249': 'This field is optional & length should be between 10 to 249.',// Message of newly added Method for - Optional + Minimum Length 2 + Maximum Length 249. CHANGES BY: SHIS PAL SINGH ON 03-October-2023 (PM ID: #142466)
        'requiredmin1max3': 'This field is required & length should be between 1 to 3.',
        'requiredPdfMax10MB': 'This field is required & file size should not exceed 10 MB. Only PDF files are allowed.', // Added new validation for property address. CHANGES BY: CURSOR AI ON 05-March-2025 (PM ID: #158682)
        'requiredMin2Max255NoSpecial': 'This field is required & length should be between 2 to 255 with no special character.',
        'notrequiredMin2Max255NoSpecial': 'This field is required & length should be between 2 to 255 with no special character.',
    };

    //Add New Method for - Mandatory + Minimum Length 10 + Maximum Length 255 + No Special Character
    jQuery.validator.addMethod("requiredMin2Max255NoSpecial", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 255 || !/^[a-zA-Z0-9 \-\/]+$/.test(value)) {
            return false;
        }
        else {
            return true;
        }
    }, messages.requiredMin2Max255NoSpecial);

    //Add New Method for - Not Mandatory + Minimum Length 10 + Maximum Length 255 + No Special Character
    jQuery.validator.addMethod("notrequiredMin2Max255NoSpecial", function (value, element) {
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 255 || !/^[a-zA-Z0-9 \-\/]+$/.test(value)) {
            return false;
        }
        else {
            return true;
        }
    }, messages.notrequiredMin2Max255NoSpecial);
    /**
     * /**
     * @BOC 
     * @Task #159518 Merge PDF functionality
     * @author Anshu Sharma
     * @date 2024
     * @use_of_code:
     * Added new method for PDF file upload validation for 10 MB.
     */
    jQuery.validator.addMethod("requiredPdfMax10MB", function (value, element) {
        // Check if the file input is empty (mandatory field)
        if ($.trim(value) == "") {
            return false;  // File is required, return false if empty
        } else {
            // Get the file extension
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            var jquery_object = jQuery(element);

            // Check if the file extension is PDF
            if (Extension == "pdf") {
                // Get the file size and check if it's within the 10MB limit
                if (jquery_object.prop("files")[0].size > 10485760) { // 10MB = 10485760 bytes
                    return false;  // File exceeds size limit
                } else {
                    return true;  // Valid file
                }
            } else {
                return false;  // Invalid file type, only PDF is allowed
            }
        }
    }, messages.requiredPdfMax10MB);
    /**
     * @BOC 
     * @Task #159149 Creation of Screening Report Form.
     * @author Anshu Sharma
     * @date 27-03-2025
     * @use_of_code:
     * Added the validation rule for screening report form for address field.s
     */

    jQuery.validator.addMethod("requiredMin2Max10000", function (value, element) {
        //Add a condition to not to check required fields if values are empty
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 10000) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max10000);

    // NAME: ANSHU SHARMA
    // DATE: 05/09/2024
    //Add New Method for csv File Upload - Required csv
    jQuery.validator.addMethod("requiredCSV", function (value, element) {
        // Allow specific validation based on different conditions, if needed
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true; // Allow empty value for "draft" submission
            }
        }

        // Check if the input value is empty
        if ($.trim(value) == "") {
            return false; // Fail if no file is selected
        } else {
            // Extract the file extension and convert it to lowercase
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();

            // Check if the extension is "csv"
            if (Extension == "csv") {
                return true;
            } else {
                return false;
            }
        }
    }, messages.requiredCsv);

    // Code added By Prabhat ( Date: 02-Feb-2018) For State Short Name with Allowed Character Minimum 1 Characters and Maximum 3 Characters .Only alphabets allowed 
    //Add New Method for - Mandatory + Minimum Length 3 + Maximum Length 3 + Only alphabets allowed
    jQuery.validator.addMethod("requiredmin1max3", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 3 || !/^[a-z]+$/i.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredmin1max3);

    //Add New Method for - Mandatory + Minimum Length 3 + Maximum Length 100 + Only alphabets allowed
    //By sanjana@velsof.com. Date - 20-07-2022. Scenario #129445
    jQuery.validator.addMethod("requiredMax100", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 100) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMax100);
    //Add New Method for - Mandatory + Minimum Length 3 + Maximum Length 100 + Only alphabets allowed
    //By sanjana@velsof.com. Date - 20-07-2022. Scenario #129445
    jQuery.validator.addMethod("notrequiredMax255", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value).length > 255) {
            return false;
        } else {
            return true;
        }
    }, messages.notrequiredMax255);

    //Add New Method for - Mandatory + Minimum Length 3 + Maximum Length 2000 + Only alphabets allowed
    //By sanjana@velsof.com. Date - 20-07-2022. Scenario #129445
    jQuery.validator.addMethod("requiredMax2000", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 2000) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMax2000);

    //Add New Method for - Price - Mandatory + Minimum Length 1 + Maximum Length 16 (Including Decimal Dot & 2 decimal values)
    jQuery.validator.addMethod("price", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 16 || !/^\d{0,16}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.price);

    // BOC: Add New Method for - Non Zero Price - Mandatory + Minimum Length 1 + Maximum Length 16 (Including Decimal Dot & 2 decimal values). CHANGES BY: SHIS PAL SINGH ON 07-Mar-2024 PMS ID: 146960.
    jQuery.validator.addMethod("nonzeroprice", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value) <= 0 || $.trim(value).length < 1 || $.trim(value).length > 16 || !/^\d{1,16}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.nonzeroprice);
    // EOC: Add New Method for - Non Zero Price - Mandatory + Minimum Length 1 + Maximum Length 16 (Including Decimal Dot & 2 decimal values). CHANGES BY: SHIS PAL SINGH ON 07-Mar-2024 PMS ID: 146960.


    //Add New Method for - Email - Mandatory + Email Validation
    jQuery.validator.addMethod("email", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || !/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.email);

    jQuery.validator.addMethod("notRequiredEmail", function (value, element) {
        // Validate email only if it's not empty
        if ($.trim(value) == "") {
            return true;  // If empty, consider it valid (not mandatory)
        }
        if (!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredEmail);

    //Add New Method for - Password - Mandatory + Minimum Length 5 + Maximum 50 characters + At least one Capital Letter + At least one Special Character + At least one Number
    jQuery.validator.addMethod("passwd", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 5 || $.trim(value).length > 50 || !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,50}/.test(value)) {
            return false;
        } else {
            if (/[A-Z]/.test(value) == true) {
                return true;
            } else {
                return false;
            }
        }
    }, messages.passwd);

    //Add New Method for - Password Edit - Optional + Minimum Length 5  + Maximum 50 characters + At least one Capital Letter + At least one Special Character + At least one Number
    jQuery.validator.addMethod("notRequiredPasswd", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 5 || $.trim(value).length > 50 || !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,50}/.test(value))) {
            return false;
        } else {
            if (/[A-Z]/.test(value) == true) {
                return true;
            } else {
                return false;
            }
        }
    }, messages.notRequiredPasswd);

    //Add New Method for - Mobile No. - Mandatory + Number + Total Length 10
    jQuery.validator.addMethod("mobile", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length != 10 || !/^\d{10}?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.mobile);


    //Add New Method for - Address Line 1 - Mandatory + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("addressLine1", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 255) {
            return false;
        } else {
            return true;
        }
    }, messages.addressLine1);

    //Add New Method for - Address Line 2 - Optional + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("addressLine2", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 255)) {
            return false;
        } else {
            return true;
        }
    }, messages.addressLine2);

    //Add New Method for - Digits - Mandatory + Only Number
    jQuery.validator.addMethod("digit", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || !/^\d+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.digit);

    //Add New Method for - Digits - Optional + Only Number
    jQuery.validator.addMethod("notRequiredDigit", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if (!/^\d+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredDigit);


    //Add New Method for - Mandatory
    jQuery.validator.addMethod("mandatory", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return false;
        } else {
            return true;
        }
    }, messages.mandatory);

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 60
    jQuery.validator.addMethod("firstname", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 60) {
            return false;
        } else {
            return true;
        }
    }, messages.firstname);

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 60
    jQuery.validator.addMethod("lastname", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 60) {
            return false;
        } else {
            return true;
        }
    }, messages.lastname);

    //Add New Method for - Optional + Minimum Length 1 + Maximum Length 60
    jQuery.validator.addMethod("middlename", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 1 || $.trim(value).length > 60)) {
            return false;
        } else {
            return true;
        }
    }, messages.middlename);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 60 + No Special Character
    jQuery.validator.addMethod("requiredMin2Max60NoSpecial", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 60 || !/^[a-zA-Z0-9]+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max60NoSpecial);

    //Add New Method for - Mandatory + IP
    jQuery.validator.addMethod("requiredip", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        var testip4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

        if ($.trim(value) == "" || !value.match(testip4)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredip);

    //Add New Method for - Optional + IP
    jQuery.validator.addMethod("optionalip", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }
        var testip = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if ($.trim(value) == "" || !value.match(testip)) {
            return false;
        } else {
            return true;
        }
    }, messages.optionalip);

    //Add New Method for - Mandatory + Image(gif, png,jpeg,jpg) + Maximum size 2 MB
    jQuery.validator.addMethod("requiredimage", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            var jquery_object = jQuery(element);
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg" || Extension == "gif") {
                if (jquery_object.prop("files")[0].size > 2097152) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }, messages.requiredimage);

    //Add New Method for - Optional + Image(gif, png,jpeg,jpg) + Maximum size 2 MB
    jQuery.validator.addMethod("optionalimage", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            var jquery_object = jQuery(element);
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg" || Extension == "gif") {
                if (jquery_object.prop("files")[0].size > 2097152) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return true;
        }
    }, messages.optionalimage);

    //Add New Method for - Madatory + Albhabets only
    jQuery.validator.addMethod("requiredcharonly", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || !/^[a-z]+$/i.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredcharonly);

    //Add New Method for - optional + Albhabets only
    jQuery.validator.addMethod("optionalcharonly", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            if (!/^[a-z]+$/i.test(value)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }

    }, messages.optionalcharonly);

    //Add New Method for - optional + No speical character + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("barcode", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 255) {
                return false;
            } else {
                if (/^[ A-Za-z0-9_+./#-]*$/.test(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }, messages.barcode);

    //Add New Method for - optional + No speical character + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("ean", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 14) {
                return false;
            } else {
                if (/^[ A-Za-z0-9_+./#-]*$/.test(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }, messages.ean);

    //Add New Method for - optional + No speical character +  Minimum Length 2 + Maximum Length 12
    jQuery.validator.addMethod("upc", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 12) {
                return false;
            } else {
                if (/^[ A-Za-z0-9_+./#-]*$/.test(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }, messages.upc);

    //Add New Method for - optional + No speical character +  Minimum Length 1 + Maximum Length 10
    jQuery.validator.addMethod("size", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            if ($.trim(value).length < 1 || $.trim(value).length > 10) {
                return false;
            } else {
                if (/^[ A-Za-z0-9_+./#-]*$/.test(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }, messages.size);

    //Add New Method for - Mandatory + URL +  Minimum Length 5 + Maximum Length 2083
    jQuery.validator.addMethod("requiredurl", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            if ($.trim(value).length < 5 || $.trim(value).length > 2083) {
                return false;
            } else {
                var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                if (res == null)
                    return false;
                else
                    return true;
            }
        } else {
            return false;
        }
    }, messages.requiredurl);

    //Add New Method for - Optional + URL +  Minimum Length 5 + Maximum Length 2083
    jQuery.validator.addMethod("optionalurl", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            if ($.trim(value).length < 5 || $.trim(value).length > 2083) {
                return false;
            } else {
                var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                if (res == null)
                    return false;
                else
                    return true;
            }
        } else {
            return true;
        }
    }, messages.optionalurl);

    //Add New Method for - optional +  Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("carrier", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 255) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }, messages.carrier);

    //Add New Method for - optional +  Minimum Length 2 + Maximum Length 64
    jQuery.validator.addMethod("brand", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 64) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }, messages.brand);

    //Add New Method for - optional +  Minimum Length 2 + Maximum Length 32
    jQuery.validator.addMethod("optionalcompany", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 32) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }, messages.optionalcompany);

    //Add New Method for - Mandatory +  Minimum Length 2 + Maximum Length 32
    jQuery.validator.addMethod("requiredcompany", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 32) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredcompany);

    //Add New Method for - optional + No speical character + Minimum Length 2 + Maximum Length 64
    jQuery.validator.addMethod("sku", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 64) {
                return false;
            } else {
                if (/^[ A-Za-z0-9_+./#-]*$/.test(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }, messages.sku);

    //Add New Method for - Mandatory + date in mmddyy format
    jQuery.validator.addMethod("requiredmmddyy", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
            var val = $.trim(value);
            if (val != '') {
                if (val.match(dateformat)) {
                    var opera1 = val.split('/');
                    var opera2 = val.split('-');
                    var lopera1 = opera1.length;
                    var lopera2 = opera2.length;
                    // Extract the string into month, date and year  
                    if (lopera1 > 1) {
                        var pdate = val.split('/');
                    }
                    else if (lopera2 > 1) {
                        var pdate = val.split('-');
                    }
                    var mm = parseInt(pdate[0]);
                    var dd = parseInt(pdate[1]);
                    var yy = parseInt(pdate[2]);
                    if (yy < 1970) {
                        return false;
                    }
                    // Create list of days of a month [assume there is no leap year by default]  
                    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (mm == 1 || mm > 2) {
                        if (dd > ListofDays[mm - 1]) {
                            return false;
                        }
                    }
                    if (mm == 2) {
                        var lyear = false;
                        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                            lyear = true;
                        }
                        if ((lyear == false) && (dd >= 29)) {
                            return false;
                        }
                        if ((lyear == true) && (dd > 29)) {
                            return false;
                        }
                    }
                }
                else {
                    return false;
                }
            } else {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }, messages.requiredmmddyy);

    //Add New Method for - Optional + date in mmddyy format
    jQuery.validator.addMethod("optionalmmddyy", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
            var return_val = true;
            var val = $.trim(value);
            if (val != '') {
                if (val.match(dateformat)) {
                    var opera1 = val.split('/');
                    var opera2 = val.split('-');
                    var lopera1 = opera1.length;
                    var lopera2 = opera2.length;
                    // Extract the string into month, date and year  
                    if (lopera1 > 1) {
                        var pdate = val.split('/');
                    }
                    else if (lopera2 > 1) {
                        var pdate = val.split('-');
                    }
                    var mm = parseInt(pdate[0]);
                    var dd = parseInt(pdate[1]);
                    var yy = parseInt(pdate[2]);
                    if (yy < 1970) {
                        return false;
                    }
                    // Create list of days of a month [assume there is no leap year by default]  
                    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (mm == 1 || mm > 2) {
                        if (dd > ListofDays[mm - 1]) {
                            return false;
                        }
                    }
                    if (mm == 2) {
                        var lyear = false;
                        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                            lyear = true;
                        }
                        if ((lyear == false) && (dd >= 29)) {
                            return false;
                        }
                        if ((lyear == true) && (dd > 29)) {
                            return false;
                        }
                    }
                }
                else {
                    return false;
                }
            } else {
                return false;
            }
            return true;
        } else {
            return true;
        }
    }, messages.optionalmmddyy);

    //Add New Method for - Mandatory + date in ddmmyy format
    jQuery.validator.addMethod("requiredddmmyy", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {

            var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            var return_val = true;
            var val = $.trim(value);
            if (val != '') {
                if (val.match(dateformat)) {
                    var opera1 = val.split('/');
                    var opera2 = val.split('-');
                    var lopera1 = opera1.length;
                    var lopera2 = opera2.length;
                    if (lopera1 > 1) {
                        var pdate = val.split('/');
                    }
                    else if (lopera2 > 1) {
                        var pdate = val.split('-');
                    }
                    var dd = parseInt(pdate[0]);
                    var mm = parseInt(pdate[1]);
                    var yy = parseInt(pdate[2]);
                    if (yy < 1970) {
                        return false;
                    }
                    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (mm == 1 || mm > 2) {
                        if (dd > ListofDays[mm - 1]) {
                            return false;
                        }
                    }
                    if (mm == 2) {
                        var lyear = false;
                        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                            lyear = true;
                        }
                        if ((lyear == false) && (dd >= 29)) {
                            return_val = velovalidation.error('invalid_date');
                        }
                        if ((lyear == true) && (dd > 29)) {
                            return false;
                        }
                    }
                }
                else {
                    return false;
                }
            } else {
                return false;
            }
            return true;
            ;
        } else {
            return false;
        }
    }, messages.requiredddmmyy);

    //Add New Method for - Optional + date in ddmmyy format
    jQuery.validator.addMethod("optionalddmmyy", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {

            var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            var return_val = true;
            var val = $.trim(value);
            if (val != '') {
                if (val.match(dateformat)) {
                    var opera1 = val.split('/');
                    var opera2 = val.split('-');
                    var lopera1 = opera1.length;
                    var lopera2 = opera2.length;
                    if (lopera1 > 1) {
                        var pdate = val.split('/');
                    }
                    else if (lopera2 > 1) {
                        var pdate = val.split('-');
                    }
                    var dd = parseInt(pdate[0]);
                    var mm = parseInt(pdate[1]);
                    var yy = parseInt(pdate[2]);
                    if (yy < 1970) {
                        return false;
                    }
                    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (mm == 1 || mm > 2) {
                        if (dd > ListofDays[mm - 1]) {
                            return false;
                        }
                    }
                    if (mm == 2) {
                        var lyear = false;
                        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                            lyear = true;
                        }
                        if ((lyear == false) && (dd >= 29)) {
                            return_val = velovalidation.error('invalid_date');
                        }
                        if ((lyear == true) && (dd > 29)) {
                            return false;
                        }
                    }
                }
                else {
                    return false;
                }
            } else {
                return false;
            }
            return true;
            ;
        } else {
            return true;
        }
    }, messages.optionalddmmyy);

    //Add New Method for - Optioanl + number only + between 0 and 100
    jQuery.validator.addMethod("optionalpercentage", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            if (!value.match(/^-?\d*(\.\d+)?$/)) {
                return false;
            } else if (value < 0 || value > 100) {
                return false;
            }
            return true;
        } else {
            return true;
        }
    }, messages.optionalpercentage);

    //Add New Method for - Mandatory + number only + between 0 and 100
    jQuery.validator.addMethod("requiredpercentage", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            if (!value.match(/^-?\d*(\.\d+)?$/)) {
                return false;
            } else if (value < 0 || value > 100) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }, messages.requiredpercentage);

    //Add New Method for - No iframe tags + no script tags + no style tags
    jQuery.validator.addMethod("checktags", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            var script_regex = /(<script[\s\S]*?>[\s\S]*?<\/script>)|(<script[\s\S]*?>)|([\s\S]*?<\/script>)/i;
            var style_regex = /(<style[\s\S]*?>[\s\S]*?<\/style>)|(<style[\s\S]*?>)|([\s\S]*?<\/style>)/i;
            var iframe_regex = /(<iframe[\s\S]*?>[\s\S]*?<\/iframe>)|(<iframe[\s\S]*?>)|([\s\S]*?<\/iframe>)/i;
            if (script_regex.test($.trim(value))) {
                return false;
            } else if (style_regex.test($.trim(value))) {
                return false;
            } else if (iframe_regex.test($.trim(value))) {
                return false;
            }
            return true;
        } else {
            return true;
        }
    }, messages.checktags);

    //Add New Method for - No html tags
    jQuery.validator.addMethod("checkhtmltags", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            if (value.match(/([\<])([^\>]{1,})*([\>])/i)) {
                return false;
            }
            return true;
        } else {
            return true;
        }
    }, messages.checkhtmltags);

    //Add New Method for - Mandatory + docs(gif, png,jpeg,jpg, docx, ppt, xlsx etc) + Maximum size 2 MB
    jQuery.validator.addMethod("requireddocs", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            var jquery_object = jQuery(element);
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg" || Extension == "gif"
                || Extension == "docx" || Extension == "ppt" || Extension == "xlsx") {
                if (jquery_object.prop("files")[0].size > 2097152) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }, messages.requireddocs);

    //Add New Method for - Optional + docs(gif, png,jpeg,jpg, docx, ppt, xlsx etc) + Maximum size 2 MB
    jQuery.validator.addMethod("optionaldocs", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) != "") {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            var jquery_object = jQuery(element);
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg" || Extension == "gif"
                || Extension == "docx" || Extension == "ppt" || Extension == "xlsx") {
                if (jquery_object.prop("files")[0].size > 2097152) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return true;
        }
    }, messages.optionaldocs);

    //Add New Method for - Mandatory + color only
    jQuery.validator.addMethod("requiredcolor", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        value = $.trim(value);
        if (value != '') {
            var firstchar = value.charAt(0);
            value = value.substr(1);
            if (firstchar != '#') {
                return false;
            }
            var myRegExp = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i;
            if (!myRegExp.test(value)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }, messages.requiredcolor);

    //Add New Method for - Optional + color only
    jQuery.validator.addMethod("optionalcolor", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        value = $.trim(value);
        if (value != '') {
            var firstchar = value.charAt(0);
            value = value.substr(1);
            if (firstchar != '#') {
                return false;
            }
            var myRegExp = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i;
            if (!myRegExp.test(value)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }, messages.optionalcolor);

    //Custom Validation Rules

    //Add New Method for - Mandatory + Minimum Length 10 + Maximum Length 500
    jQuery.validator.addMethod("requiredMin1Max2", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 2) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin1Max2);

    //Add New Method for - Mandatory + Minimum Length 10 + Maximum Length 500
    jQuery.validator.addMethod("requiredMin10Max500", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 10 || $.trim(value).length > 500) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin10Max500);

    //Add New Method for - Optional + Minimum Length 10 + Maximum Length 500
    jQuery.validator.addMethod("notRequiredMin10Max500", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 10 || $.trim(value).length > 500)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin10Max500);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 100
    jQuery.validator.addMethod("requiredMin2Max100", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 100) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max100);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 100
    jQuery.validator.addMethod("requiredMin2Max255withNoSpace", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 255 || !/^[a-zA-Z0-9_]+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max255withNoSpace);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 100
    jQuery.validator.addMethod("requiredMin2Max100withSpace", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 100 || !/^[a-zA-Z0-9 ]+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max100withSpace);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 100
    jQuery.validator.addMethod("requiredMin2Max255withSpace", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 100 || !/^[a-zA-Z0-9 ]+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max255withSpace);
    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("requiredMin2Max255", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 255) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max255);

    //Add New Method for - Optional + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("notRequiredMin2Max255", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 255)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin2Max255);

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 255
    jQuery.validator.addMethod("requiredMin1Max255", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 255) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin1Max255);

    //BOC #48940 neeraj.kumar@velsof.com 17-June-2019 add validation for not requiredMin2Max1500
    jQuery.validator.addMethod("notRequiredMin2Max1500", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 1500)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin2Max1500);

    //BOC #48940 neeraj.kumar@velsof.com 21-June-2019 add validation for not requiredMin2Max1500
    jQuery.validator.addMethod("requiredMin2Max1500", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 1500) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max1500);
    //EOC

    //BOC #48940 neeraj.kumar@velsof.com 17-July-2019 add validation for not requiredMin2Max1500
    jQuery.validator.addMethod("requiredMin2Max2000", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 2000) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max2000);
    //EOC

    //Add New Method for - Optional + Minimum Length 1 + Maximum Length 255
    jQuery.validator.addMethod("notRequiredMin1Max255", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 1 || $.trim(value).length > 255)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin1Max255);

    //Add New Method for - Optional +  Maximum Length 100
    jQuery.validator.addMethod("notRequiredMin1Max100", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && $.trim(value).length > 100) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin1Max100);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 500
    jQuery.validator.addMethod("requiredMin2Max500", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 500) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max500);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 500
    jQuery.validator.addMethod("notrequiredMin2Max500", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length > 500 || $.trim(value).length < 2)) {
            return false;
        } else {
            return true;
        }
    }, messages.notrequiredMin2Max500);
    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 1000
    jQuery.validator.addMethod("notrequiredMin2Max1000", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length > 1000 || $.trim(value).length < 2)) {
            return false;
        } else {
            return true;
        }
    }, messages.notrequiredMin2Max1000);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 20
    jQuery.validator.addMethod("requiredMin2Max20", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 20) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max20);

    //Add New Method for - Optional + Minimum Length 2 + Maximum Length 20
    jQuery.validator.addMethod("notRequiredMin2Max20", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 20)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin2Max20);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 40
    jQuery.validator.addMethod("requiredMin2Max40", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 40) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max40);

    //Add New Method for - Optional + Minimum Length 2 + Maximum Length 40
    jQuery.validator.addMethod("notRequiredMin2Max40", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 40)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin2Max40);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 50
    jQuery.validator.addMethod("requiredMin2Max50", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 50) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max50);

    //Add New Method for - Mandatory + Minimum Length 3 + Maximum Length 50
    jQuery.validator.addMethod("requiredMin3Max50", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 3 || $.trim(value).length > 50) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin3Max50);

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 50
    jQuery.validator.addMethod("requiredMin1Max50", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 50) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin1Max50);

    //Add New Method for - Mandatory + Minimum Length 5 + Maximum Length 50 + No Special Character
    jQuery.validator.addMethod("requiredMin5Max50NoSpecial", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 5 || $.trim(value).length > 50 || !/^[a-zA-Z0-9]+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin5Max50NoSpecial);

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 10
    jQuery.validator.addMethod("requiredMin1Max10", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 10) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin1Max10);

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 7 (Including Decimal Dot & 2 decimal values)
    jQuery.validator.addMethod("requiredMin1Max7Decimal2", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 7 || !/^\d{0,4}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin1Max7Decimal2);

    //Add New Method for - Optional + Min value = 0 && Max value = 100 + Maximum Length 3 (Including Decimal Dot & 2 decimal values). By sanjana@velsof.com. Date 23-11-2022. #135498
    jQuery.validator.addMethod("notrequiredMax6Decimal2", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }


        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) < 0 || $.trim(value) > 100 || $.trim(value).length > 6 || !/^\d{0,4}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notrequiredMax6Decimal2);


    //Add New Method for - Optional + Minimum Length 1 + Maximum Length 7 (Including Decimal Dot & 2 decimal values)
    jQuery.validator.addMethod("notRequiredMin1Max7Decimal2", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value).length < 1 || $.trim(value).length > 7 || !/^\d{0,4}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin1Max7Decimal2);

    //Add New Method for - Price - Optional + Minimum Length 1 + Maximum Length 16 (Including Decimal Dot & 2 decimal values)
    jQuery.validator.addMethod("notRequiredPrice", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value).length < 1 || $.trim(value).length > 16 || !/^\d{0,13}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredPrice);

    //Add New Method for - Mandatory + Minimum Value 0 + Maximum Value 100 + Decimal Dot & 2 Decimal Values (Optional)
    jQuery.validator.addMethod("requiredMinValue0MaxValue100Decimal2", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value) < 0 || $.trim(value) > 100 || !/^\d{0,3}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMinValue0MaxValue100Decimal2);

    //Add New Method for - Optional + Minimum Value 0 + Maximum Value 100 + Decimal Dot & 2 Decimal Values (Optional)
    jQuery.validator.addMethod("notRequiredMinValue0MaxValue100Decimal2", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) < 0 || $.trim(value) > 100 || !/^\d{0,3}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMinValue0MaxValue100Decimal2);

    //Add New Method for - Pincode - Mandatory + Only Numbers + Total Length 6
    jQuery.validator.addMethod("pincode", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length != 6 || !/^[1-9][0-9]{5}$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.pincode);

    //Add New Method for - Pincode - Optional + Only Numbers + Total Length 6
    jQuery.validator.addMethod("notRequiredPincode", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value).length != 6 || !/^[1-9][0-9]{5}$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredPincode);

    //Add New Method for - GSTIN - Mandatory + Total Length 15 + Alphanumeric + No Special Character
    // Udated by Anurag Chauhan ON 10-12-2025 - TASK ID: #164408 - fix GSTIN Validation
    jQuery.validator.addMethod("requiredGSTIN", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        var trimmedValue = $.trim(value);

        // Check if empty or not 15 characters
        if (trimmedValue == "" || trimmedValue.length != 15) {
            return false;
        }

        // Indian GSTIN Format: 
        // Position 1-2: State Code (01-37)
        // Position 3-7: PAN first 5 chars (uppercase letters)
        // Position 8-11: PAN next 4 chars (digits)
        // Position 12: PAN last char (uppercase letter)
        // Position 13: Entity number (1-9 or A-Z)
        // Position 14: Letter 'Z' (default)
        // Position 15: Check digit (alphanumeric)
        var gstinPattern = /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

        if (!gstinPattern.test(trimmedValue.toUpperCase())) {
            return false;
        }

        // Additional validation: State code should be between 01 and 37
        var stateCode = parseInt(trimmedValue.substring(0, 2));
        if (stateCode < 1 || stateCode > 37) {
            return false;
        }

        return true;
    }, messages.requiredGSTIN);

    //BOC  Added the code to add the validation for digital sign unique id value. CHANGES BY: SHIS PAL SINGH ON 18-DEC-2023 PMS ID: 144653.
    //Add New Method for - requiredUniqueSignId - Mandatory + Total Length 16 + Alphanumeric + No Special Character
    jQuery.validator.addMethod("requiredUniqueSignId", function (value, element) {
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length != 16 || !/^[a-zA-Z0-9]+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredUniqueSignId);
    //EOC  Added the code to add the validation for digital sign unique id value. CHANGES BY: SHIS PAL SINGH ON 18-DEC-2023 PMS ID: 144653.

    //Add New Method for - GSTIN - Optional + Total Length 15 + Alphanumeric + No Special Character
    // Udated by Anurag Chauhan ON 10-12-2025 - TASK ID: #164408 - fix GSTIN Validation
    jQuery.validator.addMethod("notRequiredGSTIN", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length != 15 || !/^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(value))) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredGSTIN);

    //Add New Method for - PANNo. - Mandatory + Total Length 10 + Alphanumeric + No Special Character
    jQuery.validator.addMethod("panNo", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length != 10 || !/^[a-zA-Z0-9]+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.panNo);

    //EOC

    //BOC #84932 neeraj.kumar@velsof.com 13-Aug-2019 VDMS Pan & Vendor Code added
    jQuery.validator.addMethod("notRequiredPanNo", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length != 10 || !/^[a-zA-Z0-9]+$/.test(value))) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredPanNo);
    //EOC #84932

    //Add New Method for - Password Match - Password = Confirm Password
    jQuery.validator.addMethod("confirmPasswd", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        var password = $("#password").val();
        if ($.trim(value) != $.trim(password)) {
            return false;
        } else {
            return true;
        }
    }, messages.confirmPasswd);

    //Add New Method for - Password Match in FE section of Add User - Password = Confirm Password
    jQuery.validator.addMethod("confirmPasswdEngineer", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        var password = $("#password_engineer").val();
        if ($.trim(value) != $.trim(password)) {
            return false;
        } else {
            return true;
        }
    }, messages.confirmPasswd);

    //Add New Method for - Mobile No. - Optional + Number + Total Length 10
    jQuery.validator.addMethod("notRequiredMobile", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value).length != 10 || !/^\d{10}?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMobile);

    //Add New Method for Multiple Contact Nos. - Mandatory + Minimum Length 2 + Maximum Length 255 + Comma Separated Contact Nos (Only contains numbers, +, - and space)
    jQuery.validator.addMethod("multipleContact", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || !/^([0-9-+]{1,15})(, [0-9-+]{1,15})*$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.multipleContact);

    //Add New Method for Multiple Contact Nos. - Optional + Minimum Length 2 + Maximum Length 255 + Comma Separated Contact Nos (Only contains numbers, +, - and space)
    jQuery.validator.addMethod("notRequiredMultipleContact", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && (!/^([0-9-+]{1,15})(, [0-9-+]{1,15})*$/.test(value))) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMultipleContact);

    //Add New Method for Single Contact Nos. - Mandatory + Minimum Length 2 + Maximum Length 255 + Comma Separated Contact Nos (Only contains numbers, +, - and space)
    jQuery.validator.addMethod("singleContact", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || !/^([0-9-+]{1,15})$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.singleContact);

    //Add New Method for Single Contact Nos. - Optional + Minimum Length 2 + Maximum Length 255 + Comma Separated Contact Nos (Only contains numbers, +, - and space)
    jQuery.validator.addMethod("notRequiredSingleContact", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && (!/^([0-9-+]{1,15})$/.test(value))) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredSingleContact);

    //Add New Method for - Optional + docs(gif, png,jpeg,jpg, docx, ppt, xlsx etc) + Maximum size 2 MB
    jQuery.validator.addMethod("optionaldocsMax5MB", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            var jquery_object = jQuery(element);
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg"
                || Extension == "docx" || Extension == "pdf" || Extension == "xlsx") {
                if (jquery_object.prop("files")[0].size > 5242880) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    }, messages.optionaldocsMax5MB);

    jQuery.validator.addMethod("requireddocsMax5MB", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return false;
            }
        }

        if ($.trim(value) == "") {
            return false;
        } else {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            var jquery_object = jQuery(element);
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg"
                || Extension == "docx" || Extension == "pdf" || Extension == "xlsx") {
                if (jquery_object.prop("files")[0].size > 5242880) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    }, messages.requireddocsMax5MB);

    jQuery.validator.addMethod("requireddocsMax10MB", function (value, element) {
        // Allow empty when in draft mode
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return false;
            }
        }
        // Not allowed to be empty
        if ($.trim(value) == "") {
            return false;
        } else {
            var allowedExtensions = ["jpeg", "jpg", "png", "docx", "pdf", "xlsx", "odt", "tiff"];
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            var jquery_object = jQuery(element);
            // Check if file(s) exist
            var files = jquery_object.prop("files");
            if (allowedExtensions.indexOf(Extension) !== -1) {
                if (files && files.length > 0) {
                    for (var i = 0; i < files.length; i++) {
                        if (files[i].size > 10485760) { // 10 MB
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            } else {
                return false;
            }
        }
    }, messages.requireddocsMax10MB);

    //Add New Method for Excel File Upload - Required + docs(xls, xlsx)
    jQuery.validator.addMethod("requiredExcel", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return false;
        } else {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            if (Extension == "xls" || Extension == "xlsx") {
                return true;
            } else {
                return false;
            }
        }
    }, messages.requiredExcel);

    //Add New Method for - Latitude - Mandatory + Maximum Legth 12 + range between -85 to 85
    jQuery.validator.addMethod("latitude", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 12 || !/^(?=.)-?((8[0-5]?)|([0-7]?[0-9]))?(?:\.[0-9]{1,20})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.latitude);

    //Add New Method for - Longitude - Mandatory + Maximum Legth 12 + range between -180 to 180
    jQuery.validator.addMethod("longitude", function (value, element) {
        //Add a condition to not to check required fields if values are empty. Code added by sanjana@velsof.com. Date - 20-12-2022. Task #135498
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 12 || !/^(?=.)-?((0?[8-9][0-9])|180|([0-1]?[0-7]?[0-9]))?(?:\.[0-9]{1,20})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.longitude);

    // BOC: Add New Method for - Mandatory + Minimum Length 10 + Maximum Length 249. CHANGES BY: SHIS PAL SINGH ON 03-October-2023 (PM ID: #142466)
    jQuery.validator.addMethod("requiredMin10Max249", function (value, element) {
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "" || $.trim(value).length < 10 || $.trim(value).length > 249) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin10Max249);
    // EOC: Add New Method for - Mandatory + Minimum Length 10 + Maximum Length 249. CHANGES BY: SHIS PAL SINGH ON 03-October-2023 (PM ID: #142466)

    // BOC: Add New Method for - Optional + Minimum Length 10 + Maximum Length 249. CHANGES BY: SHIS PAL SINGH ON 03-October-2023 (PM ID: #142466)
    jQuery.validator.addMethod("notrequiredMin10Max249", function (value, element) {
        if (submit_value != "" && submit_value == "draft") {
            if ($.trim(value) == "") {
                return true;
            }
        }

        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length > 249 || $.trim(value).length < 10)) {
            return false;
        } else {
            return true;
        }
    }, messages.notrequiredMin10Max249);
    // EOC: Add New Method for - Optional + Minimum Length 2 + Maximum Length 249. CHANGES BY: SHIS PAL SINGH ON 03-October-2023 (PM ID: #142466)


    //INLINE VALIDATION
    $(".validateform").validate({
        highlight: function (label) {
            $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function (label) {
            $(label).closest('.form-group').removeClass('has-error');
            label.remove();
        },
        // BOC: Add invalidHandler to scroll to first error field.
        // PURPOSE: To scroll to the first error field when validation fails.
        // BY: Anurag Chauhan ON 08-May-2025 
        // TASK ID: #160265
        invalidHandler: function (form, validator) {
            if (!validator.numberOfInvalids()) {
                return;
            }
            // Get the first error element
            var firstError = $(validator.errorList[0].element);
            // Scroll to the first error element with some offset for better visibility
            $('html, body').animate({
                scrollTop: $(firstError).offset().top - 100
            }, 500);
            // Set focus on the first error field
            firstError.focus();
            // EOC: Add invalidHandler to scroll to first error field.
        }
    });
    $("#validateAddNotesForm").validate({
        highlight: function (label) {
            $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function (label) {
            $(label).closest('.form-group').removeClass('has-error');
            label.remove();
        },
        // BOC: Add invalidHandler to scroll to first error field.
        // PURPOSE: To scroll to the first error field when validation fails.
        // BY: Anurag Chauhan ON 08-May-2025 
        // TASK ID: #160265
        invalidHandler: function (form, validator) {
            if (!validator.numberOfInvalids()) {
                return;
            }
            // Get the first error element
            var firstError = $(validator.errorList[0].element);
            // Scroll to the first error element with some offset for better visibility
            $('html, body').animate({
                scrollTop: $(firstError).offset().top - 100
            }, 500);
            // Set focus on the first error field
            firstError.focus();
            // EOC: Add invalidHandler to scroll to first error field.
        }
    });
    $("#validateTatForm").validate({
        highlight: function (label) {
            $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function (label) {
            $(label).closest('.form-group').removeClass('has-error');
            label.remove();
        },
        // BOC: Add invalidHandler to scroll to first error field.
        // PURPOSE: To scroll to the first error field when validation fails.
        // BY: Anurag Chauhan ON 08-May-2025 
        // TASK ID: #160265
        invalidHandler: function (form, validator) {
            if (!validator.numberOfInvalids()) {
                return;
            }
            // Get the first error element
            var firstError = $(validator.errorList[0].element);
            // Scroll to the first error element with some offset for better visibility
            $('html, body').animate({
                scrollTop: $(firstError).offset().top - 100
            }, 500);
            // Set focus on the first error field
            firstError.focus();
            // EOC: Add invalidHandler to scroll to first error field.
        }
    });
    $("#addCreditFundForm").validate({
        highlight: function (label) {
            $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function (label) {
            $(label).closest('.form-group').removeClass('has-error');
            label.remove();
        },
        // BOC: Add invalidHandler to scroll to first error field.
        // PURPOSE: To scroll to the first error field when validation fails.
        // BY: Anurag Chauhan ON 08-May-2025 
        // TASK ID: #160265
        invalidHandler: function (form, validator) {
            if (!validator.numberOfInvalids()) {
                return;
            }
            // Get the first error element
            var firstError = $(validator.errorList[0].element);
            // Scroll to the first error element with some offset for better visibility
            $('html, body').animate({
                scrollTop: $(firstError).offset().top - 100
            }, 500);
            // Set focus on the first error field
            // EOC: Add invalidHandler to scroll to first error field.
        }
    });

});

