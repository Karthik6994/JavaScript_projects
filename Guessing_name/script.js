let names = ["Sachin", "Dhoni", "Raina", "Yuvraj", "Bhuvi", "Shami"]
num = Math.ceil(Math.random() * names.length)
system_name = names[num];
let user = document.getElementById("user_guess")
let chances = 3
function guessName() {
    if (chances > 0) {
        if (user.value == system_name) {
            if (chances == 3) {
                let img = document.createElement("img");
                img.src = "https://static.vecteezy.com/system/resources/previews/022/976/086/non_2x/shiny-gold-medal-1st-rank-isolated-illustration-vector.jpg"
                img.width = 200;
                document.getElementById("output").appendChild(img);
                let res = document.createElement("p")
                res.innerText = "Congratulations, You won Gold medal!";
                document.getElementById("content").appendChild(res)
            } else if (chances == 2) {
                let img = document.createElement("img");
                img.src = "https://www.shutterstock.com/image-vector/realistic-3d-silver-trophy-award-260nw-777906931.jpg"
                img.width = 200;
                document.getElementById("output").appendChild(img);
                let res = document.createElement("p")
                res.innerText = "Congratulations, You won Silver medal!";
                document.getElementById("content").appendChild(res)
            } else if (chances == 1) {
                let img = document.createElement("img");
                img.src = "https://4.imimg.com/data4/HW/MI/MY-9647748/bronze-medal-500x500.jpg"
                img.width = 200;
                document.getElementById("output").appendChild(img);
                let res = document.createElement("p")
                res.innerText = "Congratulations, You won Bronze medal!";
                document.getElementById("content").appendChild(res)
            }
        } else {
            alert(`You only have ${chances} chances remaining!`)
            chances -= 1
        }
    } else {
        alert("Your chances are over! Better luck next time.")
    }
}

