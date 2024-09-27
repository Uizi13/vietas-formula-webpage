const degree = 2;
const max_root = 10;

function onPageLoad() {
    let x = [];
    while (x.length < degree) {
        const r = Math.floor(Math.random * max_root * 2) - 10;
        if (r != 0 && !x.includes(r)) {
            x.push(r);
        }
    }
    console.log(x);
}

window.onload = onPageLoad;

