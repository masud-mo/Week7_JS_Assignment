// 🛠️ STEP 1: Fetch GitHub Data
// 1️⃣ Use Axios to send a GET request to `https://api.github.com/users/your_github_username`.
// 2️⃣ Log the response data to inspect its structure.
// 3️⃣ Look at important fields like `name`, `avatar_url`, `location`, `followers`, `following`, `bio`, and `followers_url`.
// 4️⃣ Pass the data into a function to create a user card.
// 5️⃣ Append the created card to the `.cards` container in the DOM.


const githubURL = "https://api.github.com/users/masud-mo";
const cardsContainer = document.querySelector(".cards");
axios.get(githubURL)
  .then(response => {
    console.log(response.data);
    const card = GithubCard(response.data);
    cardsContainer.appendChild(card);
  })
  .catch(error => {
    console.log("Error fetching GitHub data:", error);
  });



// 🛠️ STEP 2: Create a Function to Build the Card
// 1️⃣ Write a function that takes a **user object** as a parameter.
// 2️⃣ Use JavaScript DOM methods to create the following structure:
//
//     <div class="card">
//       <img src="{avatar_url}" />
//       <div class="card-info">
//         <h3 class="name">{name}</h3>
//         <p class="username">{login}</p>
//         <p>Location: {location}</p>
//         <p>Profile: <a href="{html_url}">{html_url}</a></p>
//         <p>Followers: {followers}</p>
//         <p>Following: {following}</p>
//         <p>Bio: {bio}</p>
//       </div>
//     </div>
//
// 3️⃣ Return the created card element.

function GithubCard(user) {
  const card = document.createElement("div");
  const avatar = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const username = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");
  const profileLink = document.createElement("a");

  card.classList.add("card");
  name.classList.add("name");
  username.classList.add("username");

  avatar.src = user.avatar_url;

  name.textContent = user.name || "No Name";
  username.textContent = user.login;

  location.textContent = `Location: ${user.location || "Not available"}`;

  profileLink.href = user.html_url;
  profileLink.textContent = user.html_url;
  profileLink.target = "_blank";
  profile.textContent = "Profile: ";
  profile.appendChild(profileLink);

  followers.textContent = `Followers: ${user.followers}`;
  following.textContent = `Following: ${user.following}`;
  bio.textContent = `Bio: ${user.bio || "No bio available"}`;


  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  card.appendChild(avatar);
  card.appendChild(cardInfo);

  return card;
}


// 🛠️ STEP 3: Add the Card to the DOM
// 1️⃣ Call the function with the GitHub data.
// 2️⃣ Select the `.cards` container using `document.querySelector('.cards')`.
// 3️⃣ Append the created card to the `.cards` container.




// 🛠️ STEP 4: Fetch Followers Data
// 1️⃣ Use the `followers_url` from the GitHub user data or 
        //Use this: https://api.github.com/users/your_username/followers
// 2️⃣ Send a GET request to fetch follower information.
// 3️⃣ Log the response data to inspect its structure.
// 4️⃣ For each follower:
//     - Create a card using the function.
//     - Append the card to the `.cards` container.

axios.get("https://api.github.com/users/masud-mo")
  .then(response => {
 
    const mainCard = GithubCard(response.data);
    cardsContainer.appendChild(mainCard);
    return axios.get(response.data.followers_url);
  })
  .then(response => {
    console.log(response.data);

    response.data.forEach(follower => {
      const followerCard = GithubCard(follower);
      cardsContainer.appendChild(followerCard);
    });
  })
  .catch(error => {
    console.log("Error:", error);
  });



// 🛠️ STRETCH: Add More GitHub Users
// 1️⃣ Create an array `followersArray` with at least 5 GitHub usernames.
// 2️⃣ Loop through the array and send a GET request for each username.
// 3️⃣ Create a card for each user and append it to `.cards`.

followersArray.forEach(username => {
  axios.get(`https://api.github.com/users/${username}`)
    .then(response => {
      const userCard = GithubCard(response.data);
      cardsContainer.appendChild(userCard);
    })
    .catch(error => console.log(error));
});



// 🌟 BONUS TIP:
// 🎨 Style your cards using CSS to make them look polished!
// 🤖 Try experimenting with different GitHub profiles!
