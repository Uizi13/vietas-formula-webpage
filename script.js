const degree = 2;
const max_root = 10;

const main_text = document.getElementById("main_text");

function combinations(arr, len) {
    if (len > arr.length) {
        return null;
    }
    let indices = Array.from(Array(len).keys());
    let result = [arr.slice(0, len)];
    while (true) {
        let chosen_i = -1;
        for (let i = len - 1; i >= 0; i--) {
            if (indices[i] !== i + arr.length - len) {
                chosen_i = i;
                break;
            }
        }
        if (chosen_i == -1) {
            return result;
        }
        indices[chosen_i] += 1;
        for (let j = chosen_i + 1; j < len; j++) {
            indices[j] = indices[j - 1] + 1;
        }
        result.push(indices.map(i => arr[i]));
    }
}

function onPageLoad() {
    let x = [];
    while (x.length < degree) {
        const r = Math.floor(Math.random() * max_root * 2) - 10;
        if (r !== 0 && !x.includes(r)) {
            x.push(r);
        }
    }
    console.log(x);
    for (let i = 0; i <= degree; i++) {
        const cbn = combinations(x, i);
        let arr = [];
        for (prod in cbn) {
            arr.push(prod.reduce((a, b) => a * b, 0))
        }
        console.log(-1 * arr.reduce((a, b) => a + b, 0) * ((i % 2) * 2 - 1))
    }
}

window.onload = onPageLoad;

