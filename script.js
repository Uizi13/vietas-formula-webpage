const degree = 2;
const max_root = 10;

const main_text = document.getElementById("main_text");

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
        arr = [];
        for (prod in combinations) {
            arr.push(prod.reduce((a, b) => a * b, 0))
        }
        console.log(-1 * arr.reduce((a, b) => a + b, 0) * ((i % 2) * 2 - 1))
    }
}

window.onload = onPageLoad;

