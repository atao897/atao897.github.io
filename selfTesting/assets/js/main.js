/*
	Caminar by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

var count = 0;
var width = 200;
var padding = 0;
var choseLetter = 0;
var choseSymbol = 0;
var logMar = 0;
var logMarLeft = 1.1;
var onLine = 0;
var correctinLine = 0;
var totalinLine = 0;
var specialCase = 0;
var imageInLineArray = [1,2,3,4,5,6,7,8,9,10];
var instructionCount = 0;
var holdingLastElement = 0;
var movedUpOnce = 0;
var countLowest = 0;
var countHighest = 0;
var imagePixelArray = [];
var initalisationCorrect = true
var correctinLineLast = 0;
var randomLastLine = 0;
var sizeofImage = 0;
var sizeofImageLast = 0;
var TrialNumber = 1;
var Stimulus = 0;
var Response = 2;
var StimulusAppend = [];
var TrialNumberAppend = [];
var logMarAppend = [];
var ResponseAppend = [];


/*localStorage.setItem('distanceStorage', (distance))
localStorage.setItem('PXCMStorage',(PXCM))
localStorage.setItem('logMarStorage',(logMar))*/


function StartSymboltest() {
    // window.location.href='instructionAdult.html?child';
    // choseSymbol = 1; // huh?
    localStorage.selfortwo = "two";
    localStorage.letterorSymbol = "Symbol";
    localStorage.pageNum = "2";
    window.location.href='instructions1a.html';
}

function StartSymboltest_self() {
    // window.location.href='instructionAdult.html?child';
    // choseSymbol = 1; // huh?
    localStorage.selfornot = "self";
    localStorage.letterorSymbol = "Symbol";
    localStorage.pageNum = "2";
    window.location.href='instructions1a.html';
}

function StartLettertest() {
    localStorage.selfortwo = "two";
    localStorage.letterorSymbol = "Letter";
    localStorage.pageNum = "2";
    window.location.href='instructions99.html';
    // window.location.href='instructionAdult.html';
    // choseLetter = 1;
}

function StartLettertest_self() {
    localStorage.selfortwo = "self";
    // window.location.href='instructionAdult.html?child';
    // choseSymbol = 1; // huh?
    localStorage.letterorSymbol = "Symbol";
    localStorage.pageNum = "2";
    window.location.href='instructions99.html';
}

function continueTest(){
    var creditCard = document.getElementById("creditCardImage");
    var length = creditCard.style.width;
    var width = parseFloat(length,10) * 1.5939
    var PixelPerCm = width/8.5;
    localStorage.PixelPerCm = Math.floor(PixelPerCm);
    var MinPermissiblelogMAR = -0.1;
    var MinLetterSizePixels = 8;
    var MinPermissLetterSizeArcMin= (Math.pow(10,MinPermissiblelogMAR) * 5);
    var MinPermissLetterSizeCm = MinLetterSizePixels/PixelPerCm;
    var intermediate = MinPermissLetterSizeCm/2;
    var intermediate1 = Math.tan((3.14/180)*(1/60)* MinPermissLetterSizeArcMin/2)
    var LetterViewingDistance = intermediate/intermediate1;
    localStorage.LetterViewingDistance = Math.floor(LetterViewingDistance)
    console.log(localStorage.LetterViewingDistance)
    window.location.href='viewingDistanceLetter.html?child';
}

function continueTestLetter(){
    var creditCard = document.getElementById("creditCardImage");
    var length = creditCard.style.width;
    var width = parseFloat(length,10) * 1.5939
    var PixelPerCm = width/8.5;
    localStorage.PixelPerCm = Math.floor(PixelPerCm);
    var MinPermissiblelogMAR = -0.1;
    var MinLetterSizePixels = 5;
    var MinPermissLetterSizeArcMin= (Math.pow(10,MinPermissiblelogMAR) * 5)
    var MinPermissLetterSizeCm = MinLetterSizePixels/PixelPerCm;
    var intermediate = MinPermissLetterSizeCm/2;
    var intermediate1 = Math.tan((3.14/180)*(1/60)* MinPermissLetterSizeArcMin/2)
    var LetterViewingDistance = intermediate/intermediate1;
    localStorage.LetterViewingDistance = Math.floor(LetterViewingDistance)
    console.log(localStorage.LetterViewingDistance)
    window.location.href='viewingDistanceLetter.html';
}

function startTest(){
    var OneCmInDegrees      = 0.0175 * localStorage.distance*100;
                var PixelsPerDegree     =  OneCmInDegrees * localStorage.PixelPerCm


                    for (i = -1; i < 13; i++){
                        LogMARlines = i * 0.1
                        LogMARlines = Math.round(i*100)/1000
                        var LineSizesDeg = (5 * Math.pow(10,LogMARlines))/60
                        var LineSizesPixelsSloan  = Math.round(2.7844 * LineSizesDeg * PixelsPerDegree )
                        var largestSize = 0
                        
                        if (screen.width <= (screen.height-20)){
                            largestSize = screen.width
                        } else {
                            largestSize = screen.height-20
                        }
                        
                        
                        if ((LineSizesPixelsSloan >= 8) && (LineSizesPixelsSloan <= largestSize )){
                            imagePixelArray.push(LineSizesPixelsSloan)
                        }
                        
                        if (LineSizesPixelsSloan < 8){
                            countLowest = countLowest + 1
                        }
                        
                        if (LineSizesPixelsSloan > largestSize ){
                            countHighest = countHighest + 1
                        }
                    }
    localStorage.arrayPixels = imagePixelArray
    localStorage.countLowest = countLowest
    localStorage.countHighest = countHighest

// window.location.href='coverEyeChild.html'
window.location.href = 'test_self.html'
// window.location.href='coverEye.html'
}


function startTestLetter(){


    var OneCmInDegrees = 0.0175 * localStorage.distance * 100;
    var PixelsPerDegree = OneCmInDegrees * localStorage.PixelPerCm


    for (i = -1; i < 13; i++) {
        LogMARlines = i * 0.1;
        LogMARlines = Math.round(i * 100) / 1000;
        var LineSizesDeg = (5 * Math.pow(10, LogMARlines)) / 60;
        var LineSizesPixelsSloan = Math.round(2.2 * LineSizesDeg * PixelsPerDegree);
        if (localStorage.letterorSymbol == "Symbol")
            LineSizesPixelsSloan = Math.round(2.7844 * LineSizesDeg * PixelsPerDegree)
        var largestSize = 0

        if (screen.width <= (screen.height - 20)) {
            largestSize = screen.width
        } else {
            largestSize = screen.height - 20
        }


        if ((LineSizesPixelsSloan >= 8) && (LineSizesPixelsSloan <= largestSize)) {
            imagePixelArray.push(LineSizesPixelsSloan)
        }

        if (LineSizesPixelsSloan < 8) {
            countLowest = countLowest + 1
        }

        if (LineSizesPixelsSloan > largestSize) {
            countHighest = countHighest + 1
        }
    }

    localStorage.arrayPixels = imagePixelArray
    localStorage.countLowest = countLowest
    localStorage.countHighest = countHighest
    window.location.href = 'test_self_letter.html'
    // window.location.href = 'coverEye.html'
    // window.location.href = 'leftEyeLetter.html'
}


function Increase(){
     var creditcard = document.getElementById("creditCardImage");

    width = width * 1.025;
    creditcard.style = "width:" + width + "px";
}

function Decrease(){
     var creditcard = document.getElementById("creditCardImage");

    width = width * 0.975;
    creditcard.style = "width:" + width + "px";
        
}

function RandomLetters(){
    var random = Math.floor(Math.random() * 10) + 1;
    var imageName = 'letters/Pic' + random + '.svg';
    if (localStorage.phase == "firstPhase"){
    var img = document.getElementById("imageNew");
    }else{
        var img = document.getElementById("imageNew_page5");
    }
    img.src = imageName
}
                                 
                                 function funCheckBox150(){
        if (document.getElementById("150mcheckbox").checked == true){
            document.getElementById("300mcheckbox").checked = false
            document.getElementById("450mcheckbox").checked = false
            document.getElementById("600mcheckbox").checked = false
            localStorage.distance = 1.5
        }
    }
                                 
                                 function funCheckBox300(){
        if (document.getElementById("300mcheckbox").checked == true){
            document.getElementById("150mcheckbox").checked = false
            document.getElementById("450mcheckbox").checked = false
            document.getElementById("600mcheckbox").checked = false
            localStorage.distance = 3
        }
        
    }
                                 function funCheckBox450(){
        if (document.getElementById("450mcheckbox").checked == true){
            document.getElementById("300mcheckbox").checked = false
            document.getElementById("150mcheckbox").checked = false
            document.getElementById("600mcheckbox").checked = false
            localStorage.distance = 4.5
        }
        
    }
                                 function funCheckBox600(){
        if (document.getElementById("600mcheckbox").checked == true){
            document.getElementById("300mcheckbox").checked = false
            document.getElementById("450mcheckbox").checked = false
            document.getElementById("150mcheckbox").checked = false
            localStorage.distance = 6
        }
        
    }

/*function funCheckBox(){
var checkbox = document.getElementById("3mcheckbox");
        var checkbox50 = document.getElementById("50mcheckbox")
        if (checkbox.checked == true) {
            localStorage.distance = 3
            checkbox50.disabled = true;
        } else {
        checkbox50.disabled = false;
    }
}
             function funCheckBox50(){
             var checkbox50 = document.getElementById("50mcheckbox");
            var checkbox3 = document.getElementById("3mcheckbox")
                     if (checkbox50.checked == true) {
                         localStorage.distance = 0.5
                         checkbox3.disabled = true;
                     } else {
                     checkbox3.disabled = false;
                 }
             }*/


        function SaveData(Eye){
        if (Eye == 0){
            
            TrialNumberAppend.unshift(localStorage.FirstTrialNumber)
            StimulusAppend.unshift(localStorage.FirstStimulus)
            logMarAppend.unshift(localStorage.FirstlogMar)
            
            localStorage.TrialNumberAppend = TrialNumberAppend
            localStorage.StimulusAppend = StimulusAppend
            localStorage.logMarAppend = logMarAppend
            localStorage.ResponseAppend = ResponseAppend
        } else if (Eye == 1){
            
            TrialNumberAppend.unshift(localStorage.FirstTrialNumberLeft)
            StimulusAppend.unshift(localStorage.FirstStimulusLeft)
            logMarAppend.unshift(localStorage.FirstlogMarLeft)
            
            localStorage.TrialNumberAppendLeft = TrialNumberAppend
            localStorage.StimulusAppendLeft = StimulusAppend
            localStorage.logMarAppendLeft = logMarAppend
            localStorage.ResponseAppendLeft = ResponseAppend
        }
        
       /* console.log(localStorage.timeStamp)
        console.log(localStorage.TrialNumberAppend)
        console.log(localStorage.StimulusAppend)
        console.log(localStorage.logMarAppend)
        console.log(localStorage.ResponseAppend)
        console.log(localStorage.TrialNumberAppendLeft)
        console.log(localStorage.StimulusAppendLeft)
        console.log(localStorage.logMarAppendLeft)
        console.log(localStorage.ResponseAppendLeft)*/
        
    }

    function show(shown, hidden) {
        document.getElementById(shown).style.display='block';
        document.getElementById(hidden).style.display='none';
        return false;
      }
                                 
function Correct(Eye, Storage , stringPage, stringimageLocation){
    if (initalisationCorrect == true){
        logMar = 1.2 - (localStorage.countHighest)*0.1 - 0.1
        logMar = Math.round(logMar*100)/100;
        lowestlogMar = -0.1 + (localStorage.countLowest)*0.1
        lowestlogMar = Math.round(lowestlogMar*100)/100;
        var imagesize = localStorage.arrayPixels.split(',');
        sizeofImage = imagesize.length-2
        initalisationCorrect = false;
    }
        
    if (onLine == 0){ /*Moving between Lines*/
    totalinLine = 0;
    correctinLine = 0;
    specialCase = 0;
    logMar = logMar - 0.1;
    sizeofImage = sizeofImage - 1
    logMar = Math.round(logMar*100)/100;
            
       if (logMar < lowestlogMar) {
          logMar = lowestlogMar
           sizeofImageLast = 0
           console.log(sizeofImageLast)
          correctinLineLast = correctinLineLast + 1
          count = count + 1
          if (count == 5){
        logMar = 0.1 + logMar - correctinLineLast * 0.02
        logMar = Math.round(logMar*100)/100;
        Storage = logMar
              count = 0
              correctinLineLast = 0
              Response = 1
              ResponseAppend.push(Response)
              SaveData(Eye)
            if (localStorage.phase == "firstPhase"){
                return show("Page4","Page3")
            } else {
                window.location.href= "email.html"
            }  
            //   window.location.href= stringPage
          }
        }
    } else if (onLine == 1) { /*Moving on the Line*/
        totalinLine = totalinLine + 1
        correctinLine = correctinLine + 1
        if (correctinLine == 5) {
            logMar = logMar - 0.1;
            sizeofImage = sizeofImage - 1;
            logMar = Math.round(logMar*100)/100;
            if (logMar < lowestlogMar){
                logMar = lowestlogMar
                Storage = logMar
                Response = 1
                ResponseAppend.push(Response)
                SaveData(Eye)
                if (localStorage.phase == "firstPhase"){
                    return show("Page4","Page3")
                } else {
                    window.location.href= "email.html"
                }  
                // window.location.href= stringPage
            }
            specialCase = 1;
            correctinLine = 0;
            totalinLine = 0;
            imageInLineArray = [1,2,3,4,5,6,7,8,9,10]
        } else if (totalinLine == 5){
            logMar = 0.1 + logMar - correctinLine * 0.02
            logMar = Math.round(logMar*100)/100;
            Storage = logMar
            Response = 1
            ResponseAppend.push(Response)
            SaveData(Eye)
            if (localStorage.phase == "firstPhase"){
                return show("Page4","Page3")
            } else {
                window.location.href= "email.html"
            }  
            // window.location.href= stringPage
        }
    }
        
    if ((onLine == 0) && (count > 0)){
    for( var i = 0; i < imageInLineArray.length; i++){ if ( imageInLineArray[i] === randomLastLine) { imageInLineArray.splice(i, 1); }}
    randomLastLine = 0
    var random = imageInLineArray[Math.floor(Math.random() * imageInLineArray.length)];
        localStorage.symbolPic = random
        Stimulus = random
        for( var i = 0; i < imageInLineArray.length; i++){ if ( imageInLineArray[i] === random) { imageInLineArray.splice(i, 1); }}
        var imageName = stringimageLocation + random + '.svg';
        if (localStorage.phase == "firstPhase"){
        var img = document.getElementById("imageNew");
        } else {
        var img = document.getElementById("imageNew_page5");
        }
        img.src = imageName
    } else if (onLine == 0){
    var random = Math.floor(Math.random() * 10) + 1;
        Stimulus = random
    randomLastLine = random
    var imageName = stringimageLocation + random + '.svg';
    if (localStorage.phase == "firstPhase"){
        var img = document.getElementById("imageNew");
        } else {
        var img = document.getElementById("imageNew_page5");
        }
    img.src = imageName
    localStorage.symbolPic = random
    } else if (onLine == 1){
    var random = imageInLineArray[Math.floor(Math.random() * imageInLineArray.length)];
    Stimulus = random
    randomLastLine = random
    localStorage.symbolPic = random
    for( var i = 0; i < imageInLineArray.length; i++){ if ( imageInLineArray[i] === random) { imageInLineArray.splice(i, 1); }}
    var imageName = stringimageLocation + random + '.svg';
    if (localStorage.phase == "firstPhase"){
        var img = document.getElementById("imageNew");
        } else {
        var img = document.getElementById("imageNew_page5");
        }
    img.src = imageName
    }
        
    var imagesize = localStorage.arrayPixels.split(',');
        
        /*console.log(logMar)*/
        
        if (logMar == lowestlogMar){
            img.style = "width:" + imagesize[sizeofImageLast] + "px"
        } else {
    img.style = "width:" + imagesize[sizeofImage] + "px"
    }
        
    TrialNumber = TrialNumber + 1
    Response = 1
        
        TrialNumberAppend.push(TrialNumber)
        StimulusAppend.push(Stimulus)
        logMarAppend.push(logMar)
        ResponseAppend.push(Response)
    
        
    return logMar
        
}

function test(){
    console.log("incorrect my man")
}

function Incorrect(Eye, Storage , stringPage, stringimageLocation){
    if (initalisationCorrect == true){
        logMar = 1.2 - (localStorage.countHighest)*0.1 - 0.1
        logMar = Math.round(logMar*100)/100;
        lowestlogMar = -0.1 + (localStorage.countLowest)*0.1
        lowestlogMar = Math.round(lowestlogMar*100)/100;
        var imagesize = localStorage.arrayPixels.split(',');
        sizeofImage = imagesize.length-2
        initalisationCorrect = false;
    }
        if ((logMar == lowestlogMar) && (count > 0)){
            count = count + 1
            if (count == 5){
                logMar = 0.1 + logMar - correctinLineLast * 0.02
                logMar = Math.round(logMar*100)/100;
                Storage = logMar
                count = 0
                correctinLineLast = 0
                Response = 1
                ResponseAppend.push(Response)
                SaveData(Eye)
                if (localStorage.phase == "firstPhase"){
                    return show("Page4","Page3")
                } else {
                    window.location.href= "email.html"
                }    
            }        
        }else if (onLine == 0){
        logMar = logMar + 0.1
        sizeofImage = sizeofImage + 1
        logMar = Math.round(logMar*100)/100;
        onLine = 1;
        movedUpOnce = 1;
    } else {
        totalinLine = totalinLine + 1
        if (totalinLine == 5) {
        logMar = 0.1 + logMar - correctinLine * 0.02
        logMar = Math.round(logMar*100)/100;
        Storage = logMar
            Response = 1
            ResponseAppend.push(Response)
        SaveData(Eye)
        if (localStorage.phase == "firstPhase"){
            return show("Page4","Page3")
        } else {
            window.location.href= "email.html"
        }            
        // window.location.href= stringPage
        }
    }
    
    /*console.log(logMar)*/

            
    var random = imageInLineArray[Math.floor(Math.random() * imageInLineArray.length)];
    localStorage.symbolPic = random
    Stimulus = random
    for( var i = 0; i < imageInLineArray.length; i++){ if ( imageInLineArray[i] === random) { imageInLineArray.splice(i, 1); }}
    var imageName = stringimageLocation + random + '.svg';

    if (localStorage.phase == "firstPhase"){
        var img = document.getElementById("imageNew");
        } else {
        var img = document.getElementById("imageNew_page5");
        }

    img.src = imageName
        
    var imagesize = localStorage.arrayPixels.split(',');

        
    img.style = "width:" + imagesize[sizeofImage] + "px"
    
    Response = 0
    TrialNumber = TrialNumber + 1
        
        TrialNumberAppend.push(TrialNumber)
        StimulusAppend.push(Stimulus)
        logMarAppend.push(logMar)
        ResponseAppend.push(Response)
        
        return logMar
}
                             
/* json for instruction pages */

var instructionPages = [
    {
        "image":"ifrm0.html",
        "head":"Symbols",
        "html":"<p>The black and white symbols are what you will see in the test.</p>"
    },
    {
        "image":"images/instruct-1.svg",
        "head":"This test requires a smartphone",
        "html":"<p>Shortly, you will be presented with a QR code that when scanned with your smartphone camera will open up a keypad. The keypad will allow you to select the symbol you see on screen at distance.</p>",
        "extraClass":"tag"
    },
    {
        "image":"images/instruct-2.svg",
        "head":"You will need:",
        "html":"<ol><li><b class='red'>1</b>Any bank card to act as a ruler</li><li><b class='blue'>2</b>A way of setting the patients' distance from the screen (either a tape measure or two sheets of A4 paper)</li></ol>",
        "extraClass":"tag"
    },
    {
        "image":"ifrm3.html",
        "head":"Lets set up your display",
        "html":"<p>To calculate the size of your display, please place your bank card against the screen and increase or decrease the size of the blue image using the buttons until you can just see it poking out from under the card.</p>"
    },
    // {
    //     "image":"images/instruct-4.svg",
    //     "head":"Lets get ready to run the test",
    //     "html":"<p>Seat the patient comfortably.</p>"
    // },
    {
        "image":"images/instruct-5.svg",
        "head":"Make sure you have a clear view of the display",
        "html":"<p>You should wear your glasses unless you have been told not to by your clinician.</p>"
    },
    {
        "image":"ifrm6.html",
        "head":"Measure the distance",
        "html":"<p>You should be seated as far away as possible at one of these distances. Click your choice then use either a tape measure or the A4 sheets to measure the distance to the screen.</p>"
    },
    {
        "image":"images/instruct-7.svg",
        "head":"Both eyes will be tested seperately (starting with your right eye)",
        "html":"<p>Make sure you cover the correct eye (copy the picture if it helps!) It is very important they keep this eye covered during the test.</p>"
    },
    {
        "image":"images/instruct-8.svg",
        "head":"Next a letter or symbol will appear on the screen",
        "html":"<p>Click the chosen symbol on your smartphone keypad. There will be a few of these.</p>"
    },
    {
        "image":"images/instruct-9.svg",
        "head":"Once you click, a new symbol appears and you repeat the process",
        "html":"<p>The test gets tough. Take a guess if you don't know.</p>"
    },
    {
        "image":"images/instruct-10.svg",
        "head":"Once the test completes, switch your hand to the right eye",
        "html":"<p></p>"
    },
    {
        "image":"images/blank.png",
        "head":"Lets start the test!",
        "html":"<p></p>"
    }
];


function nextInstruction(){
    console.log("NEXT INSTRUCTION")
    var n = localStorage.pageNum>>0;
    n++;
    if (n>instructionPages.length){
    
        if (localStorage.letterorSymbol == "Letter"){
            console.log("NEXT letter")
            startTestLetter();
        } else {
            console.log("NEXT SYMBOL")
        startTest();
        }
        //document.location = "coverEye.html";
    }
    localStorage.pageNum = n;
    var ifrm = document.querySelector("iframe");
    if (ifrm)
        if (ifrm.contentWindow.SetBeforeNext)
            ifrm.contentWindow.SetBeforeNext();
    instructionSetter(n);
}

function instructionSetter(n){
    /* set active step number */
    var steps = document.querySelectorAll(".prog>i");
    var active = document.querySelector(".prog>i.active");
    if (active)
        active.classList.remove("active");
    steps[n-1].classList.add("active");
    var i = instructionPages[n-1];
    var imgdiv = document.querySelector(".img");
    var textdiv = document.querySelector(".text");
    if (i.image.substr(0,7)=="images/"){
        imgdiv.style.backgroundImage = "url("+i.image+")";
        imgdiv.innerHTML = "<p></p>";
    } else {
        imgdiv.style.backgroundImage = "";
        var ifrm = document.createElement("iframe");
        ifrm.src = i.image;
        ifrm.width = "100%";
        ifrm.height = "120%";
        imgdiv.appendChild(ifrm);
    }
    textdiv.firstElementChild.textContent = i.head;
    textdiv.firstElementChild.nextElementSibling.innerHTML = i.html;
    if (i.extraClass)
        imgdiv.className = "img "+i.extraClass;
    else
        imgdiv.className = "img";

}