

const photoInput = document.getElementById("photoInput");
const uploadBox = document.getElementById("uploadBox");
const uploadDefault = document.getElementById("uploadDefault");
const uploadedImage = document.getElementById("uploadedImage");

const nameInput = document.getElementById("nameInput");
const roleInput = document.getElementById("roleInput");
const titleInput = document.getElementById("titleInput");

const cardImage = document.getElementById("cardImage");
const cardPhoto = document.getElementById("cardPhoto");

const cardName = document.getElementById("cardName");
const cardRole = document.getElementById("cardRole");
const cardTitle = document.getElementById("cardTitle");

const uploadPreview = document.getElementById("uploadPreview");

const randomTitleBtn = document.getElementById("randomTitleBtn");
const suggestionButtons = document.querySelectorAll(".suggestion");

const downloadBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");

const formStatus = document.getElementById("formStatus");
const successMessage = document.getElementById("successMessage");



const builderTitles = [
    "THE PROMPT ALCHEMIST",
    "PIXEL PIRATE",
    "CODE NOMAD",
    "AI BEACH BUILDER",
    "DEBUGGING SURFER",
    "THE CODE EXPLORER",
    "DIGITAL WAVE RIDER",
    "THE AI ARCHITECT",
    "GOA CODE CRAFTER",
    "THE CREATIVE BUILDER"
];



let uploadedPhoto = null;



document.addEventListener("DOMContentLoaded", () => {

    updateCard();

    titleInput.value = "THE PROMPT ALCHEMIST";

    updateCard();

});



uploadBox.addEventListener("click", () => {
    photoInput.click();
});


uploadBox.addEventListener("keydown", (event) => {

    if (event.key === "Enter" || event.key === " ") {

        event.preventDefault();

        photoInput.click();

    }

});


uploadBox.addEventListener("dragover", (event) => {

    event.preventDefault();

    uploadBox.classList.add("dragging");

});


uploadBox.addEventListener("dragleave", () => {

    uploadBox.classList.remove("dragging");

});


uploadBox.addEventListener("drop", (event) => {

    event.preventDefault();

    uploadBox.classList.remove("dragging");

    const file = event.dataTransfer.files[0];

    if (file) {

        processImage(file);

    }

});


photoInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) {
        return;
    }

    processImage(file);

});



function processImage(file) {

    const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/heic",
        "image/heif"
    ];

    const fileType = file.type.toLowerCase();

    const isImage = validTypes.includes(fileType);

    if (!isImage) {

        showError("PLEASE UPLOAD JPG, PNG OR HEIC.");

        return;

    }


 

    if (
        fileType === "image/heic" ||
        fileType === "image/heif" ||
        file.name.toLowerCase().endsWith(".heic") ||
        file.name.toLowerCase().endsWith(".heif")
    ) {

        showError(
            "HEIC MAY NOT BE SUPPORTED BY YOUR BROWSER. PLEASE USE JPG OR PNG."
        );

        return;

    }


    const reader = new FileReader();


    reader.onload = function (event) {

        const image = new Image();


        image.onload = function () {

            uploadedPhoto = image;

            uploadedImage.src = event.target.result;

            cardImage.src = event.target.result;

            uploadBox.classList.add("has-image");

            cardPhoto.classList.add("has-image");

            formStatus.textContent = "";

            updateCard();

        };


        image.onerror = function () {

            showError("COULD NOT READ THIS IMAGE. TRY ANOTHER PHOTO.");

        };


        image.src = event.target.result;

    };


    reader.onerror = function () {

        showError("IMAGE COULD NOT BE LOADED.");

    };


    reader.readAsDataURL(file);

}



nameInput.addEventListener("input", updateCard);

roleInput.addEventListener("input", updateCard);

titleInput.addEventListener("input", updateCard);



function updateCard() {

    const name = nameInput.value.trim();

    const role = roleInput.value.trim();

    const title = titleInput.value.trim();


    cardName.textContent =
        name || "YOUR NAME";


    cardRole.textContent =
        role || "YOUR STACK / ROLE";


    cardTitle.textContent =
        title || "THE PROMPT ALCHEMIST";

}



suggestionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        titleInput.value = button.textContent.trim();

        updateCard();

        titleInput.focus();

    });

});



randomTitleBtn.addEventListener("click", () => {

    const randomIndex =
        Math.floor(Math.random() * builderTitles.length);

    titleInput.value = builderTitles[randomIndex];

    updateCard();

    randomTitleBtn.animate(
        [
            {
                transform: "rotate(0deg)"
            },
            {
                transform: "rotate(-12deg)"
            },
            {
                transform: "rotate(0deg)"
            }
        ],
        {
            duration: 350
        }
    );

});



function validateForm() {

    clearError();


    if (!uploadedPhoto) {

        showError("UPLOAD YOUR PHOTO FIRST.");

        uploadBox.focus();

        return false;

    }


    if (!nameInput.value.trim()) {

        showError("ADD YOUR NAME.");

        nameInput.focus();

        return false;

    }


    if (!roleInput.value.trim()) {

        showError("ADD YOUR STACK / ROLE.");

        roleInput.focus();

        return false;

    }


    if (!titleInput.value.trim()) {

        titleInput.value = builderTitles[0];

        updateCard();

    }


    return true;

}



function showError(message) {

    formStatus.textContent = message;

    formStatus.animate(
        [
            {
                opacity: 0
            },
            {
                opacity: 1
            }
        ],
        {
            duration: 200
        }
    );

}


function clearError() {

    formStatus.textContent = "";

}



function roundedRect(
    ctx,
    x,
    y,
    width,
    height,
    radius
) {

    const r = Math.min(radius, width / 2, height / 2);

    ctx.beginPath();

    ctx.moveTo(x + r, y);

    ctx.lineTo(x + width - r, y);

    ctx.quadraticCurveTo(
        x + width,
        y,
        x + width,
        y + r
    );

    ctx.lineTo(
        x + width,
        y + height - r
    );

    ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - r,
        y + height
    );

    ctx.lineTo(
        x + r,
        y + height
    );

    ctx.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - r
    );

    ctx.lineTo(x, y + r);

    ctx.quadraticCurveTo(
        x,
        y,
        x + r,
        y
    );

    ctx.closePath();

}



function drawImageCover(
    ctx,
    image,
    x,
    y,
    width,
    height
) {

    const imageRatio =
        image.width / image.height;

    const targetRatio =
        width / height;


    let sourceWidth = image.width;

    let sourceHeight = image.height;

    let sourceX = 0;

    let sourceY = 0;


    if (imageRatio > targetRatio) {

        sourceWidth =
            image.height * targetRatio;

        sourceX =
            (image.width - sourceWidth) / 2;

    } else {

        sourceHeight =
            image.width / targetRatio;

        sourceY =
            (image.height - sourceHeight) / 2;

    }


    ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        x,
        y,
        width,
        height
    );

}



function drawText(
    ctx,
    text,
    x,
    y,
    font,
    color,
    align = "left"
) {

    ctx.font = font;

    ctx.fillStyle = color;

    ctx.textAlign = align;

    ctx.textBaseline = "alphabetic";

    ctx.fillText(text, x, y);

}


function drawWrappedText(
    ctx,
    text,
    x,
    y,
    maxWidth,
    lineHeight,
    font,
    color
) {

    ctx.font = font;

    ctx.fillStyle = color;

    ctx.textAlign = "left";

    const words = text.split(" ");

    let line = "";

    let currentY = y;


    for (let i = 0; i < words.length; i++) {

        const testLine =
            line + words[i] + " ";

        const metrics =
            ctx.measureText(testLine);

        if (
            metrics.width > maxWidth &&
            i > 0
        ) {

            ctx.fillText(
                line.trim(),
                x,
                currentY
            );

            line =
                words[i] + " ";

            currentY += lineHeight;

        } else {

            line = testLine;

        }

    }


    ctx.fillText(
        line.trim(),
        x,
        currentY
    );

}



function drawPalm(
    ctx,
    x,
    y,
    scale = 1
) {

    ctx.save();

    ctx.translate(x, y);

    ctx.scale(scale, scale);

    ctx.fillStyle = "#043e2f";



    ctx.beginPath();

    ctx.moveTo(0, 120);

    ctx.lineTo(10, 0);

    ctx.lineTo(18, 0);

    ctx.lineTo(9, 120);

    ctx.closePath();

    ctx.fill();



    const leaves = [
        [-65, -25, -0.45],
        [-50, -5, -0.2],
        [-25, -45, -0.05],
        [10, -50, 0.2],
        [35, -28, 0.45],
        [55, -3, 0.65]
    ];


    leaves.forEach(([lx, ly, rotation]) => {

        ctx.save();

        ctx.translate(8, 5);

        ctx.rotate(rotation);

        ctx.beginPath();

        ctx.ellipse(
            lx,
            ly,
            48,
            10,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    });


    ctx.restore();

}


async function renderCardToCanvas() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 1200;

    canvas.height = 1500;

    const ctx = canvas.getContext("2d");



    const GREEN = "#075b42";

    const DEEP_GREEN = "#043e2f";

    const YELLOW = "#f5d33b";

    const CREAM = "#f5eedb";

    const PINK = "#ed7d7d";


    ctx.fillStyle = GREEN;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    ctx.beginPath();

    ctx.arc(
        1040,
        430,
        300,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = YELLOW;

    ctx.fill();



    ctx.save();

    ctx.beginPath();

    ctx.arc(
        1040,
        430,
        300,
        0,
        Math.PI * 2
    );

    ctx.clip();

    ctx.strokeStyle =
        "rgba(7,91,66,0.25)";

    ctx.lineWidth = 16;


    for (
        let y = 170;
        y < 700;
        y += 42
    ) {

        ctx.beginPath();

        ctx.moveTo(700, y);

        ctx.lineTo(1300, y);

        ctx.stroke();

    }

    ctx.restore();


    drawText(
        ctx,
        "HH",
        75,
        105,
        "72px 'Bebas Neue'",
        YELLOW
    );

    drawText(
        ctx,
        "GOA",
        180,
        105,
        "130px 'Bebas Neue'",
        YELLOW
    );

    drawText(
        ctx,
        "2026",
        730,
        100,
        "105px 'Bebas Neue'",
        CREAM
    );


    drawText(
        ctx,
        "BUILDER",
        1090,
        70,
        "20px 'DM Mono'",
        DEEP_GREEN,
        "right"
    );

    drawText(
        ctx,
        "ID",
        1090,
        102,
        "32px 'DM Mono'",
        DEEP_GREEN,
        "right"
    );

    drawPalm(
        ctx,
        1060,
        700,
        1.35
    );

    const photoX = 80;

    const photoY = 215;

    const photoW = 660;

    const photoH = 620;

    ctx.beginPath();

    ctx.arc(
        755,
        220,
        80,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = PINK;

    ctx.fill();

    ctx.save();

    roundedRect(
        ctx,
        photoX,
        photoY,
        photoW,
        photoH,
        80
    );

    ctx.clip();


    if (uploadedPhoto) {

        drawImageCover(
            ctx,
            uploadedPhoto,
            photoX,
            photoY,
            photoW,
            photoH
        );

    } else {

        const gradient =
            ctx.createLinearGradient(
                photoX,
                photoY,
                photoX + photoW,
                photoY + photoH
            );

        gradient.addColorStop(
            0,
            DEEP_GREEN
        );

        gradient.addColorStop(
            1,
            GREEN
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            photoX,
            photoY,
            photoW,
            photoH
        );


        drawText(
            ctx,
            "YOUR",
            photoX + photoW / 2,
            photoY + photoH / 2 - 10,
            "80px 'Bebas Neue'",
            "rgba(245,238,219,.55)",
            "center"
        );

        drawText(
            ctx,
            "PHOTO",
            photoX + photoW / 2,
            photoY + photoH / 2 + 75,
            "80px 'Bebas Neue'",
            "rgba(245,238,219,.55)",
            "center"
        );

    }

    ctx.restore();

    ctx.strokeStyle = CREAM;

    ctx.lineWidth = 14;

    roundedRect(
        ctx,
        photoX,
        photoY,
        photoW,
        photoH,
        80
    );

    ctx.stroke();

    ctx.fillStyle = YELLOW;

    ctx.fillRect(
        610,
        795,
        180,
        50
    );

    drawText(
        ctx,
        "NO. 026",
        700,
        829,
        "18px 'DM Mono'",
        DEEP_GREEN,
        "center"
    );

    const name =
        nameInput.value.trim() ||
        "YOUR NAME";

    const role =
        roleInput.value.trim() ||
        "YOUR STACK / ROLE";

    const title =
        titleInput.value.trim() ||
        "THE PROMPT ALCHEMIST";


    drawText(
        ctx,
        "BUILDER / CREATOR",
        80,
        930,
        "18px 'DM Mono'",
        YELLOW
    );

    let nameSize = 95;

    if (name.length > 18) {
        nameSize = 72;
    }

    if (name.length > 25) {
        nameSize = 58;
    }

    drawText(
        ctx,
        name.toUpperCase(),
        80,
        1010,
        `${nameSize}px 'Bebas Neue'`,
        CREAM
    );


    ctx.fillStyle = YELLOW;

    ctx.fillRect(
        80,
        1038,
        120,
        8
    );


    drawText(
        ctx,
        "STACK / ROLE",
        80,
        1080,
        "14px 'DM Mono'",
        "rgba(245,238,219,.55)"
    );


    drawText(
        ctx,
        role.toUpperCase(),
        80,
        1112,
        "25px 'DM Mono'",
        CREAM
    );


    drawText(
        ctx,
        "BUILDER TITLE",
        80,
        1160,
        "14px 'DM Mono'",
        "rgba(245,238,219,.55)"
    );


    drawWrappedText(
        ctx,
        title.toUpperCase(),
        80,
        1194,
        650,
        36,
        "25px 'DM Mono'",
        YELLOW
    );


    ctx.strokeStyle =
        "rgba(245,238,219,.3)";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(80, 1320);

    ctx.lineTo(1120, 1320);

    ctx.stroke();


    drawText(
        ctx,
        "LOCATION",
        80,
        1360,
        "12px 'DM Mono'",
        "rgba(245,238,219,.45)"
    );

    drawText(
        ctx,
        "GOA, INDIA",
        80,
        1390,
        "16px 'DM Mono'",
        CREAM
    );


    drawText(
        ctx,
        "DATES",
        340,
        1360,
        "12px 'DM Mono'",
        "rgba(245,238,219,.45)"
    );

    drawText(
        ctx,
        "28–31 OCT 2026",
        340,
        1390,
        "16px 'DM Mono'",
        CREAM
    );


    drawText(
        ctx,
        "#FrameInGoa",
        1120,
        1385,
        "20px 'DM Mono'",
        YELLOW,
        "right"
    );



    ctx.save();

    ctx.translate(
        1160,
        750
    );

    ctx.rotate(
        Math.PI / 2
    );

    drawText(
        ctx,
        "HH / 26",
        0,
        0,
        "13px 'DM Mono'",
        "rgba(245,238,219,.4)"
    );

    ctx.restore();


    drawText(
        ctx,
        "✦",
        1000,
        1000,
        "40px Arial",
        YELLOW
    );

    drawText(
        ctx,
        "✦",
        900,
        1170,
        "20px Arial",
        PINK
    );

    drawText(
        ctx,
        "•",
        1030,
        1100,
        "30px Arial",
        YELLOW
    );



    ctx.strokeStyle =
        "rgba(245,211,59,.4)";

    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.moveTo(-100, 1280);

    ctx.bezierCurveTo(
        300,
        1200,
        600,
        1430,
        1300,
        1250
    );

    ctx.stroke();


    ctx.fillStyle =
        "rgba(255,255,255,0.025)";

    for (
        let i = 0;
        i < 3500;
        i++
    ) {

        const x =
            Math.random() * canvas.width;

        const y =
            Math.random() * canvas.height;

        const size =
            Math.random() * 2;

        ctx.fillRect(
            x,
            y,
            size,
            size
        );

    }


    return canvas;

}


downloadBtn.addEventListener(
    "click",
    async () => {

        if (!validateForm()) {
            return;
        }


        downloadBtn.disabled = true;

        downloadBtn.querySelector("span").textContent =
            "CREATING YOUR ID...";


        try {

            const canvas =
                await renderCardToCanvas();


            canvas.toBlob(
                (blob) => {

                    if (!blob) {

                        showError(
                            "COULD NOT CREATE IMAGE."
                        );

                        downloadBtn.disabled = false;

                        downloadBtn.querySelector("span").textContent =
                            "DOWNLOAD MY BUILDER ID";

                        return;

                    }


                    const url =
                        URL.createObjectURL(blob);


                    const link =
                        document.createElement("a");


                    link.href = url;

                    link.download =
                        "hh-goa-2026-builder-id.png";


                    document.body.appendChild(link);

                    link.click();

                    link.remove();


                    setTimeout(() => {

                        URL.revokeObjectURL(url);

                    }, 1000);


                    showSuccess();


                    downloadBtn.disabled = false;

                    downloadBtn.querySelector("span").textContent =
                        "DOWNLOAD MY BUILDER ID";

                },
                "image/png"
            );

        } catch (error) {

            console.error(error);

            showError(
                "SOMETHING WENT WRONG WHILE CREATING YOUR ID."
            );

            downloadBtn.disabled = false;

            downloadBtn.querySelector("span").textContent =
                "DOWNLOAD MY BUILDER ID";

        }

    }
);


function showSuccess() {

    successMessage.classList.remove("show");

    void successMessage.offsetWidth;

    successMessage.classList.add("show");


    setTimeout(() => {

        successMessage.classList.remove("show");

    }, 3500);

}


shareBtn.addEventListener(
    "click",
    async () => {

        if (!validateForm()) {
            return;
        }

        try {

            const canvas =
                await renderCardToCanvas();


            canvas.toBlob(
                (blob) => {

                    if (blob) {

                        const url =
                            URL.createObjectURL(blob);


                        const link =
                            document.createElement("a");


                        link.href = url;

                        link.download =
                            "hh-goa-2026-builder-id.png";


                        document.body.appendChild(link);

                        link.click();

                        link.remove();


                        setTimeout(() => {

                            URL.revokeObjectURL(url);

                        }, 1500);

                    }


                    openXIntent();

                },
                "image/png"
            );

        } catch (error) {

            console.error(error);

            openXIntent();

        }

    }
);


function openXIntent() {

    const name =
        nameInput.value.trim();


    const caption =
        `I just built my HH Goa 2026 Builder ID 🌴⚡ ${name ? "— " + name + " " : ""}#FrameInGoa`;


    const xUrl =
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(caption);


    window.open(
        xUrl,
        "_blank",
        "noopener,noreferrer"
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            document.activeElement.tagName === "INPUT"
        ) {

            event.preventDefault();

        }

    }
);



cardImage.addEventListener(
    "error",
    () => {

        cardPhoto.classList.remove("has-image");

    }
);


console.log(
    "%cHH GOA 2026 — BUILDER ID READY ✦",
    "color:#f5d33b;font-size:16px;font-weight:bold;"
);