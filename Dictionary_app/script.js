function searchWord() {
  let word = document.getElementById("wordInput").value.trim();
  let resultDiv = document.getElementById("result");

  if (word === "") {
    resultDiv.innerHTML = "<p>Please enter a word</p>";
    return;
  }

  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.title === "No Definitions Found") {
        resultDiv.innerHTML = `<p>No definition found for <b>${word}</b></p>`;
      } else {
        let meaning = data[0].meanings[0].definitions[0].definition;
        let example = data[0].meanings[0].definitions[0].example || "No example available.";
        let partOfSpeech = data[0].meanings[0].partOfSpeech;

        resultDiv.innerHTML = `
          <h3>Word: ${word}</h3>
          <p><b>Part of Speech:</b> ${partOfSpeech}</p>
          <p><b>Meaning:</b> ${meaning}</p>
          <p><b>Example:</b> ${example}</p>
        `;
      }
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Something went wrong. Try again.</p>`;
      console.log(error);
    });
}
