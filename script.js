
const SkillContainer = document.getElementById("SkillContainer");
const educationContainer = document.getElementById("educationContainer");
const experienceContainer = document.getElementById(
  "experienceContainer"
);

const generateResumeButton = document.getElementById("generateResume");

// To remove any element from it's parent container on remove button click
function removeElement(element) {
//elements parent div  
const divEntry = element.parentElement;
//main div container
let Container=divEntry.parentElement;
Container.removeChild(divEntry);
}

document.getElementById("addSkill").addEventListener("click", () => {
  const skillsEntry = document.createElement("div");
  skillsEntry.innerHTML = `
  <input type="text" placeholder="Type of Skill">
  <input type="text" placeholder="Skills :"><br>
  <input type="button" class="removebtn" value="remove above skills" onclick="removeElement(this)">
  <hr>
  `;
  SkillContainer.appendChild(skillsEntry);
});

// Event listener to add education entry
document.getElementById("addEducation").addEventListener("click", () => {
  const educationEntry = document.createElement("div");
  educationEntry.innerHTML = `
 
          
          <input type="text" placeholder="University/School:" required><br>
         
          <input type="text" placeholder="Degree/Standard" required><br>
        
          <input type="text" placeholder="Graduation Year/ Standard Year " required><br>

          <input type="button" class="removebtn" value="remove above Education" onclick="removeElement(this)">
          
          <hr>
      `;
  educationContainer.appendChild(educationEntry);
});

// Event listener to add work experience entry
document.getElementById("addExperience").addEventListener("click", () => {
  const experienceEntry = document.createElement("div");
  experienceEntry.innerHTML = `
         
          <input type="text" placeholder="Company Name:" required> <br>
     
          <input type="text" placeholder="Position:" required><br>
         
          <input type="text" placeholder="Duration:" required><br>
          <input type="button" class="removebtn" value="remove above experience" onclick="removeElement(this)">
          <hr>
        
      `;
  experienceContainer.appendChild(experienceEntry);
});

// Event listener to generate the resume
generateResumeButton.addEventListener("click", () => {
  // Gather user input and format the resume
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value.toLowerCase();
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const Summary = document.getElementById("Summary").value;

  // const PersonalInfo=[];
  let PersonalInfoOBJ={
    name:name,
    email:email,
    phone:phone,
    address:address,
  }
  // PersonalInfo.push(PersonalInfoOBJ);
  // const  = document.getElementById("skills").value;
  // let skills=[]

  if (!name || !email || !phone || !address || !Summary) {
    alert("Please fill in all required fields.");
    return;
  }

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // validate phone  number
  const phonenoPattern = /^\d{10}$/;
  if (!phone.match(phonenoPattern)) {
    alert("Please enter a valid Phone Number.");
    return;
  }


  //check All the fields of education/experience empty or not
  function validateFileds(ArrayData, type) {
    for (let i = 0; i < ArrayData.length; i++) {
      console.log(ArrayData[`${i}`]);
      if (type == "Experience") {
        if (
          ArrayData[`${i}`]["company"] == "" ||
          ArrayData[`${i}`]["position"] == "" ||
          ArrayData[`${i}`]["duration"] == ""
        ) {
          alert(`Enter all the Experience fields`);
          return false;
        }
      }
      else if(type=="Skills"){
        if (
          ArrayData[`${i}`]["skilltype"] == "" ||
          ArrayData[`${i}`]["skills"] == "" 
         
        ) {
          alert(`Enter all the Skills fields`);
          return false;
        }

      } else {
        if (
          ArrayData[`${i}`]["university"] == "" ||
          ArrayData[`${i}`]["degree"] == "" ||
          ArrayData[`${i}`]["graduationYear"] == ""
        ) {
          alert(`Enter all the Education fields`);
          return false;
        }
      }
    }
  }


  // Format education entries and validation
  const educationEntries = Array.from(
    educationContainer.querySelectorAll("div")
  ).map((entry) => ({
    university: entry.querySelector("input:nth-child(1)").value,
    degree: entry.querySelector("input:nth-child(3)").value,
    graduationYear: entry.querySelector("input:nth-child(5)").value,
  }));
  let flagEducation=true;
  flagEducation=validateFileds(educationEntries, "Education");
  if(flagEducation==false){
          return;
  }

  // Format work experience entries and validation
  const experienceEntries = Array.from(
    experienceContainer.querySelectorAll("div")
  ).map((entry) => ({
    company: entry.querySelector("input:nth-child(1)").value,
    position: entry.querySelector("input:nth-child(3)").value,
    duration: entry.querySelector("input:nth-child(5)").value,
  }));
  let flagExperience=true;
  flagExperience=validateFileds(experienceEntries, "Experience");
  if(flagExperience==false){
          return;
  }

  // Format of skills and validation
  const SkillsEntries = Array.from(
    SkillContainer.querySelectorAll("div")
  ).map((entry) => ({
    skilltype: entry.querySelector("input:nth-child(1)").value,
    skills: entry.querySelector("input:nth-child(2)").value,
  }));
  let flagSkills=true;
  flagSkills=validateFileds(SkillsEntries, "Skills");
  if(flagSkills==false){
          return;
  }


  // Dnow we put this generated html into resume div

  let obj = {
    PersonalInfo:PersonalInfoOBJ,
    Summary: Summary,
    educationEntries: educationEntries,
    experienceEntries: experienceEntries,
    SkillsEntries: SkillsEntries,
  };
  let prevData = JSON.parse(localStorage.getItem("ResumeInfo")) || [];
  prevData.push(obj);
  localStorage.setItem("ResumeInfo", JSON.stringify(prevData));
  let baseUrl = "/resume.html";
  let IDvalue = prevData.length - 1;
  let queryString = `${encodeURIComponent("id")}=${encodeURIComponent(IDvalue)}`;
  const urlWithParams = `${baseUrl}?${queryString}`;
  window.location.href = urlWithParams;
});
