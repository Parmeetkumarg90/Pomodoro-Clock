const start = document.querySelector('#buttons').children[0];
const reset = document.querySelector('#buttons').children[1];
const add_session = document.querySelector('#session').children[0];
const minu_session = document.querySelector('#session').children[1];
const add_break = document.querySelector('#break').children[0];
const minu_break = document.querySelector('#break').children[1];

let running_timer = document.querySelector("#running_timer").innerText;
let hour = 0, minute = 0, second = 0, id, time_flag = 1, save_flag = 0;
// console.log(id)

start.addEventListener('click', (event) => {
    //console.log(event)
    let session_time = document.querySelector("#session_time").innerText;
    let break_time = document.querySelector("#break_time").innerText;
    if (save_flag === 0 && minute === 0 && hour === 0 && second === 0) {
        hour = time_flag === 1 ? parseInt(session_time.split(":")[0]) : parseInt(break_time.split(":")[0]);
        minute = time_flag === 1 ? parseInt(session_time.split(":")[1]) : parseInt(break_time.split(":")[1]);
        second = 0;
        if (minute === 0 && hour === 0 && second === 0) {
            alert("Enter valid minutes....");
            reset.click();
            return;
        }
        document.querySelector("#curr_time").innerText = time_flag === 1 ? "Session Time" : "Break Time";
        document.querySelector("#curr_time").style.color = time_flag === 1 ? "rgb(64, 139, 64)" : "#f00";
    }
    //console.log(time_flag,minute);
    start.innerText = event.isTrusted ? (start.innerText === "Start" ? "Pause" : "Start") : start.innerText;
    if (start.innerText === "Pause") {
        id = setInterval(() => {
            // second--;
            if (hour === 0 && minute === 0 && second === 0) {
                // reset.click();
                clearInterval(id);
                time_flag = time_flag === 1 ? 0 : 1;
                save_flag = 0;
                start.click();
                return;
            }
            //console.log(time_flag);
            if (second === 0) {
                if (minute > 0) {
                    minute--;
                    second = 59;
                }
                else if (hour > 0) {
                    hour--;
                    minute = 59;
                    second = 59;
                }
            }
            else {
                second--;
            }
            document.querySelector("#running_timer").innerText =
                ("0" + hour).slice(-2) + " : " +
                ("0" + minute).slice(-2) + " : " +
                ("0" + second).slice(-2) + " ";;
        }, 10);
    }
    else {
        clearInterval(id);
        save_flag = 1;
    }
});
reset.addEventListener('click', () => {
    document.querySelector("#curr_time").innerText = "Start Your Time?";
    start.innerText = "Start";
    save_flag = 0;
    clearInterval(id);
    document.querySelector("#running_timer").innerText = '00 : 00 : 00 ';
    document.querySelector("#session_time").innerText = '00 : 00 ';
    document.querySelector("#break_time").innerText = '00 : 00 ';
});

add_session.addEventListener('click', () => {
    let session_time = document.querySelector("#session_time").innerText;
    let hour = parseInt(session_time.split(":")[0]);
    let minute = parseInt(session_time.split(":")[1]);
    minute += 5;
    if (minute >= 60) {
        hour += 1;
        minute -= 60;
    }
    document.querySelector("#session_time").innerText =
        ("0" + hour).slice(-2) + " : " +
        ("0" + minute).slice(-2) + " ";
});

minu_session.addEventListener('click', () => {
    let session_time = document.querySelector("#session_time").innerText;
    let hour = parseInt(session_time.split(":")[0]);
    let minute = parseInt(session_time.split(":")[1]);
    if (minute - 5 <= 0 && hour === 0) {
        minute = 0;
        document.querySelector("#session_time").innerText = "00 : 00 ";
        return;
    }
    else if (minute === 0 && hour > 0) {
        hour = 0;
        minute = 60;
    }
    else if (minute > 60) {
        hour += 1;
        minute = minute - 60;
    }
    else {
        minute -= 5;
    }
    document.querySelector("#session_time").innerText =
        ("0" + hour).slice(-2) + " : " +
        ("0" + minute).slice(-2) + " ";
});

add_break.addEventListener('click', () => {
    let break_time = document.querySelector("#break_time").innerText;
    let hour = parseInt(break_time.split(":")[0]);
    let minute = parseInt(break_time.split(":")[1]);
    // minute += 5;
    minute += 5;
    if (minute === 60) {
        hour += 1;
        minute -= 60;
    }
    document.querySelector("#break_time").innerText =
        ("0" + hour).slice(-2) + " : " +
        ("0" + minute).slice(-2) + " ";
});

minu_break.addEventListener('click', () => {
    let break_time = document.querySelector("#break_time").innerText;
    let hour = parseInt(break_time.split(":")[0]);
    let minute = parseInt(break_time.split(":")[1]);
    if (minute - 5 <= 0 && hour === 0) {
        minute = 0;
        document.querySelector("#break_time").innerText = "00 : 00 ";
        return;
    }
    else if (minute === 0 && hour > 0) {
        hour = 0;
        minute = 60;
    }
    else if (minute > 60) {
        hour += 1;
        minute = minute - 60;
    }
    else {
        minute -= 5;
    }
    document.querySelector("#break_time").innerText =
        ("0" + hour).slice(-2) + " : " +
        ("0" + minute).slice(-2) + " ";
});