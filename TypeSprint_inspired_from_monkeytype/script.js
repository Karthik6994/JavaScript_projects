let ref_ele = document.getElementById("ref")
let user_input_ele = document.getElementById("user_input")
let cur_ch = ref_ele.textContent
cur_ch = cur_ch.split("").map(each_ch => `<span>${each_ch}</span>`).join("")
ref_ele.innerHTML = cur_ch
let all_ele = document.querySelectorAll("span")

document.body.addEventListener("keydown", function (e) {
    console.log(e.key)
    if (e.key == "Backspace") {
        user_input_ele.value = user_input_ele.value.substring(0, user_input_ele.value.length - 1)
    } else if (e.key == "CapsLock" || e.key == "Shift" || e.key == "Control" || e.key == "Tab") {
        pass
    } else {
        user_input_ele.value = user_input_ele.value + e.key
    }
    for (let i = 0; i < user_input_ele.value.length; i++) {
        if (user_input_ele.value[i] == all_ele[i].textContent) {
            all_ele[i].style.color = "white";
        } else {
            all_ele[i].style.color = "#d1172d";
        }
    }
    for (let i = user_input_ele.value.length; i < all_ele.length; i++) {
        all_ele[i].style.color = "#646669";
    }
})
