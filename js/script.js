const overview = document.querySelector(".overview"); //element with overview class
const username = "AHHatton"; //my github username

const getInfo = async function() { //select user info from github API
	const request = await fetch (`https://api.github.com/users/${username}`);
	const data = await request.json();
	console.log(data);
	userData(data);
};

const userData = function(data){ //Pull info from getInfo function and display in new div
	const userInfoDiv = document.createElement("div");
	//div.classlist.add("user-info");
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
};


getInfo();