function checkPalindrome() {
    let text = document.getElementById("text-input").value;
    let result = document.getElementById("result");

    if (text === "") {
        result.innerHTML = "⚠️ Please enter some text!";
        result.style.color = "red";
        return;
    }

    let cleanedText = text.toLowerCase().replace(/[^a-z0-9]/g, "");

    let reversedText = cleanedText.split("").reverse().join("");
    
    if (cleanedText === reversedText) {
        result.innerHTML = `✅ "${text}" is a palindrome!`;
        result.style.color = "green";
    } else {
        result.innerHTML = `❌ "${text}" is not a palindrome.`;
        result.style.color = "red";
    }
}
