const allTab = document.getElementById('allTab');
const openTab = document.getElementById('openTab');
const closedTab = document.getElementById('closedTab');

let allIssues = [];

// Spinner functions
function showSpinner(){
  document.getElementById("spinner").classList.remove("hidden");
}

function hideSpinner(){
  document.getElementById("spinner").classList.add("hidden");
}


// Load issues
async function loadIssues() {

  showSpinner();

  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();

  allIssues = data.data;

  // 🔹 Initially All tab active
  setActive(allTab);

  displayIssues(allIssues);

  document.getElementById("issueCount").innerText =
    `${allIssues.length} Issues`;

  hideSpinner();
}

loadIssues();


// All tab
allTab.addEventListener("click", () => {

  showSpinner();

  setActive(allTab);

  displayIssues(allIssues);

  document.getElementById("issueCount").innerText =
    `${allIssues.length} Issues`;

  hideSpinner();

});


// Open tab
openTab.addEventListener("click", () => {

  showSpinner();

  setActive(openTab);

  const openIssues = allIssues.filter(issue => issue.status === "open");

  displayIssues(openIssues);

  document.getElementById("issueCount").innerText =
    `${openIssues.length} Issues`;

  hideSpinner();

});


// Closed tab
closedTab.addEventListener("click", () => {

  showSpinner();

  setActive(closedTab);

  const closedIssues = allIssues.filter(issue => issue.status === "closed");

  displayIssues(closedIssues);

  document.getElementById("issueCount").innerText =
    `${closedIssues.length} Issues`;

  hideSpinner();

});


// Display issues
function displayIssues(issues) {

  const container = document.getElementById('issuesContainer');

  container.innerHTML = "";

  issues.forEach(issue => {

    const div = document.createElement('div');

    div.innerHTML = `
<div class="card bg-white shadow-md border-t-4 ${issue.status === "open" ? "border-green-500" : "border-purple-500"} p-4">

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
    ${issue.labels.map(label => `
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

    container.appendChild(div);

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