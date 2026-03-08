const allTab = document.getElementById('allTab');
const openTab = document.getElementById('openTab');
const closedTab = document.getElementById('closedTab');

const issueCount = document.getElementById('issueCount');

const modalTitle = document.getElementById("modalTitle");
const modalIssueId = document.getElementById("modalIssueId");
const modalStatusBadge = document.getElementById("modalStatusBadge");
const modalStatusText = document.getElementById("modalStatusText");

const spinner = document.getElementById("spinner");
const issuesContainer = document.getElementById("issuesContainer");


const modalAuthor = document.getElementById("modalAuthor");
const modalCreated = document.getElementById("modalCreated");
const modalDescription = document.getElementById("modalDescription");
const modalAssignee = document.getElementById("modalAssignee");
const modalPriority = document.getElementById("modalPriority");
const modalLabels = document.getElementById("modalLabels");

let allIssues = [];

// Spinner functions
function showSpinner(){
  spinner.classList.remove("hidden");
  issuesContainer.classList.add("hidden");
}

function hideSpinner(){
  spinner.classList.add("hidden");
  issuesContainer.classList.remove("hidden");
}

// Issue Count helper function 
function updateIssueCount(count){
  issueCount.innerText = `${count} Issues`;
}

// Load issues
async function loadIssues() {

  try {

    showSpinner();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    allIssues = data?.data || [];

    setActive(allTab);

    displayIssues(allIssues);

    updateIssueCount(allIssues.length);

  } catch (error) {

    console.error(error);
    alert("Failed to load issues");

  } finally {

    hideSpinner();

  }
}

loadIssues();


// All tab
allTab.addEventListener("click", () => {

  
  setActive(allTab);

  displayIssues(allIssues);

  updateIssueCount(allIssues.length);

  
});


// Open tab
openTab.addEventListener("click", () => {

  setActive(openTab);

  const openIssues = allIssues.filter(issue => issue.status === "open");

  displayIssues(openIssues);

  updateIssueCount(openIssues.length);

  });


// Closed tab
closedTab.addEventListener("click", () => {

 setActive(closedTab);

  const closedIssues = allIssues.filter(issue => issue.status === "closed");

  displayIssues(closedIssues);

  updateIssueCount(closedIssues.length);

 });


// Display issues
function displayIssues(issues) {

  issuesContainer.innerHTML = "";

  if (issues.length === 0) {
    issuesContainer.innerHTML = `
      <p class="text-center col-span-full text-gray-500">
        No issues found
      </p>`;
    return;
  }

  issues.forEach(issue => {

    const div = document.createElement('div');

    div.innerHTML = `
<div class="card bg-white shadow-md border-t-4 ${issue.status === "open" ? "border-green-500" : "border-purple-500"} p-4 h-full">

  <div class="flex justify-between items-center mb-2">
  <div class="${issue.status === "open" ? "text-green-600" : "text-purple-600"}">
    ${
      issue.status === "open"
        ? `<i class="fa-regular fa-circle"></i>`
        : `<i class="fa-regular fa-circle-check"></i>`
    }
  </div>

  <span class="badge uppercase ${
    issue.priority === "high"
      ? "text-red-600 bg-red-100"
      : issue.priority === "medium"
      ? "text-yellow-600 bg-yellow-100"
      : "text-green-600 bg-green-100"
  }">
    ${issue.priority}
  </span>
</div>

  <h2 class="font-semibold text-gray-800 mb-2">
    ${issue.title}
  </h2>

  <p class="text-sm text-gray-500 mb-3">
    ${issue.description}
  </p>

  <div class="flex flex-wrap gap-2 mb-3">
    ${(issue.labels || []).map(label => `
      <span class="badge uppercase badge-warning badge-sm">${label}</span>
    `).join("")}
  </div>

  <div class="text-xs text-gray-500 flex justify-between">
    <div>
      <p>#${issue.id} by ${issue.author}</p>
      <p>Assignee: ${issue.assignee || "Unassigned"}</p>
    </div>

    <div class="text-right">
      <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
      <p>Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</p>
    </div>
  </div>

</div>
`;
      // Modal show function 
    div.addEventListener('click', () => {
      openIssueModal(issue.id);
    });


    issuesContainer.appendChild(div);

  });
}


// Active tab
function setActive(activeBtn) {

  allTab.classList.remove("btn-primary");
  openTab.classList.remove("btn-primary");
  closedTab.classList.remove("btn-primary");

  allTab.classList.add("btn-outline");
  openTab.classList.add("btn-outline");
  closedTab.classList.add("btn-outline");

  activeBtn.classList.remove("btn-outline");
  activeBtn.classList.add("btn-primary");
}

// Modal function 
async function openIssueModal(id){

  try{

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();

    const issue = data?.data || [];

  modalTitle.innerText = issue.title;

  modalIssueId.innerText = `#${issue.id}`;

  
  if(issue.status === "open"){
    modalStatusBadge.innerText = "Opened";
    modalStatusBadge.className = "badge badge-success badge-sm";

    modalStatusText.innerText = "Opened";
  } else {
    modalStatusBadge.innerText = "Closed";
    modalStatusBadge.className = "badge badge-secondary badge-sm";

    modalStatusText.innerText = "Closed";
  }

  modalAuthor.innerText = issue.author;

  modalCreated.innerText =
    new Date(issue.createdAt).toLocaleDateString();

  modalDescription.innerText = issue.description;

  modalAssignee.innerText =
    issue.assignee || "Unassigned";

  
  // priority Color match 
  
modalPriority.innerText = issue.priority;

modalPriority.className =
  issue.priority === "high"
    ? "badge uppercase text-red-600 bg-red-100"
    : issue.priority === "medium"
    ? "badge uppercase text-yellow-600 bg-yellow-100"
    : "badge uppercase text-green-600 bg-green-100";

  // Labels
  
  modalLabels.innerHTML = (issue.labels || [])
    .map(label => `
      <span class="badge uppercase badge-warning badge-sm">${label}</span>
    `)
    .join("");

  document.getElementById("issueModal").showModal();
} catch(err){

    alert("Failed to load issue details");

  }

}

// Search Function 
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", searchIssues);

async function searchIssues(){

  const searchText = searchInput.value.trim();

  if(!searchText){
    alert("Please enter something to search");
    return;
  }

  try{

    showSpinner();

    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`
    );

    const data = await res.json();

    const issues = data?.data || [];

    displayIssues(issues);

    setActive(allTab);

    updateIssueCount(issues.length);

  }catch(err){

    alert("Search failed");

  }finally{

    hideSpinner();

  }

}


// Press enter to work
searchInput.addEventListener("keydown", function(e){

  if(e.key === "Enter"){
    searchIssues();
  }

});