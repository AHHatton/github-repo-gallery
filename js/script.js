const overview = document.querySelector(".overview"); //element with overview class
const username = "AHHatton"; //my github username
const repoList = document.querySelector(".repo-list"); //selects ul to display repos

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