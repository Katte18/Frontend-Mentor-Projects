// Switch between windows

const mainLink = document.querySelector(".main-container-link");
const generateLink = document.querySelector(".generate-container-link");

const mainContainer = document.querySelector(".main-container");
const generateContainer = document.querySelector(".generate-container");

mainLink.addEventListener("click", () => {
    mainContainer.style.display = "none";
    generateContainer.style.display = "initial";
});

generateLink.addEventListener("click", () => {
    generateContainer.style.display = "none";
    mainContainer.style.display = "initial";
});

// Generate QR code

const qrContainer = document.querySelector(".generate-container");
const qrInput = document.querySelector("#qr-generator-input");
const qrButton = document.querySelector(".qr-generate");
const qrImg = document.querySelector(".qr-img-container img");


// Input and QR code generator
qrButton.addEventListener("click", generateQrCode);
    function generateQrCode() {
        let qrValueInput = qrInput.value;
        if (!qrValueInput) return; // no user input return
        qrButton.innerText = "Generating QR code...";

        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValueInput}`;
        qrImg.addEventListener("load", () => {
            qrContainer.classList.add("generate-container-active");
            qrButton.innerText="Generate QR code";
        });    
}

// Enter keyboard setup
qrInput.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
        qrButton.click();
    }
});

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value) {
        qrContainer.classList.remove("generate-container-active");
    }
});


// Download QR code functionality
const qrImage = document.querySelector("#qr-img-generated");
const qrPngDownload = document.querySelector("#qr-png");
const qrJpgDownload = document.querySelector("#qr-jpg");

// download png format
qrPngDownload.addEventListener("click", e => {
    e.preventDefault();
    fetchFilePng(qrImage.src);
});

function fetchFilePng(url) {
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = "QRcode.png";
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }).catch(() => {
        alert("Failed to download QR code!")
    });
};


// download jpg format
qrJpgDownload.addEventListener("click", e => {
    e.preventDefault();
    fetchFileJpg(qrImage.src);
});

function fetchFileJpg(url) {
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = "QRcode.jpg";
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }).catch(() => {
        alert("Failed to download QR code!")
    });
};

// Change mode
const modeItem = document.querySelectorAll(".qr-mode-container li");

// properties
let properties = {
        width: 170,
        height: 170,
        type: "svg",
        margin: 0,
        backgroundOptions: {
            color: "white",
        },
        dotsOptions: {
            color: "#505ADC",
            type: "extra-rounded"
        },
        cornersSquareOptions:{
            type: "extra-rounded"
        },
        cornersDotOptions:{
            type: "dot"
        },
        imageOptions: {
            margin: 0,
            imageSize: 0.9
        }
}

modeItem.forEach(element => {
    element.addEventListener("click", function() {
        modeItem.forEach(mode => mode.classList.remove("active"))
        this.classList.add("active");
    });
});

modeItem[0].addEventListener("click", () => {
    properties.dotsOptions.color = 'black'
    properties.dotsOptions.type = 'square'
    properties.cornersSquareOptions.type = 'square'
    properties.cornersDotOptions.type = 'square'
    generateQr();
});

modeItem[1].addEventListener("click", () => {
    properties.dotsOptions.color = '#505ADC'
    properties.dotsOptions.type = 'extra-rounded'
    properties.cornersSquareOptions.type = 'extra-rounded'
    properties.cornersDotOptions.type = 'dot'
    generateQr();
});

modeItem[2].addEventListener("click", () => {
    properties.dotsOptions.color = '#505ADC'
    properties.dotsOptions.type = 'dots'
    properties.cornersSquareOptions.type = 'dot'
    properties.cornersDotOptions.type = 'dot'
    generateQr();
});

// mode function

const imgInput = document.querySelector(".qr-img-container");

qrButton.addEventListener("click", generateQr);

function generateQr() {
    if(qrInput.value) {
     imgInput.innerHTML = ''
        properties.data = qrInput.value;
        const qr = new QRCodeStyling(properties);
        qr.append(imgInput);
    } else {
        if (!qrInput.value) return;
    }
};











