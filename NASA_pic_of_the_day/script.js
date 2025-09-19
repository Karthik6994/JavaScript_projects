const API_KEY = "DEMO_KEY";
const baseURL = "https://api.nasa.gov/planetary/apod";

async function fetchPicture(date = "") {
  try {
    let url = `${baseURL}?api_key=${API_KEY}`;
    if (date) url += `&date=${date}`;

    const res = await fetch(url);
    const data = await res.json();

    document.getElementById('title').textContent = data.title;
    document.getElementById('date').textContent = data.date;
    document.getElementById('explanation').textContent = data.explanation;

    const imgEl = document.getElementById('image');
    if (data.media_type === "image") {
      imgEl.style.display = "block";
      imgEl.src = data.url;
    } else {
      imgEl.style.display = "none";
      document.getElementById('explanation').textContent =
        `This day's APOD is a video. Watch here: ${data.url}`;
    }
  } catch (error) {
    document.getElementById('title').textContent = "Error fetching data";
  }
}

document.getElementById('getPic').addEventListener('click', () => {
  const selectedDate = document.getElementById('datePicker').value;
  if (selectedDate) {
    fetchPicture(selectedDate);
  }
});

fetchPicture();
