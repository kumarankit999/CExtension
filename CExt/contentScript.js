// Intercept the user's copy command
document.addEventListener("copy", function(event) {
    // Store the copied content
    const clipboardData = event.clipboardData || window.clipboardData;
    const copiedText = window.getSelection().toString();
    clipboardData.setData("text/plain", copiedText);
    event.preventDefault();
});

// Inject the stored content on the website
document.addEventListener("paste", function(event) {
    // Get the stored content
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData("text/plain");
    
    // Insert the content into the active element
    const activeElement = document.activeElement;
    if (activeElement) {
        const selectionStart = activeElement.selectionStart;
        const selectionEnd = activeElement.selectionEnd;
        const value = activeElement.value;
        activeElement.value = value.slice(0, selectionStart) + pastedText + value.slice(selectionEnd);
    } else {
        document.execCommand("insertText", false, pastedText);
    }
    
    // Remove the stored content from the clipboard
    setTimeout(function() {
        clipboardData.setData("text/plain", "");
    }, 1);
    
    event.preventDefault();
});

// Prevent JavaScript injection
const scriptTags = document.getElementsByTagName("script");
for (let i = 0; i < scriptTags.length; i++) {
    const scriptTag = scriptTags[i];
    scriptTag.parentNode.removeChild(scriptTag);
}

// Prevent CSS injection
const linkTags = document.getElementsByTagName("link");
for (let i = 0; i < linkTags.length; i++) {
    const linkTag = linkTags[i];
    if (linkTag.rel === "stylesheet") {
        linkTag.parentNode.removeChild(linkTag);
    }
}

// Prevent HTML injection
document.body.innerHTML = document.body.innerHTML.replace(/<iframe.*?>.*?<\/iframe>/gi, "");
document.body.innerHTML = document.body.innerHTML.replace(/<script.*?>.*?<\/script>/gi, "");
document.body.innerHTML = document.body.innerHTML.replace(/<link.*?>.*?<\/link>/gi, "");
document.body.innerHTML = document.body.innerHTML.replace(/<style.*?>.*?<\/style>/gi, "");
document.body.innerHTML = document.body.innerHTML.replace(/<object.*?>.*?<\/object>/gi, "");
document.body.innerHTML = document.body.innerHTML.replace(/<embed.*?>.*?<\/embed>/gi, "");
