// HomeReading.js
export const HomeReading = () => `
  <div class="flex flex-row gap-2 w-full">
    <input id="input-add" type="text" class="w-full h-10 border-2 border-primary rounded-lg p-2" placeholder="Add a new book">
    <button id="add-button" type="submit" class="bg-primary p-2 px-8 w-fit text-white rounded-lg cursor-pointer hover:bg-amber-950">Add</button>
  </div>
  </div>
`;

export function actions() {

  const tasksArray = [];

  const input = document.getElementById('input-add');
  const button = document.getElementById('add-button');

  const addTask = () => {

    const value = input.value.trim();
    if (value) {
      const newTask = {
        id: tasksArray.length > 0 ? tasksArray[tasksArray.length - 1].id + 1 : 1,
        text: value
      };

      tasksArray.push(newTask);

      const list = document.createElement('div');
      list.classList.add('flex', 'justify-between', 'items-center', 'gap-2', 'w-full');
      list.innerHTML = `
        <div class="rounded-lg p-2 flex justify-between w-full hover:bg-amber-100">
          <div>
            <p class="font-mono">${newTask.text}</p>
          </div>
          <div class="flex gap-4">
            <img class="cursor-pointer" src="/src/assets/icons/check.svg" alt="">
            <img class="delete-element cursor-pointer" src="/src/assets/icons/trash.svg" alt="">
          </div>
        </div>`;

      const secondContainer = document.getElementById('second-container');
      secondContainer.appendChild(list);

      input.value = '';

      const deleteBtn = list.querySelector(".delete-element");
      deleteBtn.addEventListener('click', () => {
        list.remove();

        const index = tasksArray.findIndex(t => t.id === newTask.id);
        if (index !== -1) tasksArray.splice(index, 1);
        console.log("Array actualizado:", tasksArray);
      });

      console.log("Array actualizado", tasksArray);
    }
  };

  input.addEventListener('input', (e) => {
    console.log(e.target.value);
  });

  button.addEventListener('click', addTask);

  input.addEventListener('keypress', (e) => {
    if (e.key === "Enter"){
      addTask();
    }
  }
  );
}