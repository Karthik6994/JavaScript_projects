function getJoke() {
  let jokeEle = document.getElementById("joke");
  jokeEle.textContent = "Loading...";

  fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" }
  })
    .then(response => response.json())
    .then(data => {
      jokeEle.textContent = data.joke;
    })
    .catch(error => {
      jokeEle.textContent = "Oops! Couldn't fetch a joke";
    });
}
