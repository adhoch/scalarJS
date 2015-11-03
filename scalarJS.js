/************** TOC
 * 1. Global Variables
 * 2. Functions available for individual pages but not run
 *  a. replaceTags
 *  b. replacetTagOf
 *  c. replacePath
 * 3. Globally Run Functions
 *  a. insertHeader
 *  b. checkOmeka
 *  c. imgCheck
 *  d. runDelay
 *  e. itemPage
 *  f. footnotes
 */

//*** 1. Global Variables
// sets the omeka location -- this could be changed to a test in functions
var omekaLoc = "http://www.iub.edu/~lodzdsc/omeka-2.3.1";



//* 2. Functions available for individual pages but not run



//************************ replaceTags, replaceTagOf seem to break the tag visualization
//Function rewriting the text of 'this page is tagged with'
/*Takes as arguments text to replace "this page is tagged with", an option to hide the whole section and an integer below 10
that controls how many times the script is run*/

function replaceTags(tags, display, t) {
    // increments t and test # of times script has run
    t++;
    if (t < 10) {
        // checks to see if the .has_tags class is present
        if ($('.has_tags').length != 0) {
            
            // checks to see if the display should be turned off
            if (display == 'n') {
                //turns the display off
                $('.has_tags').parent().css('display', 'none')
            }
            
            // replaces the header of the has tags list with desired element and text
            $('.has_tags').prev().replaceWith('<h1>' + tags + '</h1>');
            var delay = 500;
            // reruns again after delay
            setTimeout(function () {
                replaceTags(tags, display, t);
            },
            delay);
        } else {
            var delay = 500;
            // reruns again after delay
            setTimeout(function () {
                replaceTags(tags, display, t);
            },
            delay);
        }
    }
}

//************************
//Function rewriting the text of 'this page is a tag of'
/*Takes as arguments text to replace "this page is a tag of", an option to hide the whole section and an integer below 10
that controls how many times the script is run*/
function replaceTagOf(tagof, display, t) {
    t++;
    if (t < 10) {
        // checks if this page is a tag of something
        if ($('h1').filter(':contains("This page is a tag of:")')) {
            // checks to see if the display should be turned off
            if (display == 'n') {
                //turns the display off
                $('h1').filter(':contains("This page is a tag of:")').parent().css('display', 'none');
            }
            // replaces the header of the 'this page is a tag of' list with desired element and text
            $('h1').filter(':contains("This page is a tag of:")').replaceWith('<h1>' + tagof + '</h1>');
            var delay = 500;
            // reruns again after delay
            setTimeout(function () {
                replaceTagOf(tagof, display, t);
            },
            delay);
        } else {
            var delay = 500;
            // reruns again after delay
            setTimeout(function () {
                replaceTagOf(tagof, display, t);
            },
            delay);
        }
    }
}


//***********************(
//Function rewriting the title text of the path: 'contents'
/*Takes as arguments text to replace "contents", an option to hide the whole section and an integer below 10
that controls how many times the script is run*/
function replacePath(path, display, t) {
    t++;
    if (t < 10) {
        
        // checks if this page is has a path
        if ($('ol[class="path_of"')) {
            // checks to see if the display should be turned off
            if (display == 'n') {
                //turns the display off
                $('ol[class="path_of"').parent().css('display', 'none');
            }
            // replaces 'contents' with the users choice of text
            $('ol[class="path_of"').prev().replaceWith('<h1>' + path + '</h1>');
            // checks to see if the back button has a following nav button and if so makes it the primary nav
            if ($('#back-btn').next().hasClass('nav_btn')) {
                $('#back-btn').next().addClass('primary');
                $('#back-btn').next().css('display', 'inline-block');
            }
            // reruns again after delay
            var delay = 500;
            setTimeout(function () {
                replacePath(path, display, t);
            },
            delay);
        } else {
            var delay = 500;
            // reruns again after delay
            setTimeout(function () {
                replacePath(path, display, t);
            },
            delay);
        }
    }
}


//* 3. Globally Run Functions


//*** inserts header image and makes sure page titles are below it
function insertheader(func) {
// checks window height to decide about displaying the header image
    if ($(window).width() > 767) {
        height = $('#ScalarHeaderMenu').height();
    } else {
        height = $('div[class="navbar-header"]').height();
    }
    // adds the height of the nav + 10% to the padding-top
    $('article[class="page"]').css('padding-top', height + height * .1);
    // checks if header image is present
    if ($('#headerimg').length == 0) {
        // inserts header image above scalar header
        $('#ScalarHeaderMenu').prepend('<a href="' + omekaLoc + '"><img id="headerimg" src="http://iub.edu/~lodzdsc/omeka-2.1/themes/seasons/images/headersm.png"/></a>')
        $('article[class="page"]').css('padding-top', height + height * .1);
    }
}


// *******************************
// forwards a click on an image in an article/exhibit/text page to the omeka installation

function checkOmeka(func) {
    var a = performance.now();
    //gets the json of omeka files
    $.getJSON("http://www.iub.edu/~lodzdsc/omeka-2.3.1/api/files", function (json) {
        // goes through each media object on the page
        $('div.mediaelement').each(function () {
            
            // ************* As archive gets larger might want to switch to searching on individual files
            // ************* rather than the whole file JSON. Current limit 1000 files in JSON
            $(this).find('div.media_metadata').each(function () {
                
                //  fileLoc = $(this).find('td:contains("dcterms:sourceLocation")').next().text();
                // fileId = fileLoc.substring(fileLoc.lastIndexOf('/') + 1);
                //console.log('inloopID'+fileId);
                //console.log('inloopLOC'+fileLoc);
                // ************
                
                // gets the url with the filename
                fileName = $(this).find('td:contains("Source URL")').siblings().find('a').attr('href');
            })
            // checks to see if the file is an omeka item
            if (fileName.indexOf(omekaLoc + '/files') != -1) {
                
                // strips the url before the filename
                fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
                // checks for and strips any trailing question marks
                
                if (fileName.indexOf('?') != -1) {
                    fileName = fileName.substring(0, fileName.indexOf('?'));
                }
                
                // Goes through all the files in the omeka JSON
                for (var x = 0; x < json.length; x++) {
                    // finds the entry with a matching filename
                    if (fileName == json[x].filename) {
                        // sets a variable with the item url
                        var omekalink = omekaLoc + '/items/show/' + json[x].item.id
                        
                        // opens the item page in a new url
                        $(this).find('div[class="mediaContainer"]').click(function () {
                            window.open(omekalink, 'popout');
                            // console.log(omekalink);
                        })
                        // Runs whenever the media tabs are moused over. Below needs this to work
                        // for some reason
                        $(this).find('div[class="media_tabs"]').mouseover(function () {
                            
                            // opens the item page in a new url when source is clicked on.
                            $(this).find('div[class="media_tab"]:eq(2)').click(function () {
                                window.open(omekalink, 'popout');
                            })
                        })
                    }
                }
            }
        });
    })
    // checks script performance time
    var b = performance.now();
    console.log(b - a);
    $('.mediaelement mediaObject img').css('display', 'initial');
}

// **** repeatedly checks for images in article/exhibit/text pages
function imgCheck(func) {
    // Helps run max # of times
    
    // gets the body class
    var body = document.body.getAttribute('class');
    // will run up to 20 times (10 secs)
    
    // checks to see if it's on a text+media  or a path page
    if (body.indexOf("primary_role_composite") != -1 || body.indexOf("primary_role_path") != -1) {
        // Checks if there's media tabs loaded
        // Was mediaelement but sometimes that loaded before some of its children
        if ($('.media_tabs').length > 0) {
            // hides images until script runs and links are established
            $('.mediaelement mediaObject img').css('display', 'none');
            // if there is runs check omeka
            checkOmeka();
        }
    }
}


// ******** This function runs and reruns neccesary functions 10 times. This should be long enough
// for scalar to load everything needed for the functions to be effective
function runDelay(func) {
    
    // checks and reroutes images
    console.log(x);
    var delay = 500;
    // reruns again after delay
    setTimeout(function () {
        x++;
        if (x < 10) {
            checkOmeka();
            imgCheck();
            insertheader();
            runDelay();
        }
    },
    delay);
}

// *******************************
// To forward item pages to Omeka installation
function itemPage() {
    var body = document.body.getAttribute('class');
    // check if it's an item page
    if (body == "primary_role_media") {
        // find the omeka file page
        var omekaFile = $('a[rel="art:sourceLocation"]').attr('href');
        // check to make sure there's an omeka file page
        if (omekaFile) {
            // make sure the page stays blank until redirect
            $('body').css('display', 'none')
            // get the file ID #
            var fileId = omekaFile.substring(omekaFile.lastIndexOf('/') + 1);
            
            // get the url for the api request
            var omekaApi = omekaLoc + '/api/' + 'files/' + fileId
            // get the JSON
            $.getJSON(omekaApi, function (json) {
                
                // find the item id associated with the file
                var itemId = json.item.id;
                // create the item url
                var omekaItemLoc = omekaLoc + "/items/show/" + itemId
                // redirect to item page
                window.location.replace(omekaItemLoc);
            });
        }
    }
}

// ***********************************
// Make same page links (footnotes) functional
function footnotes() {
    // gets the current url, strips it of any existing hashtags
    var curUrl = $(location).attr('href').substr(0, $(location).attr('href').indexOf('#'));
    // if there were not hashtags gets current url
    if (curUrl < 1) {
        curUrl = $(location).attr('href');
    }
    // adds current url to the href preventing scalar from adding homepage
    $('a[title="return to article"],a[rel="footnote"]').each(function () {
        var ref = $(this).attr('href');
        $(this).attr('href', curUrl + ref);
    })
}

$(document).ready(function () {
    x = 0;
    runDelay();
});

$(window).on('resize', function () {
    insertheader();
})