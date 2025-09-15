async function getProfile() {
  const username = document.getElementById("username").value.trim();
  const profileContainer = document.getElementById("profile");

  if (username === "") {
    profileContainer.innerHTML = "<p>⚠️ Please enter a username.</p>";
    return;
  }

  profileContainer.innerHTML = "<p>⏳ Loading profile...</p>";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    const data = await response.json();

    profileContainer.innerHTML = `
      <img src="${data.avatar_url}" alt="Avatar">
      <h2>${data.name || "No Name Available"}</h2>
      <p>👤 Username: ${data.login}</p>
      <p>📍 Location: ${data.location || "Not specified"}</p>
      <p>📦 Public Repos: ${data.public_repos}</p>
      <p>👥 Followers: ${data.followers} | Following: ${data.following}</p>
      <p>🔗 <a href="${data.html_url}" target="_blank">View Profile</a></p>
    `;
  } catch (error) {
    profileContainer.innerHTML = `<p>❌ ${error.message}</p>`;
  }
}
