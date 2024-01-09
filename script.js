document.getElementById('encodeButton').addEventListener('click', function() {
    encodeOrDecode('encode');
});

document.getElementById('decodeButton').addEventListener('click', function() {
    encodeOrDecode('decode');
});

function encodeOrDecode(action) {
    var inputText = document.getElementById('inputText').value;
    var method = document.getElementById('method').value;
    var outputText = '';
    var shiftAmount = (method === 'shift') ? parseInt(document.getElementById('shiftAmount').value) : 3;

    switch (method) {
        case 'base64':
            outputText = action === 'encode' ? btoa(inputText) : atob(inputText);
            break;
        case 'url':
            outputText = action === 'encode' ? encodeURIComponent(inputText) : decodeURIComponent(inputText);
            break;
        case 'html':
            outputText = action === 'encode' ? encodeHTML(inputText) : decodeHTML(inputText);
            break;
        case 'hex':
            outputText = action === 'encode' ? stringToHex(inputText) : hexToString(inputText);
            break;
        case 'ascii':
            outputText = action === 'encode' ? stringToAscii(inputText) : asciiToString(inputText);
            break;
        case 'shift':
            outputText = action === 'encode' ? shiftCipherEncode(inputText, shiftAmount) : shiftCipherDecode(inputText, shiftAmount);
            break;
        // Add other encoding/decoding methods here
    }

    document.getElementById('outputText').value = outputText;
}

function methodChanged() {
    var method = document.getElementById('method').value;
    var optionsContainer = document.getElementById('additionalOptions');
    optionsContainer.innerHTML = '';

    if (method === 'shift') {
        var label = document.createElement('span');
        label.className = 'option-label';
        label.textContent = 'Shift Amount:';

        var input = document.createElement('input');
        input.type = 'number';
        input.id = 'shiftAmount';
        input.value = 3;
        input.min = 0;
        input.max = 25;

        optionsContainer.appendChild(label);
        optionsContainer.appendChild(input);
    }
    // Add additional options for other methods if needed
}

function shiftCipherEncode(str, amount) {
    if (amount < 0) 
        return shiftCipherEncode(str, amount + 26);

    var output = '';
    for (var i = 0; i < str.length; i++) {
        var c = str[i];
        if (c.match(/[a-z]/i)) {
            var code = str.charCodeAt(i);
            if ((code >= 65) && (code <= 90))
                c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
            else if ((code >= 97) && (code <= 122))
                c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }
        output += c;
    }
    return output;
}

function shiftCipherDecode(str, amount) {
    return shiftCipherEncode(str, -amount);
}

// Add additional encoding/decoding function implementations here

// Initialize with default method
methodChanged();

function encodeHTML(str) {
return str.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
return '&#'+i.charCodeAt(0)+';';
});
}

function decodeHTML(str) {
var txt = document.createElement('textarea');
txt.innerHTML = str;
return txt.value;
}

function stringToHex(str) {
return str.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("");
}

function hexToString(hex) {
var result = '';
for (var i = 0; i < hex.length; i += 2) {
result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
}
return result;
}

function stringToAscii(str) {
return str.split("").map(c => c.charCodeAt(0)).join(" ");
}

function asciiToString(ascii) {
return ascii.split(" ").map(c => String.fromCharCode(c)).join("");
}