//local storage
const savedLanguage = localStorage.getItem('Language');
const savedFontSize = localStorage.getItem('Font-Size');
if (savedLanguage) {
  document.getElementById('Language').value = savedLanguage;
}
if (savedFontSize) {
  document.getElementById('Font-Size').value = savedFontSize;
  document.body.style.fontSize = savedFontSize;
}

// Add event listener to language select
document.getElementById('Language').addEventListener('change', (event) => {
  const language = event.target.value;
  localStorage.setItem('Language', language);
});

// Add event listener to font size select
document.getElementById('Font-Size').addEventListener('change', (event) => {
  const fontSize = event.target.value;
  localStorage.setItem('Font-Size', fontSize);
  document.body.style.fontSize = fontSize;
});

//Cookie functions

function setCookie(name, password, HighScore,Color){
document.cookie = "Username=" +name+ ";";
document.cookie = "Password=" +password+ ";";
document.cookie = "High Score=" + HighScore+ ";";
document.cookie = "Color=" + Color + ";"
}

function getCookie(name, password, HighScore, Color){
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name || cookieName === password || cookieName === HighScore || cookieName === Color) {
    return cookieValue;
    }
    }
    return null;   }

function showMessage(input, message, type){
    const msg = input.parentNode.querySelector("small");
    msg.innerText = message;
    input.className = type ? "success" : "error";

    if (!type) {
        msg.style.color = "red"; 
        input.style.border = "solid 2px red";
    } else {
        msg.style.color = ""; 
        input.style.border = "solid 1px black";
    }
    return type;
}

function showError(input, message) {
    return showMessage(input, message, false);
}

function showSuccess(input) {
    return showMessage(input, "", true);
}

function hasValue(input, message) {
    if (input.value.trim() === "") {
    return showError(input, message);
    }
    return showSuccess(input);
}

function validatePassword(input, requiredMsg, invalidMsg) {
    
    if (!hasValue(input, requiredMsg)) {
        return false;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
    const password = input.value.trim();
    if (!passwordRegex.test(password)) {
        return showError(input, invalidMsg);
    }
    return showSuccess(input);
}

const login = document.querySelector("#login");
const NAME_REQUIRED = "Please enter your name";
const PASSWORD_REQUIRED = "Please enter your password";
const PASSWORD_INVALID = "Your password must contain at least 6 characters, at least one digit, and one special character";
login.addEventListener("submit", function (event) {
    event.preventDefault();

    let form = event.target;
    let nameValid = hasValue(form.elements["Username"], NAME_REQUIRED);
    let passwordValid = validatePassword(form.elements["Password"], PASSWORD_REQUIRED, PASSWORD_INVALID);
    let name = document.getElementById('Username').value;
    let password = document.getElementById('Password').value;
    let HighScore = document.getElementById('HighScore').textContent;
    let color = document.body.style.backgroundColor;
    const Remember = document.getElementById('Remember');

    if (nameValid && passwordValid && Remember.checked) {
        setCookie(name, password, HighScore, color)
    }
});

const Decline = document.getElementById('Decline');
const Accept = document.getElementById('Accept');

Accept.addEventListener("click", function(){
    document.getElementById('login').style.display = 'block';
});

Decline.addEventListener("click", function(){
    document.getElementById('login').style.display = 'block';
    document.getElementById('Remember').style.display = 'none';
    document.getElementById('Remember-label').style.display = 'none';
})

//On load if we have cookies get cookies
window.onload = function() {
    // Retrieve values from cookies
    const username = getCookie('Username');
    const password = getCookie('Password');
    const highScore = getCookie('High Score');
    const color = getCookie('Color');

    // Set values to input fields
    if (username) {
        document.getElementById('Username').value = username;
    }
    if (password) {
        document.getElementById('Password').value = password;
    }
    if (highScore) {
        document.getElementById("HighScore").textContent = highScore;
    }
    if (color) {
        document.body.style.backgroundColor = color;
    }
    let fontSize = document.getElementById('Font-Size').value;
    document.body.style.fontSize = fontSize;
};
    



//Game Logic
var y
var HighScore = getCookie('High Score');
if(getCookie('High Score') === null){
 y = 0;}
else{
y = HighScore;
}

function Game() {
    var random = Math.floor(Math.random() * 1000) + 1;
    var x = random; 
    
    if (x > y) {
        y = x; 
    }

    let currentScore = document.getElementById("Score");
    currentScore.textContent = x;
    let highScore = document.getElementById("HighScore");
    highScore.textContent =  y;
}


//Password Visibility
const passwordInput = document.getElementById('Password');
const toggleVisibility = document.getElementById('ToggleVisibility');
toggleVisibility.addEventListener('change', function(){
    if(toggleVisibility.checked){
        passwordInput.type = 'text';
    }
    else{
        passwordInput.type = 'password';   
    }
});


//BackGround

function DarkMode(){
    document.body.style.backgroundColor = "#000000";
}

function LightMode(){
    document.body.style. backgroundColor = "#ffffff";
}

const BackGroundColor = document.getElementById('color');
const BackGround = document.body;
BackGroundColor.addEventListener('input', function() {
    const selectedColor = BackGroundColor.value;
    BackGround.style.backgroundColor = selectedColor;
});

//Reset

function Reset(){
    {
        document.cookie = "Username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "Password=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "Color=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "High Score=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        localStorage.removeItem('Language');
        localStorage.removeItem('Font-Size');
        x = 0;
        y = 0;
        document.getElementById("Score").textContent = 0;
        document.getElementById("HighScore").textContent = 0;
        document.body.style.backgroundColor = "#000";
        document.body.style.fontSize = "small";
    }
}