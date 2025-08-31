let data = document.getElementById("userData")

function getallusers(){
    fetch("https://gorest.co.in/public/v2/users",
    {method:"GET",
        headers:{
            Authorization:"Bearer 07e65f20ae7cb93e12bd88b5854272616fabc6c3f2d9c0f6d023454ebdfc1fcf"
        },
    })
    .then(function(resposne){
        return resposne.json()
    })
    .then(function(jsondata){
        console.log(jsondata)
        data.innerHTML=""
        for(let i=0;i<jsondata.length;i++){
            let card = document.createElement("div")
            card.classList="card"
            card.innerHTML = 
            `<p>${jsondata[i].id}</p>
            <p>${jsondata[i].name}</p>
            <p>${jsondata[i].email}</p>
            <p>${jsondata[i].gender}</p>
            <p>${jsondata[i].status}</p>
            <button class="delete-btn" onclick="Deleteuser(${jsondata[i].id})">Delete</button>`

            data.appendChild(card)
        }
    })
}

getallusers()

function AddUser(){
    let name=document.getElementById("name").value
    let email=document.getElementById("email").value
    let gender=document.getElementById("gender").value
    let status=document.getElementById("status").value

    let user={name,email,gender,status}
    fetch("https://gorest.co.in/public/v2/users",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            Accept:"application/json",
            Authorization:"Bearer 07e65f20ae7cb93e12bd88b5854272616fabc6c3f2d9c0f6d023454ebdfc1fcf"
        },
        body:JSON.stringify(user)
    })
    .then(function(resposne){
        return resposne.json()
    })
    .then(function(jsondata){
        document.getElementById("name").value=""
        document.getElementById("email").value=""
        getallusers()
    })
}

function Deleteuser(userid){
    fetch(`https://gorest.co.in/public/v2/users/${userid}`,{
        method:"DELETE",
        headers:{
            Authorization:"Bearer 07e65f20ae7cb93e12bd88b5854272616fabc6c3f2d9c0f6d023454ebdfc1fcf"
        },
    })
    .then(function(resposne){
        if (resposne.status===204){
            alert("User Deleted Successfully!")
            let card = document.getElementById(`user-${userid}`);
            if (card) card.remove();
            getallusers()
        }else{
            alert("Failed to Delete User")
        }
    })
}