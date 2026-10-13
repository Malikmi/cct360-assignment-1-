
// clues (true once the player finds them)
let foundGlass = false;
let foundTornPage = false;
let foundCalendar = false;
let foundGlove = false;
let foundEdwardLetter = false;
let foundMissingKey = false;
let foundSecondGlass = false;
let foundAshes = false;
let foundWill = false;
let foundSlip = false;

// game state
let clueTotal = 0;
let totalClues = 10;
let actionCount = 0;
let drawerOpen = false;
let soundOn = false;
let currentSuspect = "";
let drawerCode = "1979";
let cluesNeededToAccuse = 5;

// html elements
let clueCount = document.getElementById("clueCount");
let clueList = document.getElementById("clueList");
let casebook = document.getElementById("casebook");
let statusMsg = document.getElementById("statusMsg");
let rain = document.getElementById("rain");
let btnSound = document.getElementById("btnSound");
let btnAccuse = document.getElementById("btnAccuse");
let foyerText = document.getElementById("foyerText");
let portraitText = document.getElementById("portraitText");

let goStudy = document.getElementById("goStudy");
let goBedroom = document.getElementById("goBedroom");
let goKitchen = document.getElementById("goKitchen");
let goLibrary = document.getElementById("goLibrary");
let goDrawing = document.getElementById("goDrawing");

let studyText = document.getElementById("studyText");
let bedroomText = document.getElementById("bedroomText");
let kitchenText = document.getElementById("kitchenText");
let libraryText = document.getElementById("libraryText");
let drawerCodeInput = document.getElementById("drawerCode");

let suspectImg = document.getElementById("suspectImg");
let suspectName = document.getElementById("suspectName");
let suspectRole = document.getElementById("suspectRole");
let answerText = document.getElementById("answerText");
let q1 = document.getElementById("q1");
let q2 = document.getElementById("q2");
let q3 = document.getElementById("q3");
let q4 = document.getElementById("q4");

let accuseText = document.getElementById("accuseText");


//clues

function getClueText(id) {
    if (id === "glass") { return "Brandy glass next to the body. It smells bitter, like something was added to the brandy."; }
    if (id === "tornPage") { return "Safe: the bottom half of a letter to his lawyer: \"...destroy the will I signed on Tuesday.\" The top half is missing."; }
    if (id === "calendar") { return "Calendar: Thursday 9:00, meeting with Mr. Price (lawyer) to \"undo Tuesday's mistake.\" Tuesday's will is locked in the library desk and the code is the year Arthur started the company."; }
    if (id === "glove") { return "A red evening glove on the floor of Arthur's bedroom. Victoria is wearing red tonight."; }
    if (id === "edwardLetter") { return "Half-written note to Edward: \"The manor will not be yours. I have made my decision.\""; }
    if (id === "missingKey") { return "The spare STUDY key is missing from the key board in the kitchen."; }
    if (id === "secondGlass") { return "A second brandy glass in the kitchen sink, just washed. Arthur wasn't drinking alone."; }
    if (id === "ashes") { return "Burned paper in the library fireplace. It's the top half of the letter from the safe. It says £400,000 is missing from the company accounts."; }
    if (id === "will") { return "Arthur's will, signed Tuesday: almost everything goes to Julian. Victoria and Edward get £5,000 each."; }
    return "Julian said \"something in his brandy\", but nobody had told him about the brandy.";   // slip
}

function hasClue(id) {
    if (id === "glass") {
        return foundGlass;
    } else if (id === "tornPage") {
        return foundTornPage;
    } else if (id === "calendar") {
        return foundCalendar;
    } else if (id === "glove") {
        return foundGlove;
    } else if (id === "edwardLetter") {
        return foundEdwardLetter;
    } else if (id === "missingKey") {
        return foundMissingKey;
    } else if (id === "secondGlass") {
        return foundSecondGlass;
    } else if (id === "ashes") {
        return foundAshes;
    } else if (id === "will") {
        return foundWill;
    } else {
        return foundSlip;
    }
}

function findClue(id) {
    if (hasClue(id) === false) {
        if (id === "glass") {
            foundGlass = true;
        } else if (id === "tornPage") {
            foundTornPage = true;
        } else if (id === "calendar") {
            foundCalendar = true;
        } else if (id === "glove") {
            foundGlove = true;
        } else if (id === "edwardLetter") {
            foundEdwardLetter = true;
        } else if (id === "missingKey") {
            foundMissingKey = true;
        } else if (id === "secondGlass") {
            foundSecondGlass = true;
        } else if (id === "ashes") {
            foundAshes = true;
        } else if (id === "will") {
            foundWill = true;
        } else {
            foundSlip = true;
        }

        clueTotal = clueTotal + 1;
        statusMsg.innerHTML = "New clue added to casebook (" + clueTotal + "/" + totalClues + ")";
        updateCasebook();
    }
}

function updateCasebook() {
    clueCount.innerHTML = clueTotal;

    let html = "";

    if (foundGlass === true) { html = html + "<li>" + getClueText("glass") + "</li>"; }
    if (foundTornPage === true) { html = html + "<li>" + getClueText("tornPage") + "</li>"; }
    if (foundCalendar === true) { html = html + "<li>" + getClueText("calendar") + "</li>"; }
    if (foundGlove === true) { html = html + "<li>" + getClueText("glove") + "</li>"; }
    if (foundEdwardLetter === true) { html = html + "<li>" + getClueText("edwardLetter") + "</li>"; }
    if (foundMissingKey === true) { html = html + "<li>" + getClueText("missingKey") + "</li>"; }
    if (foundSecondGlass === true) { html = html + "<li>" + getClueText("secondGlass") + "</li>"; }
    if (foundAshes === true) { html = html + "<li>" + getClueText("ashes") + "</li>"; }
    if (foundWill === true) { html = html + "<li>" + getClueText("will") + "</li>"; }
    if (foundSlip === true) { html = html + "<li>" + getClueText("slip") + "</li>"; }

    if (clueTotal === 0) {
        html = "<li>No clues yet.</li>";
    }

    clueList.innerHTML = html;
}

function toggleCasebook() {
    if (casebook.className === "hidden") {
        casebook.className = "";
    } else {
        casebook.className = "hidden";
    }
}


// scenes

function showScene(sceneId) {
    document.getElementById("intro").className = "scene";
    document.getElementById("foyer").className = "scene";
    document.getElementById("study").className = "scene";
    document.getElementById("bedroom").className = "scene";
    document.getElementById("kitchen").className = "scene";
    document.getElementById("library").className = "scene";
    document.getElementById("drawing").className = "scene";
    document.getElementById("interview").className = "scene";
    document.getElementById("accuse").className = "scene";
    document.getElementById("ending").className = "scene";

    document.getElementById(sceneId).className = "scene active";
}

function goToFoyer() {
    updateFoyer();
    showScene("foyer");
}

function goToDrawing() {
    showScene("drawing");
}

// every click that looks for something or asks a question counts as an action
function takeAction() {
    actionCount = actionCount + 1;
}

// the family gets more restless the more actions you take
function getMood() {
    if (actionCount < 8) {
        return "The house is quiet and the family is waiting in the drawing room.";
    } else if (actionCount < 16) {
        return "The family is starting to whisper to each other in the drawing room.";
    } else if (actionCount < 24) {
        return "The family is getting restless. Someone keeps asking how much longer this will take.";
    } else {
        return "It's getting late and the family is tired and angry. Dawn isn't far away.";
    }
}

// a room gets a check mark once all of its clues are found
function updateRooms() {
    if (foundGlass === true && foundTornPage === true && foundCalendar === true) {
        goStudy.className = "room-card visited";
    } else {
        goStudy.className = "room-card";
    }

    if (foundEdwardLetter === true && foundGlove === true) {
        goBedroom.className = "room-card visited";
    } else {
        goBedroom.className = "room-card";
    }

    if (foundMissingKey === true && foundSecondGlass === true) {
        goKitchen.className = "room-card visited";
    } else {
        goKitchen.className = "room-card";
    }

    if (foundAshes === true && foundWill === true) {
        goLibrary.className = "room-card visited";
    } else {
        goLibrary.className = "room-card";
    }
}

function updateFoyer() {
    if (clueTotal >= cluesNeededToAccuse) {
        btnAccuse.disabled = false;
        btnAccuse.innerHTML = "Make an accusation";
    } else {
        btnAccuse.disabled = true;
        btnAccuse.innerHTML = "Make an accusation (" + clueTotal + "/" + cluesNeededToAccuse + " clues)";
    }

    let clueLine = "";
    if (clueTotal === 0) {
        clueLine = "You haven't found any clues yet. Where do you want to start?";
    } else if (clueTotal < totalClues) {
        clueLine = "You have " + clueTotal + " of " + totalClues + " clues.";
    } else {
        clueLine = "You found every clue. It's time to name the killer.";
    }

    foyerText.innerHTML = getMood() + " " + clueLine;

    if (actionCount >= 16) {
        foyerText.className = "story tense";
    } else {
        foyerText.className = "story";
    }

    updateRooms();
}

// shows text on a paper note
function showNote(element, text) {
    takeAction();
    element.innerHTML = text;
    element.className = "paper typed";
}

function lookAtPortrait() {
    takeAction();
    portraitText.innerHTML = "<p>A big oil painting of Arthur in a dark suit. A brass plate under it says:</p>" +
        "<p><strong>ARTHUR BLACKWOOD<br>Founder of Blackwood &amp; Co.<br>Established 1979</strong></p>";
    portraitText.className = "paper typed";
}


// ---------- rooms ----------

function examineGlass() {
    showNote(studyText, "<p>A crystal glass with a little brandy left in it. You smell it and there is something bitter underneath the brandy. " +
        "The police didn't test it.</p>");
    findClue("glass");
}

function checkSafe() {
    showNote(studyText, "<p>The safe is open. Inside there is only the <strong>bottom half</strong> of a letter, torn straight across:</p>" +
        "<p><em>\"...and therefore I instruct you to destroy the will I signed on Tuesday. Yours, A. Blackwood.\"</em></p>" +
        "<p>Someone took the top half. Why?</p>");
    findClue("tornPage");
}

function readCalendar() {
    showNote(studyText, "<p>Arthur's desk calendar for Thursday says:</p>" +
        "<p><em>\"9:00 Mr. Price (lawyer). Undo Tuesday's mistake.\"</em></p>" +
        "<p>In the margin he wrote: <em>\"Tuesday's will is in the library desk. The code is the year I started the company.\"</em></p>");
    findClue("calendar");
}

function openNightstand() {
    showNote(bedroomText, "<p>Under a pair of reading glasses there is a half-written note:</p>" +
        "<p><em>\"Edward, I know what I promised you, but the manor will not be yours. I have made my decision.\"</em></p>");
    findClue("edwardLetter");
}

function searchFloor() {
    showNote(bedroomText, "<p>Half under the bed there is a <strong>red silk evening glove</strong>, the kind a woman would wear. " +
        "Victoria is in a red dress tonight, and she told the police she never came upstairs.</p>");
    findClue("glove");
}

function checkKeys() {
    showNote(kitchenText, "<p>Every room has its own hook for its key, but one hook is empty. The label under it says " +
        "<strong>STUDY (SPARE)</strong>.</p><p>Whoever took it could have locked the study from the outside.</p>");
    findClue("missingKey");
}

function lookInSink() {
    showNote(kitchenText, "<p>There is a crystal brandy glass in the sink. It has been rinsed and it's still wet. It matches the glass in the study.</p>" +
        "<p>So Arthur wasn't drinking alone tonight.</p>");
    findClue("secondGlass");
}

function searchFire() {
    showNote(libraryText, "<p>Most of the paper in the fireplace is ash, but one scorched piece is still readable. It's the <strong>top half</strong> of the letter from the safe:</p>" +
        "<p><em>\"Dear Mr. Price, I have found that £400,000 is missing from the company accounts. Only someone who works with the books could have taken it, and...\"</em></p>");
    findClue("ashes");
}

function tryDrawer() {
    if (drawerOpen) {
        showWill();
        return;
    }
    if (drawerCodeInput.value === drawerCode) {
        drawerOpen = true;
        showWill();
    } else {
        if (hasClue("calendar") === true) {
            showNote(libraryText, "<p>The lock doesn't open. Arthur's calendar said the code is the year he started the company. " +
                "Maybe something in the house shows that year.</p>");
        } else {
            showNote(libraryText, "<p>The lock doesn't open. You need a 4-digit code and you don't know what it is yet.</p>");
        }
        drawerCodeInput.value = "";
    }
}

function showWill() {
    showNote(libraryText, "<p><strong>Click.</strong> Inside the drawer is a legal document signed on Tuesday.</p>" +
        "<p><em>\"...I leave Blackwood Manor, my shares in Blackwood &amp; Co., and the rest of my estate " +
        "to my nephew, <strong>Julian Blackwood</strong>...\"</em></p>" +
        "<p>Victoria and Edward get five thousand pounds each. Julian gets everything else.</p>");
    findClue("will");
}


// ---------- interviews ----------

function getFullName(person) {
    if (person === "victoria") { return "Victoria Blackwood"; }
    if (person === "edward") { return "Edward Blackwood"; }
    if (person === "julian") { return "Julian Blackwood"; }
    return "Mrs. Hale";
}

function getRole(person) {
    if (person === "victoria") { return "Arthur's daughter. She spends a lot of money and has a lot of debt."; }
    if (person === "edward") { return "Arthur's son. He was always told the manor would be his one day."; }
    if (person === "julian") { return "Arthur's nephew. He runs the company's accounts."; }
    return "The housekeeper. She has worked here for 22 years and notices everything.";
}

function getQuestion(person, number) {
    if (number === 1) { return "Where were you tonight?"; }
    if (number === 2) { return "What did you expect to inherit?"; }

    if (person === "victoria" && number === 3) { return "Then why was your glove in his bedroom?"; }
    if (person === "edward" && number === 3) { return "He wrote that the manor won't be yours."; }
    if (person === "julian" && number === 3) { return "These burned papers say £400,000 is missing from the accounts."; }
    if (person === "julian" && number === 4) { return "Where is the spare study key?"; }
    if (person === "hale" && number === 3) { return "Who used the second brandy glass?"; }
    if (person === "hale" && number === 4) { return "Who knew where the spare key was?"; }
    return "";
}

// which clue unlocks question 3 or 4 ("" means there is no question)
function getUnlockClue(person, number) {
    if (person === "victoria" && number === 3) { return "glove"; }
    if (person === "edward" && number === 3) { return "edwardLetter"; }
    if (person === "julian" && number === 3) { return "ashes"; }
    if (person === "julian" && number === 4) { return "missingKey"; }
    if (person === "hale" && number === 3) { return "secondGlass"; }
    if (person === "hale" && number === 4) { return "missingKey"; }
    return "";
}

function getAnswer(person, number) {
    if (person === "victoria") {
        if (number === 1) { return "\"I was down here all evening. I never went upstairs, not once.\""; }
        if (number === 2) { return "\"Money, I guess. Father always said I spend too much of it.\""; }
        return "\"Okay, fine. I went up around 9:40 to ask him for money. He was in his bedroom, alive, and really angry. " +
            "He kept shouting about <em>betrayal</em>. I left in tears around ten. I swear he was alive when I left.\"";
    }
    if (person === "edward") {
        if (number === 1) { return "\"I was in the garden having a cigarette. I needed some air after dinner.\""; }
        if (number === 2) { return "\"The manor. Father promised it to me years ago. Everybody knows that.\""; }
        return "\"He told me tonight. I was angry, I'll admit that. But I went straight out to the garden " +
            "and stayed there. Ask Mrs. Hale, she could see me from the window.\"";
    }
    if (person === "julian") {
        if (number === 1) {
            if (hasClue("glass") === true) {
                return "\"I was in the library, going through the company books. Poor Uncle Arthur. " +
                    "Who would put <strong>something in his brandy</strong>?\"<br><br>" +
                    "<em>(Wait. Nobody told the family about the brandy.)</em>";
            }
            return "\"I was in the library, going through the company books. I can't believe Uncle Arthur is gone.\"";
        }
        if (number === 2) { return "\"Me? Nothing really. Uncle trusted me with the company and that was enough for me.\""; }
        if (number === 3) { return "\"Those are just accounting errors. Uncle understood, we had already sorted it out.\""; }
        return "\"How would I know? I never go in the kitchen.\"";
    }
    // Mrs. Hale
    if (number === 1) {
        return "\"Miss Victoria went upstairs around 9:40 and came back down crying around ten. After that Master Edward " +
            "was out in the garden. I could see his cigarette from the window.\"";
    }
    if (number === 2) { return "\"Me? Nothing, dear. I'm just the housekeeper.\""; }
    if (number === 3) {
        return "\"Mr. Arthur asked for brandy, so I put a tray with two glasses on the counter around half past ten. " +
            "When I came back it was gone and I didn't see who took it. Miss Victoria was in the drawing room by then and " +
            "Master Edward was in the garden. The only one I didn't see for a while was Mr. Julian.\"";
    }
    return "\"Only the family knows where the keys hang. The spare study key was there at nine, I'd swear to it.\"";
}

function showInterview(person) {
    currentSuspect = person;
    suspectImg.src = "images/" + person + ".jfif";
    suspectName.innerHTML = getFullName(person);
    suspectRole.innerHTML = getRole(person);
    answerText.innerHTML = "<em>They look up as you walk in.</em>";

    q1.innerHTML = getQuestion(person, 1);
    q2.innerHTML = getQuestion(person, 2);
    setupConfrontButton(q3, person, 3);
    setupConfrontButton(q4, person, 4);

    showScene("interview");
}

// questions 3 and 4 only show up once you have the clue that unlocks them
function setupConfrontButton(button, person, number) {
    let neededClue = getUnlockClue(person, number);
    if (neededClue !== "" && hasClue(neededClue)) {
        button.innerHTML = getQuestion(person, number);
        button.className = "confront";
    } else {
        button.className = "confront hidden";
    }
}

function ask(number) {
    takeAction();
    // Julian only slips up if you already found the glass
    if (currentSuspect === "julian" && number === 1 && hasClue("glass") === true) {
        findClue("slip");
    }
    answerText.innerHTML = getAnswer(currentSuspect, number);
}

function ask1() { ask(1); }
function ask2() { ask(2); }
function ask3() { ask(3); }
function ask4() { ask(4); }


// ---------- accusation ----------

function openAccuse() {
    accuseText.className = "paper hidden";
    showScene("accuse");
}

function accuse(person) {
    let sure = confirm("Are you sure you want to accuse " + getFullName(person) + " of killing Arthur Blackwood?");
    if (sure === false) {
        return;
    }

    let text = "";

    if (person === "julian") {
        // you need a motive (will + ashes) and an opportunity (slip or second glass)
        let motive = hasClue("will") && hasClue("ashes");
        let opportunity = hasClue("slip") || hasClue("secondGlass");

        if (motive && opportunity) {
            showScene("ending");
            return;
        }
        text = "<p>Julian laughs. <em>\"Based on what, Detective?\"</em></p>";
        if (!motive) {
            text += "<p>You can't prove <strong>why</strong> he would do it yet. What did he get from Arthur's will, and what was Arthur about to do?</p>";
        }
        if (!opportunity) {
            text += "<p>You also can't prove he was <strong>with Arthur</strong> tonight.</p>";
        }
    } else if (person === "victoria") {
        text = "<p>Victoria lied about going upstairs, but Mrs. Hale saw her come back down at ten, and the brandy " +
            "wasn't taken until half past ten. She lied, but that doesn't make her the killer.</p>";
    } else if (person === "edward") {
        text = "<p>Edward had a reason to be angry, but he was in the garden from ten on and Mrs. Hale could see him " +
            "from the window. That doesn't fit.</p>";
    } else {
        text = "<p>Mrs. Hale doesn't get anything from the will and she has trouble with the stairs. " +
            "It doesn't make sense for her to be the one.</p>";
    }

    accuseText.innerHTML = text + "<p><em>Go back and look again. Check your casebook.</em></p>";
    accuseText.className = "paper typed";
}

function accuseVictoria() { accuse("victoria"); }
function accuseEdward() { accuse("edward"); }
function accuseJulian() { accuse("julian"); }
function accuseHale() { accuse("hale"); }


// sound and restart button

function toggleSound() {
    if (soundOn) {
        soundOn = false;
        rain.pause();
        btnSound.innerHTML = "Sound: off";
    } else {
        soundOn = true;
        rain.volume = 0.4;
        rain.play();
        btnSound.innerHTML = "Sound: on";
    }
}

function restart() {
    foundGlass = false;
    foundTornPage = false;
    foundCalendar = false;
    foundGlove = false;
    foundEdwardLetter = false;
    foundMissingKey = false;
    foundSecondGlass = false;
    foundAshes = false;
    foundWill = false;
    foundSlip = false;

    clueTotal = 0;
    actionCount = 0;
    drawerOpen = false;
    drawerCodeInput.value = "";
    studyText.className = "paper typed hidden";
    bedroomText.className = "paper typed hidden";
    kitchenText.className = "paper typed hidden";
    libraryText.className = "paper typed hidden";
    portraitText.className = "paper typed hidden";
    statusMsg.innerHTML = "Welcome, Detective.";
    updateCasebook();
    updateFoyer();
    showScene("intro");
}


// ---------- buttons ----------

document.getElementById("btnCasebook").addEventListener("click", toggleCasebook);
document.getElementById("btnCloseCasebook").addEventListener("click", toggleCasebook);
btnSound.addEventListener("click", toggleSound);
document.getElementById("btnRestart").addEventListener("click", restart);

// intro and foyer
document.getElementById("btnBegin").addEventListener("click", goToFoyer);
goStudy.addEventListener("click", function () { showScene("study"); });
goBedroom.addEventListener("click", function () { showScene("bedroom"); });
goKitchen.addEventListener("click", function () { showScene("kitchen"); });
goLibrary.addEventListener("click", function () { showScene("library"); });
goDrawing.addEventListener("click", goToDrawing);
document.getElementById("btnPortrait").addEventListener("click", lookAtPortrait);
btnAccuse.addEventListener("click", openAccuse);

// rooms
document.getElementById("clueGlass").addEventListener("click", examineGlass);
document.getElementById("clueSafe").addEventListener("click", checkSafe);
document.getElementById("clueCalendar").addEventListener("click", readCalendar);
document.getElementById("clueNightstand").addEventListener("click", openNightstand);
document.getElementById("clueFloor").addEventListener("click", searchFloor);
document.getElementById("clueKeys").addEventListener("click", checkKeys);
document.getElementById("clueSink").addEventListener("click", lookInSink);
document.getElementById("clueFire").addEventListener("click", searchFire);
document.getElementById("btnDrawer").addEventListener("click", tryDrawer);

// interviews
document.getElementById("talkVictoria").addEventListener("click", function () { showInterview("victoria"); });
document.getElementById("talkEdward").addEventListener("click", function () { showInterview("edward"); });
document.getElementById("talkJulian").addEventListener("click", function () { showInterview("julian"); });
document.getElementById("talkHale").addEventListener("click", function () { showInterview("hale"); });
q1.addEventListener("click", ask1);
q2.addEventListener("click", ask2);
q3.addEventListener("click", ask3);
q4.addEventListener("click", ask4);
document.getElementById("backToDrawing").addEventListener("click", goToDrawing);

// accusation
document.getElementById("accuseVictoria").addEventListener("click", accuseVictoria);
document.getElementById("accuseEdward").addEventListener("click", accuseEdward);
document.getElementById("accuseJulian").addEventListener("click", accuseJulian);
document.getElementById("accuseHale").addEventListener("click", accuseHale);
document.getElementById("btnPlayAgain").addEventListener("click", restart);

// back buttons
document.getElementById("backFromStudy").addEventListener("click", goToFoyer);
document.getElementById("backFromBedroom").addEventListener("click", goToFoyer);
document.getElementById("backFromKitchen").addEventListener("click", goToFoyer);
document.getElementById("backFromLibrary").addEventListener("click", goToFoyer);
document.getElementById("backFromDrawing").addEventListener("click", goToFoyer);
document.getElementById("backFromAccuse").addEventListener("click", goToFoyer);

updateCasebook();
updateFoyer();