const projectsList = document.getElementById('projects-list');
const projectForm = document.getElementById('project-form');
const projectImage = document.getElementById('project-image');
const projectTitle = document.getElementById('project-title');
const projectDesc = document.getElementById('project-desc');

let projects = [];

function addProjectCard(title, desc, imgUrl) {
  const card = document.createElement('div');
  card.className = 'project-card';
  if(imgUrl) {
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = title;
    img.className = 'project-img';
    card.appendChild(img);
  }
  const pTitle = document.createElement('div');
  pTitle.className = 'project-title';
  pTitle.textContent = title;
  card.appendChild(pTitle);
  const pDesc = document.createElement('div');
  pDesc.className = 'project-desc';
  pDesc.textContent = desc;
  card.appendChild(pDesc);
  projectsList.appendChild(card);
}

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let reader = new FileReader();
  let title = projectTitle.value.trim();
  let desc = projectDesc.value.trim();
  let file = projectImage.files[0];
  if(file) {
    reader.onload = function(event) {
      addProjectCard(title, desc, event.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    addProjectCard(title, desc, null);
  }
  projectTitle.value = '';
  projectDesc.value = '';
  projectImage.value = '';
});
