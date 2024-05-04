let input = document.querySelector(".getrepo input");
let button = document.querySelector(".get-button");
let showData = document.querySelector(".show-data");

button.addEventListener("click", () => {
  getRepos();
});

function getRepos() {
  if (input.value == "") {
    showData.innerHTML = `<span style="color: red">Please Write a Valid Username.</span>`;
  } else {
    fetchRepo();
  }
}

async function fetchRepo() {
  const response = await fetch(
    `https://api.github.com/users/${input.value}/repos`
  );
  const repos = await response.json();
  showData.innerHTML = "";

  if (repos.length === 0) {
    showData.innerHTML = `<span style="color: red">Username not found or user has no public repositories.</span>`;
  } else {
    repos.forEach((repo) => {
      let main = document.createElement("div");
      let repoName = document.createTextNode(repo.name);

      main.appendChild(repoName);

      let url = document.createElement("a");
      let urlText = document.createTextNode("Viste");
      url.appendChild(urlText);

      url.href = `https://github.com/${input.value}/${repo.name}`;
      url.setAttribute("target", "_blank");
      main.appendChild(url);

      let stars = document.createElement("span");
      let starsText = document.createTextNode(
        `Stars: ${repo.stargazers_count}`
      );
      stars.appendChild(starsText);

      main.appendChild(stars);
      main.className = "repoBox";
      showData.appendChild(main);
    });
  }
}
