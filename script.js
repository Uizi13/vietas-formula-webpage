const degree = 2;
const max_root = 10;

function onPageLoad() {
    let x = [];
    while (x.length < degree) {
        const r = 1 + Math.floor(Math.random * max_root);
        if (!x.includes(r)) {
            x.push(r);
        }
    }
    console.log(x);
}

