const tokens = [document.getElementById("outer-token-1")];

const inner_tokens = [document.getElementById("inner-token-1")];

const color_switch_array = ["#2085ea", "#3bd3c9", "#f98322", "#bc0f0f"];
let current_colors = [0]

for (let i = 0; i < tokens.length; i++) {
    let temp_i = i;
    inner_tokens[i].addEventListener('click', () => {switchTokenColor(temp_i)});
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

    inner_tokens[i].style.borderColor = new_color;
}