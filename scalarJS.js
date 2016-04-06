window.addEventListener("load", function() {
var t=0;
var run=0;
navCss=$('style').append('.navbar li.mainMenu>.mainMenuDropdown>#mainMenuInside>li>ol>li>a:first-child:before{content:"";}.navbar .dropdown-menu li:hover, .navbar .dropdown-menu li:active{background-color:#cccccc;}div#contentCont h2 {color:white;text-align:center;margin-top:0;}')
var menuImg=0;
var medNum=$('a[resource]').length;
$('span[property="sioc:content"]').on("DOMNodeInserted.menu",function(e)
{ 
t++;
if ($('#omekaheaderlink').length==0){ insertHeader();
;}
menuImg=$('#wolfImage').length;
if (menuImg==0){
    $('#mainMenuInside').append($('<img style="width:100%;" id="wolfImage" src="http://www.iub.edu/~lodzdsc/omeka-2.3.1/themes/seasons/images/wolf.png"></img>'));
    }


    
    $('.navbar ul.dropdown-menu, .navbar-nav .open .dropdown-menu, .navbar ul.dropdown-menu ul.dropdown-menu, .navbar ul.dropdown-menu ul.dropdown-menu ul.dropdown-menu, .navbar .dropdown-menu li:hover, .navbar .dropdown-menu li:active').css('background-color','#cccccc');
    $('.navbar .mainMenuDropdown>#mainMenuInside').css({'width':'14rem', 'padding-bottom':'0'});
    $('.navbar li.mainMenu>.mainMenuDropdown>#mainMenuInside>li.header h2, .tocMenu .expandedPage h2.title').css({'padding':'0', 'text-align':'center'});
    $('.navbar li.mainMenu>.mainMenuDropdown>#mainMenuInside>li>ol>li>a, .tocMenu .expandedPage .relationships ol>li>a').css({'padding-left':'1.5rem', 'margin-left':'0'});
    $('#mainMenuSubmenus.tocMenu').css({'left':'14rem','margin-left':'0'})

    $('head').append(navCss)
    if(menuImg>0){$('span[property="sioc:content"]').off("DOMNodeInserted.menu")
    }
   })
$('span[property="sioc:content"]').on("DOMNodeInserted.header",function(e){
    
if (run==0 && $('.bg_screen').length>0)
{$('.bg_screen').after($('#omekaheaderlink'));

if($('#mt').length==0){
run++;
$('article').prepend($('<div style="position:absolute;margin-left:-15%;" id="mt"></div>'));

$('#mt').append($('#scalarheader'));
$('#ScalarHeaderMenuRight').css('display','none');
$('navMenu').css('display','none')
$('span[property="sioc:content"]').off("DOMNodeInserted.header")
}}})

$('span[property="sioc:content"]').on("DOMNodeInserted.media",function(e){
if(medNum*4 == $('.media_tab').length){
$('span[property="sioc:content"]').off("DOMNodeInserted.media")    
    console.log('done');

  checkOmeka();
            imgCheck();
insertFooter();
            tagPage();
                if($('#mt').length==0){$('article').prepend($('<div style="position:absolute;margin-left:-15%;" class="blah" id="mt"></div>'));

$('#mt').append($('#scalarheader'));
$('#ScalarHeaderMenuRight').css('display','none');
$('navMenu').css('display','none')
}

    }})
})
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
 *  d. itemPage
 *  e. tagPage
 *  f. footnotes
 *  g. runDelay
 */

//*** 1. Global Variables
// sets the omeka location -- this could be changed to a test in functions
var omekaLoc = "http://www.iub.edu/~lodzdsc/omeka-2.3.1";
var scalarLoc = "http://scalar.usc.edu/works/scalar-test-1-1"


//* 2. Functions available for individual pages but not run



//************************ replaceTags, replaceTagOf seem to break scalars tag visualization
// 2.a. replaceTags
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
//2.b. replaceTagOf
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


//***********************
//2.c. replacePath
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


//************ 3. Globally Run Functions
//3.a. insertHeader
//*** inserts header image and navbar and makes sure page titles are below it
function insertHeader(func) {
    // checks if header image is present
console.log('heaer');
        // inserts header image above scalar header
        $('#scalarheader').prepend('<a id="omekaheaderlink" href="' + omekaLoc + '"><img id="headerimg" src="http://www.iub.edu/~lodzdsc/omeka-2.3.1/files/theme_uploads/53233c3ff1774bbb40c52b5202034c3d.png"/></a>')
    
    // checks to see if scalar text has been hidden
    var scalpres = $('span.navbar-text').children('.book-title').css('display');
    if (scalpres != "none") {
        // hides scalar nav text
        $('span.navbar-text').children('.book-title').css('display', 'none');
        // inserts omeka navbar
        var omekanav = "<a class='omekanavitem' href='" + omekaLoc + "'>Home</a><a class='omekanavitem' href='" + scalarLoc + "/primer'>Primer</a><a class='omekanavitem' href='" + omekaLoc + "/items/browse'>Archive</a'><a class='omekanavitem' href='" + scalarLoc + "/exhibits'>Exhibits</a><a class='omekanavitem' href='" + scalarLoc + "/scholarship'>Scholarship</a><a class='omekanavitem' href='" + omekaLoc + "/about'>About</a>"
        $('span.navbar-text').append(omekanav);
    }
    // checks window height to decide about displaying the header image
    if ($(window).width() > 767) {
        height = $('#scalarheader').height();
    } else {
        height = $('div[class="navbar-header"]').height();
    }
    // adds the height of the nav + 10% to the padding-top
    //$('article[class="page"]').css('padding-top', height + height * .1);
 
}


// *******************************
//3.b. checkOmeka
// forwards a click on an image in an article/exhibit/text page to the omeka installation

function checkOmeka(func) {
    var a = performance.now();
    fileName="";
    //gets the json of omeka files
    $.getJSON("http://www.iub.edu/~lodzdsc/omeka-2.3.1/api/files", function (json) {
        // goes through each media object on the page
        $('div.mediaelement').each(function () {
            
            // ************* As archive gets larger might want to switch to searching on individual files
            // ************* rather than the whole file JSON. Current limit 1000 files in JSON
            $(this).find('div.media_metadata').each(function () {

                // fileLoc = $(this).find('td:contains("dcterms:sourceLocation")').next().text();
                // fileId = fileLoc.substring(fileLoc.lastIndexOf('/') + 1);
                // console.log('inloopID'+fileId);
                // console.log('inloopLOC'+fileLoc);
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
                            $(this).children().first().click(function () {
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
    console.log('check');
    $('.mediaelement mediaObject img').css('display', 'initial');
}
//***************
//3.c. imgCheck
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

// *******************************
//3.d. itemPage
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
//3.e. tagPge
// Displays omeka items with same tag on tag page
function tagPage(){
//Makes sure Omeka items are shown
$('.omekaItems').css('display','block');
//Makes sure Scalar items are hidden
$('[typeof="scalar:Media"]').parent().css('display','none');
// Checks to see if items have already been inserted
if ($('.omekaItems').length == 0) {
listItem='';
var body = $('body').attr('class');
// Checks if it's a tag page
if (body.indexOf("primary_role_tag")!=-1) {
// Gets the tag name and puts the api url in front of it
tag="http://www.iub.edu/~lodzdsc/omeka-2.3.1/api/items?tags="+$('title').first().text();
// gets all the items with the tag
$.getJSON(tag, function (item) {
for (var x=0; x< item.length;x++){
  // Gets the item id and inserts the appropriate url
  itemUrl=omekaLoc+'/items/show/'+item[x].id;
  // Gets the item title. Might make a little more robust by testing to see if the element is title
  // but this should always come first
  itemTitle=item[x].element_texts[0].text;
  // Creates a variable filled with the list items of the tag
  listItem=listItem+"<li><a href='"+itemUrl+"'>"+itemTitle+"</a></li>" 
}
// Double checks to see if items have already been inserted NEEDED
if ($('.omekaItems').length == 0 && listItem) {
// inserts an unordered list below the first relationship section. This should be "This page is tagged by"
$('section[class="relationships"]').first().after('<section class="omekaItems relationships" style="display: block;"><h1>Items on this Topic</h1><ul>'+listItem+'</ul></section>');
}

})
}
}
}
// ***********************************
//3.f. footnotes
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

// ******** This function runs and reruns neccesary functions 30 times. This should be long enough, 10 times wasn't
//3.g. runDelay
// for scalar to load everything needed for the functions to be effective
function runDelay(func) {
    
    // checks and reroutes images
    console.log(x);
    var delay = 500;
    // reruns again after delay
    setTimeout(function () {
        x++;
        if (x < 5) {
            checkOmeka();
            imgCheck();
            insertHeader();
           cinTest();
            tagPage();
            runDelay();            
        }
    },
    delay);
}



$(document).ready(function () {
    x = 0;

    footnotes();
    itemPage();
    
});

$(window).on('resize', function () {

cinTest();
})









function insertFooter() {
    if ($('footer[role]').length<1){
        
        $('article').append($('<div id="emptySpace"></div>'));
        $('html').append($('<footer id="omekaFooter" role="contentinfo"> <div id="custom-footer-text">\
                        <table id="footerTable">\
<tbody>\
<tr>\
<td><a style="text-decoration: none; font-variant: small-caps; color: #4a3c31;" href="http://www.iu.edu/copyright/index.shtml">Copyright</a></td>\
<td><a href="http://www.iub.edu"><img src="http://www.iub.edu/~lodzdsc/omeka-2.3.1/themes/seasons/images/iulogo.png" alt=""></a></td>\
<td><a href="http://www.lodz.ap.gov.pl/index.php"> <img src="http://www.iub.edu/~lodzdsc/omeka-2.3.1/themes/seasons/images/aplLogo.png" alt=""></a></td>\
<td><a href="http://www.muzeumwlokiennictwa.pl/?lang=en"><img src="http://www.iub.edu/~lodzdsc/omeka-2.3.1/themes/seasons/images/cmwLogo.png" alt=""></a></td>\
<td><img src="http://www.iub.edu/~lodzdsc/omeka-2.3.1/themes/seasons/images/patronatLogo.png" alt=""></td>\
</tr>\
</tbody>\
</table>                                </div>\
</footer>'));
$('#omekaFooter').append($('div#footer')[0]);
    }
    
}

function cinTest(){
var contentCont=$('<div id="contentCont"></div>');
var contentSpan =$('span[property="sioc:content"]');
if($('#contentCont').length==0){contentCont.append(contentSpan.children())
contentSpan.append(contentCont);
}
var chalkHeight= $(window).height()-contentSpan.offset().top;
var chalkWidth=contentSpan.width();

console.log(chalkHeight);
contentSpan.css({
    'height':chalkHeight
})

$('body').append('style')
var contentContWidth=(($('article').width()-chalkWidth)/2)+chalkWidth;
$('#contentCont').css('width', contentContWidth+'px');
$('#contentCont').css('padding-right', contentContWidth*.1+'px');
$('.navbar li.mainMenu>.mainMenuDropdown>#mainMenuInside>li.static').css('padding','0');
$('.body_copy').css({'max-width': '100%', 'padding': '0'});
}