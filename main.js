// main vars 
let input = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");


getButton.onclick = function () {
    getRepos();
}

// get repos function

function getRepos() {

    let githubUsername = input.value

    if (githubUsername == "") {

        reposData.innerHTML = "<span>Please write Github Username</span>"


    } else {
        fetch("https://api.github.com/users/" + githubUsername + "/repos")

            .then(response => response.json())

            .then((repos) => {

                reposData.innerHTML = "";

                repos.forEach(repo => {

                    // create the main div element 
                    let mainDiv = document.createElement("div");

                    // create repo name
                    let mainHead = document.createElement("h3");
                    let repoName = document.createTextNode(repo.name);
                    mainHead.appendChild(repoName);
                    // append mainHead to main div
                    mainDiv.appendChild(mainHead);

                    // create repo url
                    let theURL = document.createElement("a");
                    let repoURL = document.createTextNode("Github Link");
                    theURL.appendChild(repoURL);
                    // add the hypertext reference to the url
                    theURL.href = repo.html_url; // theURL.href = `https://github.com/${githubUsername}/${repo.name}`
                    theURL.target = "_blank";

                    // append the url to main div 
                    mainDiv.appendChild(theURL);

                    // create stars count
                    let starsSpan = document.createElement("span")
                    let starsCount = document.createTextNode("Stars " + repo.stargazers_count)
                    starsSpan.appendChild(starsCount);

                    // append stars span to main div
                    mainDiv.appendChild(starsSpan);

                    // create description
                    let descriptionP = document.createElement("p")

                    let description = document.createTextNode("Description: " + repo.description);
                    if (repo.description == null) {
                        description = document.createTextNode("Description: There Is No Descrition For This Project");
                    }
                    descriptionP.appendChild(description);
                    mainDiv.appendChild(descriptionP);

                    // quick revision first we made the mainDiv then we add repoName and theURL and the span and the paragraph

                    // add class to the maniDiv
                    mainDiv.className = "main-div";

                    // append main div to reposData
                    reposData.appendChild(mainDiv);


                });
            })
    }

}
