console.log("Hello world");

main = document.getElementById("play_area");

items = ["red", "blue", "green", "yellow", "red", "orange"];
sorted = [];

function switchToInputView(e) {
  e.preventDefault();
  console.log("Entering Input view");
  main.innerHTML = `
        <section id="list_input" class="max-w-2xl mx-auto my-9 p-6 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold text-gray-800">Add a list of things you want to compare</h2>
            <p class="text-sm text-gray-600 pb-4">The items need to be comma separated.</p>

            <textarea class="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none">${items.join(
              ", "
            )}</textarea>

            <button onClick="switchToSortView(event)" class="p-3 mt-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none">Press to begin sorting</button>
        </section>
    `;
}

function switchToSortView(e) {
  e.preventDefault();
  sorted = [];
  console.log("Entering Sorting View");
  main.innerHTML = `
        <section id="sort_area" class="max-w-xl mx-auto my-9 p-6 bg-white rounded-lg shadow-md">
            <h2 class="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-3 text-center">Which do you
                prefer?
            </h2>

            <div id="choice_area" class="flex flex-row justify-center mt-6 gap-7 ">

                <button onClick="switchToSortView(event)"
                    class="p-3 border-black border-2 font-semibold rounded-lg hover:border-green-600 hover:shadow-lg hover:bg-green-100 focus:ring-2 focus:ring-blue-400 focus:outline-none">A</button>

                <p class="py-3 text-lg"> Or </p>

                <button onClick="switchToSortView(event)"
                    class="p-3 border-black border-2 font-semibold rounded-lg hover:border-green-600 hover:shadow-lg hover:bg-green-100 focus:ring-2 focus:ring-blue-400 focus:outline-none">B</button>
            </div>
        </section>
  `;
}

function switchToResultsView(e) {
  e.preventDefault();
}

switchToInputView(new Event(""));
