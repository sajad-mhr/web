const PersonData = {
  firstname: "Sajad",
  lastname: "Mehri",
  avatar: "./assets/images/avatar.JPG",
  bio: `
  Hi everyone. 
I'm Sajad Mehri.
I'm an experienced front-end developer interested in designing beautiful and functional websites.
I'm currently a student at Montazeri Faculty of Mashhad and I am studying computer science.
I live in Mashhad city.
I'm very interested in learning new things and am always looking for ways to improve my skills.
I like to work with people who share my goals and interests and use their experiences.
I enjoy teamwork and try to help others and learn from them.
I enjoy new challenges and try to respond to them with creativity and effort.
I enjoy life and try to learn something new every day and develop myself.
  `,
  skills: [
    {
      id: 0,
      name: "HTML",
      percentage: 100,
    },
    {
      id: 1,
      name: "CSS",
      percentage: 100,
    },
    {
      id: 3,
      name: "JavaScript",
      percentage: 80,
    },
  ],
};

let skills_container = document.querySelector(".skills");
let cv_profile = document.querySelector(".cv-profile");

function fetchSkills(data) {
  let skill_temp = "";
  data.skills.forEach((skill) => {
    skill_temp = `
      <div class="skill">
      <h2>${skill.name}</h2>
      <div class="progress-border">
      <div class="percentage">
      <span id="percentage">${skill.percentage} %</span>
      </div>
      <div class="progress-fill" style="width:${skill.percentage}%"></div>
      </div>
      </div>
      `;
    skills_container.innerHTML += skill_temp;
  });
}

function fetchProfile(data) {
  let profile_temp = `
    <div class="avatar-container">
      <img src="${data.avatar}" alt="" />
      <button onclick="showModal()" class="abouteme-btn">About Me!</button>
    </div>
    <h1>${data.firstname} ${data.lastname}</h1>
  </div>
  <div onclick="closeModal(event)" class="modal-overley">
    <div class="modal">
        <div class="modal-head">
            <button onclick="closeModal(event)">X</button>
        </div>
      <p>
      ${data.bio}
      </p>
    </div>
    `;
  cv_profile.innerHTML = profile_temp;
}

function showModal(){
document.querySelector(".modal-overley").style.display = "flex";
document.body.style.overflowY = "hidden"
}
function closeModal(e){
let {className,tagName} = e.target
if(className === "modal-overley" || tagName === "BUTTON"){
    document.querySelector(".modal-overley").style.display = "none";
    document.body.style.overflowY = "auto"
}

}

window.addEventListener("load", () => {
  fetchSkills(PersonData);
  fetchProfile(PersonData);
});
