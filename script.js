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

const overlays = [document.getElementById("over1"),
    document.getElementById("over2"),
    document.getElementById("over3"),
    document.getElementById("over4"),
    document.getElementById("over5"),
    document.getElementById("over6"),
    document.getElementById("over7"),
    document.getElementById("over8"),
    document.getElementById("over9"),
]

const color_switch_array = ["var(--t-col)", "var(--o-col)", "var(--m-col)", "var(--d-col)"];
let current_colors = [1, 0, 1, 0, 0, 0, 0, 0, 1];

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

// For the draggable tokens
const extra_tokens = [document.getElementById("imp"),
    document.getElementById("poisoner"),
    document.getElementById("spy"),
    document.getElementById("baron"),
    document.getElementById("scarlet-woman"),
    document.getElementById("drunk")
]
let token_dragging = [false, false, false, false, false, false];
let token_offsets = [[0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0]
]
let token_set = [false, false, false, false, false, false];
for (let i = 0; i < extra_tokens.length; i++) {
    let temp_i = i;
    extra_tokens[i].addEventListener("mousedown", (e) => {mouseDownToken(e, temp_i)});
    document.addEventListener("mousemove", (e) => {dragToken(e, extra_tokens[temp_i], temp_i)});
    document.addEventListener("mouseup", (e) => {mouseUpToken(e, temp_i)});
}
let extra_colors = [3, 2, 2, 2, 2, 1]; //Colors for draggable tokens

const info_bg = document.getElementById("info-bg");
const hide_info_btn = document.getElementById("hide-info")
hide_info_btn.addEventListener('click', (e) => {toggleInfoBG()});

// Elements and such for poison
const poison_arr = [document.getElementById("p-n1"),
    document.getElementById("p-n2"),
    document.getElementById("p-n3"),
    document.getElementById("p-n4")
]

for (let i = 0; i < poison_arr.length; i++) {
    let temp_i = i;
    poison_arr[i].addEventListener('change', (e) => {changePoison(temp_i)});
}

let name_arr = ["Matthew", "Fraser", "Adam", "Jasmine", "You", "Dan", "Hannah", "Tom", "Sarah"];
let n1 = ["Fraser", "You", "Dan", "Hannah"]
let n2 = ["You", "Dan", "Tom"]
let n3 = ["Dan", "Tom"]
let n4 = ["Jasmine", "Tom"]
let poison_nights = [n1, n2, n3, n4];

// Timer and # tries for stats
let tries = 0;
let start_time = 0;
let end_time;
let total_time;
let stats = document.getElementById("stats");
let done = false

document.getElementById("intro-btn").addEventListener('click', toggleIntro);
document.getElementById("submit-sol").addEventListener('click', checkSolution);
document.getElementById("close-congrats").addEventListener('click', toggleCongrats);
document.getElementById("toggle-hint").addEventListener('click', toggleHint);
document.getElementById("hint-btn").addEventListener('click', toggleHint);

window.addEventListener("load", () => {runOnLoad()});

function runOnLoad() {
    for (let i = 0; i < inner_tokens.length; i++) {
        inner_tokens[i].style.boxShadow = `0px 0px 8px 8px ${color_switch_array[current_colors[i]]}`;
    }
}

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

// Setting token color for the drag and drop tokens
function setTokenColor(color_index, token_index) {
    let new_color = color_switch_array[extra_colors[color_index]];
    inner_tokens[token_index].style.boxShadow = `0px 0px 8px 8px ${new_color}`;
    current_colors[token_index] = extra_colors[color_index];

    if (current_colors[token_index] == 1 && (!info_cards[token_index].classList.contains("valid-as-outsider"))) {
        info_cards[token_index].classList.add("invalid");
    }
    else if (current_colors[token_index] > 1) {
        info_cards[token_index].classList.add("invalid");
    }
    else {
        info_cards[token_index].classList.remove("invalid");
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
    card_offsets[index["offsetY"]] = event.clientY - info_cards[index].offsetTop;
}

function mouseUp(event, index) {
    card_dragging[index] = false;
}

function toggleInfoBG() {
    console.log("hide toggle");
    info_bg.classList.toggle("hide");
}

function dragToken(event, token, index) {
    if (token_dragging[index]) {
        // console.log("dragging");
        token.style.left = `${event.clientX - token_offsets[index][0]}px`;
        token.style.top = `${event.clientY - token_offsets[index][1]}px`;

        // console.log(event.clientY - token_offsets[index][1]);
    }
}

function mouseDownToken(event, index) {
    if (!token_set[index]) {
        extra_tokens[index].style.left = `${extra_tokens[index].offsetLeft}px`;
        extra_tokens[index].style.top = `${extra_tokens[index].offsetTop}px`;
        extra_tokens[index].style.position = "absolute";
        // console.log(extra_tokens[index].style.position, extra_tokens[index].style.top, extra_tokens[index].style.left);
        token_set[index] = true;
    }
    token_dragging[index] = true;

    let temp_x = event.clientX - extra_tokens[index].offsetLeft;
    let temp_y = event.clientY - extra_tokens[index].offsetTop;
    // console.log(temp_x, temp_y);
    // console.log(index);
    token_offsets[index][0] = temp_x;
    token_offsets[index][1] = temp_y;
    // console.log(token_offsets);
    // console.log(token_offsets[index]);

    for (let i = 0; i < overlays.length; i++) {
        overlays[i].classList.remove("hide");
    }
}

function mouseUpToken(event, index) {
    token_dragging[index] = false;

    for (let i = 0; i < overlays.length; i++) {
        overlays[i].classList.add("hide");
    }

    checkBounds(extra_tokens[index], index);
}

function checkBounds(token, index) {
    for (let i = 0; i < inner_tokens.length; i++) {
        let box1 = token.getBoundingClientRect();
        let box2 = inner_tokens[i].getBoundingClientRect();
        // console.log(box1, box2);

        // If the hit boxes for token and player token overlap, put the token in the player's position and change their color
        if (Math.abs(box1.y - box2.y) < 30 && Math.abs(box1.x - box2.x) < 30) {
            let minusx = box1.x - box2.x;
            let minusy = box1.y - box2.y;
            let templeft = parseInt(token.style.left);
            let temptop = parseInt(token.style.top);
            console.log(minusx, minusy);
            token.style.left =  `${templeft - minusx}px`;
            token.style.top = `${temptop - minusy}px`;
            // console.log(token.style.left, token.style.top);

            setTokenColor(index, i);
        }
    }
}

function checkSolution() {
    let count = 0;
    let max_count = 4;
    if (!done) {
        tries += 1;
    }

    if (document.getElementById("sol-demon").value == "Matthew") {
        count += 1;
    }
    if (document.getElementById("sol-minion").value == "Hannah") {
        count += 1;
    }
    if (document.getElementById("sol-minion-type").value == "Poisoner") {
        count += 1;
    }
    if (document.getElementById("sol-drunk").value == "There is no Drunk") {
        count += 1;
    }

    let percentage = (count / max_count) * 100;

    document.getElementById("perc-correct").textContent = `${percentage}% correct`;
    document.getElementById("inner-percentage").style.width = `${percentage}%`;

    if (percentage == 100) {
        endGame();
    }
}

function changePoison(index) {

    // Resetting strikethrough for all poisonable info on that night
    for (let i = 0; i < poison_nights[index].length; i++) {
        let name = poison_nights[index][i];
        let string = `${name}-n${index + 1}`;
        //console.log(string);
        document.getElementById(string).classList.remove("strikethrough");
    }

    let name = poison_arr[index].value;
    let string = `${name}-n${index + 1}`;
    document.getElementById(string).classList.add("strikethrough");
}

function toggleCongrats() {
    document.getElementById("congrats").classList.toggle("hide");
    document.getElementById("overlay").classList.toggle("hide");
}

function toggleIntro() {
    document.getElementById("intro").classList.toggle("hide");
    document.getElementById("overlay").classList.toggle("hide");

    if (start_time == 0) {
        start_time = performance.now();
    }
}

function toggleHint() {
    document.getElementById("hint").classList.toggle("hide");
    document.getElementById("overlay").classList.toggle("hide");
}

function endGame() {
    if (!done) {
        end_time = performance.now();
        total_time = end_time - start_time;
    }
    
    done = true;
    // console.log(total_time);
    let total_seconds = total_time / 1000;
    let minutes = Math.floor(total_seconds / 60);
    let seconds = Math.floor(total_seconds % 60);
    let try_string = "tries";
    if (tries == 1) {
        try_string = "try";
    }

    stats.textContent = `You solved this puzzle in ${minutes} minutes and ${seconds} seconds. It took you ${tries} ${try_string} to get the correct answer.`;

    toggleCongrats();
}