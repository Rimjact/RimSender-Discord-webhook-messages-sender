/* 
========= RimSender - Discord Webhook Messages =========
This is simple app for Windows, MacOS and Linux for send messages at Discord chat using webhooks.

v1.0.0 (14.02.2024) | © Rimjact, 2024

https://discord.com/api/webhooks/1207377802265890886/vr1cLZM0ZIWzHbe6BbPmkAN7z-LfswVBWGS9DnRhf8bP6WRmqQ--CzesZ2eumNLz6Aib

https://avatars.mds.yandex.net/i?id=0fceee14b22e67476834281b5f6dbbd3f444f5bb-9843573-images-thumbs&n=13

Cool Story Bob
*/

/* ===== ELEMENTS ===== */
// Sections
const sectionMessageSimple = document.querySelector('#message-simple'),
    sectionMessageEmbed = document.querySelector('#message-embed');

// Main inputs
const inputWebhookURL = document.querySelector('#input-webhook-url'),
    inputAvatarURL = document.querySelector('#input-avatar-url'),
    inputAuthor = document.querySelector('#input-author');

// Radio buttons
const radioBtnMessageSimple = document.querySelector('#radio-simple-msg'),
    radioBtnMessageEmbed = document.querySelector('#radio-embed-msg');

// Simple message inputs
const inputSimpleMessageText = document.querySelector('#input-simple-text');

// Embed message inputs
const inputEmbedMessageTitle = document.querySelector('#input-embed-title'),
    inputEmbedMessageColor = document.querySelector('#input-embed-color'),
    inputEmbedMessageText = document.querySelector('#input-embed-text');

// Status label
const labelStatus = document.querySelector('#label-status');

// Send button
const buttonSend = document.querySelector('#button-send');

/* ===== VARIABLES ===== */
let currentMessageType = "simple";
let errorColor = "#ee3232",
    successfulColor = "#5eee32";

/* ===== FUNCTIONS ===== */
// Toggle a message type between "simple" and "embed"
function toggleMessageType() {
    if (radioBtnMessageSimple.checked) {
        sectionMessageSimple.classList.remove('hided');
        sectionMessageEmbed.classList.add('hided');

        currentMessageType = "simple";
    } else {
        sectionMessageSimple.classList.add('hided');
        sectionMessageEmbed.classList.remove('hided');

        currentMessageType = "embed";
    }

    console.log('Current message type switched to: ' + currentMessageType);
}

// Send a message by webhook
function sendMessage() {
    console.log('Message send started.');

    let checkResoult = checkInputs();

    if (checkResoult !== "") {
        updateStatus(checkResoult, errorColor);
        return;
    }

    console.log('Check complete.');

    let request = new XMLHttpRequest();
    request.open('POST', inputWebhookURL.value);
    request.setRequestHeader('Content-type', 'application/json');

    console.log('Request created.');

    // Create params for request
    let params = {  };

    if (currentMessageType === "simple") {
        // For simple message
        params = {
            username: inputAuthor.value,
            avatar_url: inputAvatarURL.value,
            content: inputSimpleMessageText.value
        };

        console.log('Simple message params created.');
    } else {
        // For embed message
        let colorText = inputEmbedMessageColor.value.replace( '#', '' );
        let colorNum = Number('0x' + colorText);

        params = {
            username: inputAuthor.value,
            avatar_url: inputAvatarURL.value,
            embeds: [{
                "title": inputEmbedMessageTitle.value,
                "description": inputEmbedMessageText.value,
                "color": colorNum
            }]
        };

        console.log('Embed message params created.');
    }

    // Send request
    request.send(JSON.stringify(params));

    updateStatus("Message sent successfully.\nInputs data saved.", successfulColor);
    console.log('Request sended.');

    saveMainInputsData();
}

// Validate inputs values for message sending. Return a message of the problem 
function checkInputs() {
    console.log('Inputs check started.')

    if (inputWebhookURL.value === "")
        return "Please, enter a webhook URL.";

    if (!isValidWebhookUrl(inputWebhookURL.value))
        return "Please, enter correct webhook URL.";

    console.log('Webhook URL — OK.');

    if (inputAvatarURL.value === "")
        return "Please, enter a avatar URL.";

    if (!isValidAvatarUrl(inputAvatarURL.value))
        return "Please, enter correct avatar URL.";

    console.log('Avatar URL — OK.');

    if (inputAuthor.value === "")
        return "Please, enter a author of a message.";

    console.log('Author — OK.');

    if (currentMessageType === "simple" && inputSimpleMessageText.value === "")
        return "Please, enter a text to your message.";

    console.log('Simple message text — OK.');
    
    if (currentMessageType === "embed" && inputEmbedMessageTitle.value === "")
        return "Please, enter a title to your embed message.";

    console.log('Embed message title — OK.');

    if (currentMessageType === "embed" && inputEmbedMessageText.value === "")
        return "Please, enter a text to your embed message.";

    console.log('Embed message text — OK.');

    return "";
}

// Check a string is valid Webhook URL
function isValidWebhookUrl(string) {
    return string.startsWith('https://discord.com/api/webhooks/');
} 

// Check a string is valid URL
function isValidAvatarUrl(string) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    return !!pattern.test(string);
}

// Update status label text
function updateStatus(status, color) {
    labelStatus.innerHTML = status;
    labelStatus.style.color = color;
}

// Load a data of the inputs from userdata file
function loadMainInputsData() {
    app.getUserDataPath().then((userDataPath) => {
        const filePath = path.join(userDataPath, 'rimsender_userdata.json');

        const data = saveData.load(filePath);

        if (!data) return; 

        inputWebhookURL.value = data.webhookURL;
        inputAvatarURL.value = data.avatarURL;
        inputAuthor.value = data.author;

        console.log('A main inputs data loaded.')
    });   
}

// Save a data of the inputs from userdata file
function saveMainInputsData() {
    app.getUserDataPath().then((userDataPath) => {
        const filePath = path.join(userDataPath, 'rimsender_userdata.json');

        const data = {
            webhookURL: inputWebhookURL.value,
            avatarURL: inputAvatarURL.value,
            author: inputAuthor.value
        }
    
        saveData.save(filePath, data);
        console.log('A main inputs data saved.')
    });
}

/* ===== EVENT LISTENERS ===== */
radioBtnMessageSimple.addEventListener('click', toggleMessageType);
radioBtnMessageEmbed.addEventListener('click', toggleMessageType);

buttonSend.addEventListener('click', sendMessage);

document.addEventListener('DOMContentLoaded', loadMainInputsData);