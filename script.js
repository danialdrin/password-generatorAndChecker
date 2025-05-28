// Toast notification function
function showToast(message, duration = 3000) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Hide and remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

const copyButton = document.getElementById("copyBtn");
copyButton.addEventListener("click", () => {
    copyButton.innerHTML = '<img id="copyIcon" src="assets/checked-icon.svg" alt="copied">';
    showToast('Password copied to clipboard! 🎉');

    // Revert icon after 2 seconds
    setTimeout(() => {
        copyButton.innerHTML = '<img id="copyIcon" src="assets/copy-icon.svg" alt="copy">';
    }, 2000);
});

const sliderValue = document.getElementById("sliderValue");
const getSliderValue = document.getElementById("inputSlider");

getSliderValue.addEventListener("input", () => {
    const value = getSliderValue.value;
    sliderValue.innerText = value;
    // Removed generatePassword() - only generate when button is clicked
});

function calculateStrength(value) {
    if (value < 10) {
        return "weak";
    } else if (value >= 10 && value < 20) {
        return "medium";
    } else return "strong";
}

lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+']

const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");

const checkedArray = [lowercase, numbers]; // Only lowercase and numbers checked by default

lowercaseEl.addEventListener("change", updateCheckedArray);
uppercaseEl.addEventListener("change", updateCheckedArray);
numbersEl.addEventListener("change", updateCheckedArray);
symbolsEl.addEventListener("change", updateCheckedArray);

function updateCheckedArray() {
    // Clear checkedArray
    checkedArray.length = 0;

    // Populate checkedArray based on checkbox status
    if (lowercaseEl.checked) {
        checkedArray.push(lowercase);
    }
    if (uppercaseEl.checked) {
        checkedArray.push(uppercase);
    }
    if (numbersEl.checked) {
        checkedArray.push(numbers);
    }
    if (symbolsEl.checked) {
        checkedArray.push(symbols);
    }

    // Removed generatePassword() - only generate when button is clicked
}

let password = "";

function generatePassword() {
    if (checkedArray.length === 0) {
        showToast("Please select at least one character type! ⚠️", 2000);
        document.getElementById("passBox").value = "Select at least one option";
        return;
    }

    const passBox = document.getElementById("passBox");
    const genBtn = document.getElementById("genBtn");

    // Add loading state
    passBox.classList.add('loading');
    genBtn.classList.add('loading');
    passBox.value = "Generating...";
    genBtn.textContent = "Generating...";

    // Simulate generation delay for better UX
    setTimeout(() => {
        const value = getSliderValue.value;
        password = "";
        for (let i = 0; i < value; i++) {
            let selectedEl = checkedArray[Math.floor(Math.random() * checkedArray.length)];
            let passwordEl = selectedEl[Math.floor(Math.random() * selectedEl.length)];
            password += passwordEl;
        }

        // Remove loading state and show result
        passBox.classList.remove('loading');
        genBtn.classList.remove('loading');
        passBox.value = password;
        genBtn.textContent = "🚀 Generate Password";

        // Show success toast
        showToast("New password generated! 🔐", 2000);
    }, 500);
}

const genBtn = document.getElementById("genBtn");
genBtn.addEventListener("click", () => {
    generatePassword();
})

const copyBtn = document.getElementById("copyBtn");
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(password);
})

// Password Checker Elements
const checkPassBox = document.getElementById("checkPassBox");
const checkBtn = document.getElementById("checkBtn");
const toggleBtn = document.getElementById("toggleBtn");
const checkPassIndicator = document.getElementById("checkPassIndicator");
const checkPassLength = document.getElementById("checkPassLength");
const checkLowercase = document.getElementById("checkLowercase");
const checkUppercase = document.getElementById("checkUppercase");
const checkNumbers = document.getElementById("checkNumbers");
const checkSymbols = document.getElementById("checkSymbols");

// Toggle password visibility
toggleBtn.addEventListener("click", () => {
    const type = checkPassBox.getAttribute("type") === "password" ? "text" : "password";
    checkPassBox.setAttribute("type", type);

    // Update eye icon based on visibility state
    const icon = type === "password" ? "eye-off-icon.svg" : "eye-icon.svg";
    document.getElementById("toggleIcon").src = `assets/${icon}`;

    // Update tooltip text
    toggleBtn.title = type === "password" ? "Show password" : "Hide password";
});

// Check password function
function checkPassword() {
    const password = checkPassBox.value;

    if (!password) {
        showToast("Please enter a password to check! ⚠️", 2000);
        return;
    }

    // Add loading state
    checkBtn.classList.add('loading');
    checkBtn.textContent = "Checking...";

    // Reset all checkboxes
    checkLowercase.checked = false;
    checkUppercase.checked = false;
    checkNumbers.checked = false;
    checkSymbols.checked = false;

    // Simulate checking delay for better UX
    setTimeout(() => {
        // Check password length
        checkPassLength.textContent = password.length;

        // Check for character types
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSymbols = /[^a-zA-Z0-9]/.test(password);

        // Update checkboxes
        checkLowercase.checked = hasLowercase;
        checkUppercase.checked = hasUppercase;
        checkNumbers.checked = hasNumbers;
        checkSymbols.checked = hasSymbols;

        // Calculate strength
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (hasLowercase) strength++;
        if (hasUppercase) strength++;
        if (hasNumbers) strength++;
        if (hasSymbols) strength++;

        // Update strength indicator
        checkPassIndicator.classList.remove("strong", "medium", "weak");
        if (strength >= 5) {
            checkPassIndicator.classList.add("strong");
        } else if (strength >= 3) {
            checkPassIndicator.classList.add("medium");
        } else {
            checkPassIndicator.classList.add("weak");
        }

        // Remove loading state
        checkBtn.classList.remove('loading');
        checkBtn.textContent = "🔍 Check Password";

        // Show success toast
        showToast("Password analyzed! 🔍", 2000);
    }, 800);
}

// Add event listener for check button
checkBtn.addEventListener("click", checkPassword);