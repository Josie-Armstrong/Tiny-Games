const tokens = [document.getElementById("outer-token-1"),
    document.getElementById("outer-token-2"),
    document.getElementById("outer-token-3"),
    document.getElementById("outer-token-4"),
    document.getElementById("outer-token-5"),
    document.getElementById("outer-token-6"),
    document.getElementById("outer-token-7"),
    document.getElementById("outer-token-8"),
    document.getElementById("outer-token-9")
];

const inner_tokens = [document.getElementById("inner-token-1"),
    document.getElementById("inner-token-2"),
    document.getElementById("inner-token-3"),
    document.getElementById("inner-token-4"),
    document.getElementById("inner-token-5"),
    document.getElementById("inner-token-6"),
    document.getElementById("inner-token-7"),
    document.getElementById("inner-token-8"),
    document.getElementById("inner-token-9")
];

const color_switch_array = ["var(--t-col)", "var(--o-col)", "var(--m-col)", "var(--d-col)"];
let current_colors = [0, 0, 0, 0, 0, 0, 0, 0, 0];

for (let i = 0; i < inner_tokens.length; i++) {
    let temp_i = i;
    inner_tokens[i].addEventListener('click', () => {switchTokenColor(temp_i)});
}

const info_cards = [document.getElementById("ic-1"),
    document.getElementById("ic-2"),
    document.getElementById("ic-3"),
    document.getElementById("ic-4"),
    document.getElementById("ic-5"),
    document.getElementById("ic-6"),
    document.getElementById("ic-7"),
    document.getElementById("ic-8"),
    document.getElementById("ic-9")
];

let card_dragging = [false, false, false, false, false, false, false, false, false];
let card_offsets = [{offsetX: 0, offsetY: 0},
    {offsetX: 0, offsetY: 0},
    {offsetX: 0, offsetY: 0},
    {offsetX: 0, offsetY: 0},
    {offsetX: 0, offsetY: 0},
    {offsetX: 0, offsetY: 0},
    {offsetX: 0, offsetY: 0},
    {offsetX: 0, offsetY: 0},
    {offsetX: 0, offsetY: 0}
]

for (let i = 0; i < info_cards.length; i++) {
    let temp_i = i;
    info_cards[i].addEventListener("mousedown", (e) => {mouseDown(e, temp_i)});
    document.addEventListener("mousemove", (e) => {dragInfoCard(e, info_cards[temp_i], temp_i)});
    document.addEventListener("mouseup", (e) => {mouseUp(e, temp_i)});
}

const info_bg = document.getElementById("info-bg");
const hide_info_btn = document.getElementById("hide-info")
hide_info_btn.addEventListener('click', (e) => {toggleInfoBG()});

function switchTokenColor(i) {
    let new_color;

    if (current_colors[i] < (color_switch_array.length - 1)) {
        new_color = color_switch_array[current_colors[i] + 1];
        current_colors[i] += 1;
    }
    else {
        new_color = color_switch_array[0];
        current_colors[i] = 0;
    }

    // inner_tokens[i].style.borderColor = new_color;
    inner_tokens[i].style.boxShadow = `0px 0px 8px 8px ${new_color}`;

    if (current_colors[i] == 1 && (!info_cards[i].classList.contains("valid-as-outsider"))) {
        info_cards[i].classList.add("invalid");
    }
    else if (current_colors[i] > 1) {
        info_cards[i].classList.add("invalid");
    }
    else {
        info_cards[i].classList.remove("invalid");
    }
}

function dragInfoCard(event, card, index) {
    if (card_dragging[index]) {
        console.log("dragging");
        card.style.left = `${event.clientX - card_offsets[index["offsetX"]]}px`;
        card.style.top = `${event.clientY - card_offsets[index["offsetY"]]}px`;
    }
}

function mouseDown(event, index) {
    card_dragging[index] = true;
    card_offsets[index["offsetX"]] = event.clientX - info_cards[index].offsetLeft;
    card_offsets[index["offsetX"]] = event.clientY - info_cards[index].offsetTop;
}

function mouseUp(event, index) {
    card_dragging[index] = false;
}

function toggleInfoBG() {
    console.log("hide toggle");
    info_bg.classList.toggle("hide");
}