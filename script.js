const APIURL='https://api.github.com/users'

//getGitHubUser('GaneshKumarChappa')


const main=document.getElementById("main");
const form=document.getElementById("form");
const search=document.getElementById("search");

async function getGitHubUser(username) {
    try {
       const {data}=await axios(APIURL +'/' + username);
        createUsercard(data);
        getRepos(username);

    } catch(err) {
        if(err.response.status===404){
        createErrorCard("No Profile Found With This Username")
        }
    }
}

async function getRepos(username){
    try {
        const {data}=await axios(APIURL +'/'+username +'/repos?sort=created')
        addReposToCard(data)
    }catch(err) {
       
            createErrorCard("No Public Repos Found")
        

        
        
    }
}

function createUsercard(user){
    const userID=user.name || user.login;
    const userBio=user.bio ? `<p>${user.bio}</p> `: " "
    const cardHTML=` 
                       <div class="card">
                       <div>
                          <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
                        </div>

                       
                       <div class="user-info">
                           <h2>${userID}</h2>
                           <p>${userBio}</p>
                           <ul>
                               <li>${user.followers} Followers</li>
                               <li>${user.following} Following</li>
                               <li>${user.public_repos} Repos</li>
                           </ul>
                           <div id="repos"></div>
                       </div>
                       </div>
              `

              main.innerHTML=cardHTML

}

function createErrorCard(msg) {
    const cardHTML=`
              <div class="card">
              <h1>${msg}</h1>
              </div>
              `
              main.innerHTML=cardHTML;
}

// adding Repos to card

function addReposToCard(repos) {
    const reposEl=document.getElementById('repos');

    repos
    .slice(0,5)
    .forEach(repo=>{
        const repoEl=document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href=repo.html_url
        repoEl.target='_blank'
        repoEl.innerText=repo.name
        reposEl.appendChild(repoEl)
    })
}

// adding event listners for form submission

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const user=search.value;

    if(user) {
        getGitHubUser(user);
        search.value="";
    }
})