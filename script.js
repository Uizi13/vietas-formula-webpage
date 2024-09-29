let t1 = 0;

const degree_field = document.getElementById("degree");
let degree = 2;
const max_root_field = document.getElementById("max_root");
let max_root = 10;

const main_text = document.getElementById("main_text");
const solution = document.getElementById("solution");
const time = document.getElementById("time");

const degree_input_handler = function(e) {
    degree = Number(e.target.value);
    show_polynomial();
    solution.innerHTML = "";
    time.innerHTML = "";
    t1 = Date.now();
}

const max_root_input_handler = function(e) {
    const n = Number(e.target.value)
    if (2 * n > degree) {
        max_root = n;
        show_polynomial();
        time.innerHTML = "";
        t1 = Date.now(); 
    }
}

const click_input_handler = function(e) {
    e.stopPropagation();
    e.target.focus();
    console.log("Input clicked, but event did not propagate.");
}
  
degree_field.addEventListener('input', degree_input_handler);
degree_field.addEventListener('click', click_input_handler);
degree_field.addEventListener('propertychange', degree_input_handler);

max_root_field.addEventListener('input', max_root_input_handler);
max_root_field.addEventListener('click', click_input_handler);
max_root_field.addEventListener('propertychange', max_root_input_handler);

let current_roots = [];

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

function create_polynomial(coeffs) {
    let result = "";
    for (let i = 0; i < coeffs.length; i++) {
        let c = "";
        if (coeffs[i] == 1) {
            c += "+";
        } else if (coeffs[i] == -1) {
            c += "-";
        } else {
            if (coeffs[i] > 0) {
                c += "+"
            }
            c += String(coeffs[i]);
        }     
        if (c !== '0') {
            if (i == coeffs.length - 1) {
                result += c;
                if (c == '+' || c == '-') {
                    result += '1';
                }
            } else if (i == coeffs.length - 2) {
                result += c + "x";
            } else {
                result += c + "x<sup>" + String(coeffs.length - i - 1) + "</sup>";
            }
        }

    }
    if (result.charAt(0) === '+') {
        result = result.substring(1);
    }
    return result;
}

function show_polynomial() {
    current_roots = [];
    while (current_roots.length < degree) {
        const r = Math.floor(Math.random() * max_root * 2) - max_root;
        if (r !== 0 && !current_roots.includes(r)) {
            current_roots.push(r);
        }
    }
    let coeffs = [1];
    for (let i = 1; i <= degree; i++) {
        const cbn = combinations(current_roots, i);
        let arr = [];
        for (const prod of cbn) {
            arr.push(prod.reduce((a, b) => a * b, 1))
        }
        coeffs.push(-1 * arr.reduce((a, b) => a + b, 0) * ((i % 2) * 2 - 1))
    }
    main_text.innerHTML = create_polynomial(coeffs);
}

function toggle_show_solution() {
    if (solution.innerHTML.length > 0) {
        solution.innerHTML = "";
        time.innerHTML = "";
    } else {
        let roots = "";
        for (const [i, r] of current_roots.entries()) {
            roots += "x<sub>" + String(i + 1) + "</sub> = " + String(r) + " ";
        }
        solution.innerHTML = roots;
        const t = Date.now() - t1;
        time.innerHTML = String(t / 1000) + 's';
    }
}

function on_page_load() {
    t1 = Date.now();
    main_text.addEventListener('click', function(event) {
        show_polynomial();
        t1 = Date.now();
        solution.innerHTML = "";
        time.innerHTML = "";
        event.stopPropagation();
    });
    document.body.addEventListener('click', function() {
        toggle_show_solution();
    });
    show_polynomial();
}

window.onload = on_page_load;

