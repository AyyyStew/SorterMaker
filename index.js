let items = ["red", "blue", "green", "orange", "yellow"];
let sorted = [];
let currentIndex = 0;
let currentItem = null;
let low = 0;
let high = 0;

const main = document.getElementById("play_area");

// Parse input from the textarea
function parseItems() {
  const input = document.getElementById("items_input").value;
  items = input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

// Initialize sorting
function startSorting() {
  parseItems();
  if (items.length < 2) {
    alert("Please enter at least two items to sort.");
    return;
  }

  sorted = [items[0]]; // First item is sorted by default
  currentIndex = 1; // Start with the second item
  currentItem = items[currentIndex];
  low = 0;
  high = sorted.length;

  renderUI();
}

// Handle user's choice during sorting
function choose(preferred) {
  const mid = Math.floor((low + high) / 2);
  if (preferred === "current") {
    high = mid;
  } else {
    low = mid + 1;
  }

  if (low === high) {
    sorted.splice(low, 0, currentItem); // Insert current item into sorted
    currentIndex++;
    currentItem = items[currentIndex] || null; // Move to the next item or finish
    low = 0;
    high = sorted.length;

    renderSortingUI();
    renderResultsUI();
  } else {
    renderSortingUI();
  }
}

// Render the entire UI
function renderUI() {
  main.innerHTML = `
    <div id="sorting_ui" class="mb-6"></div>
    <div id="results_ui"></div>
  `;
  renderSortingUI();
  renderResultsUI();
}

// Render sorting UI
function renderSortingUI() {
  const container = document.getElementById("sorting_ui");

  if (!currentItem) {
    container.innerHTML = `
      <section class="flex flex-col max-w-xl mx-auto my-9 p-6 bg-white rounded-lg shadow-md items-center">
        <h2 class="text-xl font-semibold w-full text-gray-800 text-center">Sorting complete!</h2>
      </section>
    `;
    return;
  }

  const mid = Math.floor((low + high) / 2);
  const compareItem = sorted[mid];

  container.innerHTML = `
    <section class="flex flex-col max-w-xl mx-auto my-9 p-6 bg-white rounded-lg shadow-md items-center">
      <h2 class="text-xl font-semibold w-full text-gray-800 border-b-2 border-gray-300 pb-3 text-center">
        Which do you prefer?
      </h2>
      <div class="flex flex-row justify-center mt-6 gap-7 border-b-2 border-gray-300 pb-6 w-full">
        <button data-choice="current" class="choice-btn p-3 px-6 border-black border-2 font-semibold rounded-lg hover:border-green-600 hover:shadow-lg hover:bg-green-100 focus:ring-2 focus:ring-blue-400 focus:outline-none">
          ${currentItem}
        </button>
        <p class="py-3 text-lg"> Or </p>
        <button data-choice="sorted" class="choice-btn p-3 px-6 border-black border-2 font-semibold rounded-lg hover:border-green-600 hover:shadow-lg hover:bg-green-100 focus:ring-2 focus:ring-blue-400 focus:outline-none">
          ${compareItem}
        </button>
      </div>
      <button id="reset-btn" class="text-sm p-3 mt-5 py-2 border-red-600 border-2 text-red-600 font-semibold rounded-lg hover:text-white hover:bg-red-600 focus:ring-2 focus:ring-blue-400 focus:outline-none">Reset</button>
    </section>
  `;

  // Attach event listeners
  document
    .querySelectorAll(".choice-btn")
    .forEach((btn) =>
      btn.addEventListener("click", (e) => choose(e.target.dataset.choice))
    );
  document
    .getElementById("reset-btn")
    .addEventListener("click", switchToInputView);
}

// Render results UI
function renderResultsUI() {
  const container = document.getElementById("results_ui");

  if (sorted.length === 0) {
    container.innerHTML = `<p class="text-center text-gray-600">No results yet. Start sorting!</p>`;
    return;
  }

  const podium = `
    <section id="podium" class="flex flex-col items-center">
      <ol class="flex flex-row items-end justify-center gap-6 flex-wrap mb-3 border-b-2 border-gray-400 pb-2">
        ${renderPodiumItem(1, sorted[0], "yellow-500", "h-12")}
        ${renderPodiumItem(2, sorted[1], "slate-400", "h-8")}
        ${renderPodiumItem(3, sorted[2], "amber-700", "h-6")}
      </ol>
    </section>
  `;

  const restHtml = sorted
    .slice(3)
    .map((item, index) => `<li class="text-gray-600 text-lg"> ${item}</li>`)
    .join("");

  container.innerHTML = `
    <section class="max-w-xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Current Results:</h3>
      ${podium}
      <ol class="list-decimal list-inside space-y-1" start="4">${restHtml}</ol>
    </section>
  `;
}

// Render a single podium item
function renderPodiumItem(rank, item = "", color, height) {
  return `
    <li class="text-${color} text-${
    5 - rank
  }xl font-semibold order-${rank}  min-w-32">
      <div class="flex flex-col items-center">
        <h3 class="mb-1 text-center">${rank}. ${item || ""}</h3>
        <div class="${height} bg-${color} w-full"></div>
      </div>
    </li>
  `;
}

// Switch to input view
function switchToInputView() {
  main.innerHTML = `
    <section id="list_input" class="max-w-2xl mx-auto my-9 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-gray-800">Add a list of things you want to compare</h2>
      <p class="text-sm text-gray-600 pb-4">The items need to be comma separated.</p>
      <textarea id="items_input" class="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none">${items.join(
        ", "
      )}</textarea>
      <button id="start-btn" class="p-3 mt-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none">
        Press to begin sorting
      </button>
    </section>
  `;

  document.getElementById("start-btn").addEventListener("click", startSorting);
}

// Initialize app
switchToInputView();
