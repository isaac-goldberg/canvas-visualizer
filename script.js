const canvasVisualizer_defaultWidth = 1200;
const canvasVisualizer_defaultHeight = 600;

const canvasVisualizer_stratum2 = new FontFace("Stratum2-Bold", "url(stratum2-bold.ttf)");
canvasVisualizer_stratum2.load().then(() => document.fonts.add(canvasVisualizer_stratum2));
const canvasVisualizer_rajdhani = new FontFace("Rajdhani-Bold", "url(rajdhani-bold.ttf)");
canvasVisualizer_rajdhani.load().then(() => document.fonts.add(canvasVisualizer_rajdhani));

ace.require("ace/ext/language_tools");
const canvasVisualizer_editor = ace.edit("editor");
canvasVisualizer_editor.setTheme("ace/theme/monokai");
canvasVisualizer_editor.session.setMode("ace/mode/javascript");
canvasVisualizer_editor.setOptions({
    enableLiveAutocompletion: true,
});

const canvas = document.getElementById("canvas");
const canvasVisualizer_dummy = document.getElementById("dummy");

const canvasVisualizer_width = document.getElementById("width");
canvasVisualizer_width.value = canvasVisualizer_defaultWidth.toString();
canvasVisualizer_width.addEventListener("keyup", () => {
    var canvasVisualizer_n = parseInt(canvasVisualizer_width.value);
    if (!canvasVisualizer_n) return;
    canvas.width = canvasVisualizer_n;
    localStorage.setItem("width", canvasVisualizer_n);
    canvasVisualizer_update();
});

const canvasVisualizer_height = document.getElementById("height");
canvasVisualizer_height.value = canvasVisualizer_defaultHeight.toString();
canvasVisualizer_height.addEventListener("keyup", () => {
    var canvasVisualizer_n = parseInt(canvasVisualizer_height.value);
    if (!canvasVisualizer_n) return;
    canvas.height = canvasVisualizer_n;
    localStorage.setItem("height", canvasVisualizer_n);
    canvasVisualizer_update();
});

canvasVisualizer_editor.session.on("change", () => canvasVisualizer_update());

const canvasVisualizer_refresh = document.getElementById("refresh");
canvasVisualizer_refresh.addEventListener("click", () => canvasVisualizer_update());

function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

function canvasVisualizer_update() {
    var canvasVisualizer_code = canvasVisualizer_editor.session.getValue();
    localStorage.setItem("code", canvasVisualizer_code);
    canvasVisualizer_code = `(async () => {\n${canvasVisualizer_code}\n})();`;

    var context = canvasVisualizer_dummy.getContext("2d");
    try {
        eval(canvasVisualizer_code);
    } catch (e) {
        return console.log(e);
    }

    context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    eval(canvasVisualizer_code);
}

var canvasVisualizer_existingWidth = localStorage.getItem("width");
if (canvasVisualizer_existingWidth) {
    canvasVisualizer_width.value = canvasVisualizer_existingWidth;
    canvas.width = canvasVisualizer_existingWidth;
}

var canvasVisualizer_existingHeight = localStorage.getItem("height");
if (canvasVisualizer_existingHeight) {
    canvasVisualizer_height.value = canvasVisualizer_existingHeight;
    canvas.height = canvasVisualizer_existingHeight;
}

const canvasVisualizer_defaultCode = "// canvas, context, and the asynchronous \"loadImage\" function are already defined for you.\n\n";
var canvasVisualizer_existingCode = localStorage.getItem("code");
if (!canvasVisualizer_existingCode) localStorage.setItem("code", canvasVisualizer_defaultCode);
else canvasVisualizer_update(canvasVisualizer_existingCode);
canvasVisualizer_editor.session.setValue(canvasVisualizer_existingCode || canvasVisualizer_defaultCode);
