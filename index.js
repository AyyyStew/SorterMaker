let items = ["red", "blue", "green", "orange", "yellow"];
let sorted = [];
let currentIndex = 0;
let currentItem = null;
let low = 0;
let high = 0;

const main = document.getElementById("play_area");

// Parse items from the textarea
function parseItems() {
  const itemsInput = document.getElementById("items_input").value;
  items = itemsInput
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

// Start the sorting process
function startSorting() {
  parseItems();
  if (items.length < 2) {
    alert("Please enter at least two items to sort.");
    return;
  }

  const itemsCopy = [...items];
  sorted = [itemsCopy[0]]; // Start sorted list with the first item
  currentIndex = 1; // Skip the first item, as it's already in the sorted list
  currentItem = itemsCopy[currentIndex];
  low = 0;
  high = sorted.length;

  renderUI();
  renderResultsUI(); // Show initial results
}

// Handles user's choice during sorting
function choose(preferred) {
  if (preferred === "current") {
    high = Math.floor((low + high) / 2);
  } else {
    low = Math.floor((low + high) / 2) + 1;
  }

  if (low === high) {
    sorted.splice(low, 0, currentItem);

    currentIndex++;
    if (currentIndex < items.length) {
      currentItem = items[currentIndex];
      low = 0;
      high = sorted.length;
      renderSortingUI();
      renderResultsUI(); // Update results dynamically
    } else {
      currentItem = null;
      renderSortingUI(); // Clear sorting UI
      renderResultsUI(); // Show final results
    }
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

// Render the sorting UI
function renderSortingUI() {
  const sortingContainer = document.getElementById("sorting_ui");

  if (!currentItem) {
    sortingContainer.innerHTML = `
      <section class="flex flex-col max-w-xl mx-auto my-9 p-6 bg-white rounded-lg shadow-md items-center">
        <h2 class="text-xl font-semibold w-full text-gray-800 text-center">
          Sorting complete!
        </h2>
      </section>
    `;
    return;
  }

  const mid = Math.floor((low + high) / 2);
  const compareItem = sorted[mid];
  sortingContainer.innerHTML = `
    <section class="flex flex-col max-w-xl mx-auto my-9 p-6 bg-white rounded-lg shadow-md items-center">
      <h2 class="text-xl font-semibold w-full text-gray-800 border-b-2 border-gray-300 pb-3 text-center">
        Which do you prefer?
      </h2>
      <div class="flex flex-row justify-center mt-6 gap-7 border-b-2 border-gray-300 pb-6 w-full">
        <button onclick="choose('current')"
          class="p-3 px-6 border-black border-2 font-semibold rounded-lg hover:border-green-600 hover:shadow-lg hover:bg-green-100 focus:ring-2 focus:ring-blue-400 focus:outline-none">
          ${currentItem}
        </button>
        <p class="py-3 text-lg"> Or </p>
        <button onclick="choose('sorted')"
          class="p-3 px-6 border-black border-2 font-semibold rounded-lg hover:border-green-600 hover:shadow-lg hover:bg-green-100 focus:ring-2 focus:ring-blue-400 focus:outline-none">
          ${compareItem}
        </button>
      </div>
      <button onclick="switchToInputView()"
        class="text-sm p-3 mt-5 py-2 border-red-600 border-2 text-red-600 font-semibold rounded-lg hover:text-white hover:bg-red-600 focus:ring-2 focus:ring-blue-400 focus:outline-none">Reset</button>
    </section>
  `;
}

function renderResultsUI() {
  const resultsContainer = document.getElementById("results_ui");

  if (sorted.length === 0) {
    resultsContainer.innerHTML = `
      <p class="text-center text-gray-600">No results yet. Start sorting!</p>
    `;
    return;
  }

  const podiumHtml = `
    <section id="podium" class="flex flex-col items-center">
      <ol class="flex flex-row items-end justify-center gap-6 flex-wrap mb-3 border-b-2 border-gray-400 pb-2">
        <li class="text-yellow-500 text-3xl font-semibold order-2">
          <div>
            <h3 class="mb-1">1. ${sorted[0] || ""}</h3>
            <div class="h-12 bg-yellow-500 w-full min-w-36 mx-auto"></div>
          </div>
        </li>
        <li class="text-slate-400 text-2xl font-semibold order-3">
          <div>
            <h4 class="mb-1">2. ${sorted[1] || ""}</h4>
            <div class="h-8 bg-slate-400 w-full min-w-36 mx-auto"></div>
          </div>
        </li>
        <li class="text-amber-700 text-xl font-semibold order-1">
          <div>
            <h5 class="mb-1">3. ${sorted[2] || ""}</h5>
            <div class="h-6 bg-amber-700 w-full min-w-36 mx-auto"></div>
          </div>
        </li>
      </ol>
    </section>
  `;

  const theRest = sorted.slice(3);
  const restHtml = theRest
    .map(
      (item, index) => `
        <li class="text-gray-600 text-lg">${item}</li>
      `
    )
    .join("");

  resultsContainer.innerHTML = `
    <section class="max-w-xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Current Results:</h3>
      ${podiumHtml}
      <ol class="list-decimal list-inside space-y-1" start='4'>${restHtml}</ol>
    </section>
  `;
}

// Switch to the input view
function switchToInputView() {
  main.innerHTML = `
    <section id="list_input" class="max-w-2xl mx-auto my-9 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-gray-800">Add a list of things you want to compare</h2>
      <p class="text-sm text-gray-600 pb-4">The items need to be comma separated.</p>
      <textarea id="items_input" class="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none">${items.join(
        ", "
      )}</textarea>
      <button onclick="startSorting()" class="p-3 mt-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none">
        Press to begin sorting
      </button>
    </section>
  `;
}

// Initialize app
switchToInputView();
