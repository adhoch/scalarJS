// sets the omeka location -- this could be changed to a test in functions
var omekaLoc = "http://www.iub.edu/~lodzdsc/omeka-2.3.1";
i = 0;



//************************
//Function rewriting the text of 'this page is tagged with' and deleting 'This page is a tag of'
//as well the path

/*Takes as arguments text to replace "this page is tagged with", the element to surround it with
and an integer below 10 that controls how many times the script is run*/
function replaceTags(text, elem,t) {
// increments t and test # of times script has run
t++;
if(t<10){
$('has_paths').remove();
if ($('h1').filter(':contains("This page is a tag of:")'))
{$('h1').filter(':contains("This page is a tag of:")').parent().css('display','none');}
// checks to see if the .has_tags class is present
    if ($('.has_tags').length != 0) {
    // replaces the header of the has tags list with desired element and text
        $('.has_tags').prev().replaceWith('<'+elem+'>'+text+'</elem>');
        var delay = 500;
        // reruns again after delay
        setTimeout(function () {
            replaceTags(text,elem,t);
        },
        delay);
    } else {
        var delay = 500;
        // reruns again after delay
        setTimeout(function () {
            replaceTags(text,elem,t);
        },
        delay);
    }
}
}
//*** Adds classes to tags/tagged by
function insertTagClass(func) {
    if ($('.has_tags').length != 0) {
    }
}


//*** inserts header image
function insertheader(func) {
    // checks if header image is present
    if ($('#headerimg').length == 0) {
        // inserts header image above scalar header
        $('#ScalarHeaderMenu').prepend('<a href="' + omekaLoc + '"><img id="headerimg" src="http://iub.edu/~lodzdsc/omeka-2.1/themes/seasons/images/headersm.png"/></a>')
        // needs a second run with a half second delay for some reason
        var delay = 500;
        // reruns again after delay
        setTimeout(function () {
            insertheader();
        },
        delay);
    } else {
        // sets a delay to check again
        //.5 seconds
        var delay = 500;
        // checks again after delay
        setTimeout(function () {
            insertheader();
        },
        delay);
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
function imgcheck(func) {
    // Helps run max # of times
    i++
    // gets the body class
    var body = document.body.getAttribute('class');
    // will run up to 20 times (10 secs)
    if (i < 20) {
        // checks to see if it's on a text+media  or a path page
        if (body.indexOf("primary_role_composite") != -1 || body.indexOf("primary_role_path") != -1) {
            // Checks if there's media tabs loaded
            // Was mediaelement but sometimes that loaded before some of its children
            if ($('.media_tabs').length > 0) {
                // hides images until script runs and links are established
                $('.mediaelement mediaObject img').css('display', 'none');
                // if there is runs check omeka
                checkOmeka();
                var delay = 500;
                // reruns again after delay
                setTimeout(function () {
                    checkOmeka();
                },
                delay);
            } else {
                // sets a delay to check again
                //.5 seconds
                var delay = 500;
                // checks again after delay
                setTimeout(function () {
                    imgcheck();
                },
                delay);
            }
        }
    }
}



$(document).ready(function () {
    
    
    var body = document.body.getAttribute('class');
    // *******************************
    // To forward item pages to Omeka installation
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
    
    // ***********************************
    
    // Make footnotes functional
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
    
    
    // checks and reroutes images
    imgcheck();
    //function to insert the Jewish Life in Interwar Lodz header
    // **** disabled for now
    //insertheader();
    
});