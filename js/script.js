const overview = document.querySelector(".overview"); //element with overview class
const username = "AHHatton"; //my github username
const repoList = document.querySelector(".repo-list"); //selects ul to display repos
const repoSection = document.querySelector(".repos"); //selects section w/ repos class
const repoData = document.querySelector(".repo-data");//selects section w/ repo-data class


const getInfo = async function() { //select user info from github API
	const request = await fetch (`https://api.github.com/users/${username}`);
	const data = await request.json();
	//console.log(data);
	userData(data);
};

getInfo();

const userData = function(data){ // display info from GetInfo function in new div
	const userInfoDiv = document.createElement("div");
	userInfoDiv.classList.add("user-info"); //hmm
	userInfoDiv.innerHTML = `
	<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
  overview.append(userInfoDiv);
  getRepos();
};

const getRepos = async function() { //get repo info from github
	const requestRepos = await fetch (`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
	const dataRepos = await requestRepos.json();
	console.log(dataRepos);
	displayRepo(dataRepos);
};

const displayRepo = function(repos) { //function to display repo information
  for (const repo of repos) {
  	const repoListItem = document.createElement("li");
    repoListItem.classList.add("repo"); 
    repoListItem.innerHTML = `<h3>${repo.name}</h3>`;
  	repoList.append(repoListItem);
  }
};

repoList.addEventListener("click", function(e){ //click event for repo names that targets individual repo name
 if (e.target.matches("h3")) {
 	const repoName = e.target.innerText;
 	//console.log(repoName);
 	getRepoInfo(repoName);
 }
});

const getRepoInfo = async function(repoName) { //get specific repo info from github
	const requestRepoInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
	const repoInfo = await requestRepoInfo.json();
	console.log(repoInfo);
	const fetchLanguages = await fetch(repoInfo.languages_url); //map info from this property to variable
	const languageData = await fetchLanguages.json();
//console.log(languageData);

    const languages = [];
    for (const language in languageData) {
    	languages.push(language);
    	//console.log(languages); 
    displayRepoInfo(repoInfo, languages);
    }
};

const displayRepoInfo = function(repoInfo, languages){
	repoData.innerHTML= "";
	const repoInfoDiv = document.createElement("div");
	repoInfoDiv.innerHTML = `
	<h3>Name: ${repoInfo.name}</h3>
	<p>Description: ${repoInfo.description}</p>
	<p>Default Branch: ${repoInfo.default_branch}</p>
	<p>Languages: ${languages.join(", ")}</p>
	<a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on Github!</a>`;
	repoData.append(repoInfoDiv);
	repoData.classList.remove("hide");
	repoSection.classList.add("hide");
};