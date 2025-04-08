// HomeReading.js
export const HomeReading = () => `
  <div class="flex flex-row gap-2 w-full pb-2">
    <input id="input-add" type="text" class="w-full h-10 border-2 border-primary rounded-lg p-2" placeholder="Add a new book">
    <button id="add-button" type="submit" class="bg-primary p-2 px-8 w-fit text-white rounded-lg cursor-pointer hover:bg-amber-950">Add</button>
  </div>
  </div>
`;

export function actions() {

  let tasksArray = JSON.parse(localStorage.getItem("data")) || [];

  const input = document.getElementById('input-add');
  const button = document.getElementById('add-button');
  const secondContainer = document.getElementById('second-container');

  
  const renderTasks = (task) =>{
    const list = document.createElement('div');
    list.classList.add('flex', 'justify-between', 'items-center', 'gap-2', 'w-full');
    list.innerHTML = `
      <div class="rounded-lg p-2 flex justify-between w-full hover:bg-amber-100">
        <div>
          <p class="font-mono">${task.text}</p>
        </div>
        <div class="flex gap-4">
          <img class="cursor-pointer" src="/src/assets/icons/check.svg" alt="">
          <img class="delete-element cursor-pointer" src="/src/assets/icons/trash.svg" alt="">
        </div>
      </div>`;

    secondContainer.appendChild(list);

    const deleteBtn = list.querySelector(".delete-element");
      deleteBtn.addEventListener('click', () => {
      list.remove();

      tasksArray = tasksArray.filter(t => t.id !== task.id);
      localStorage.setItem("data", JSON.stringify(tasksArray));    
    });

  }

  const addTask = () => {

    const value = input.value.trim();
    if (value) {
      const newTask = {
        id: tasksArray.length > 0 ? tasksArray[tasksArray.length - 1].id + 1 : 1,
        text: value
      };

      tasksArray.push(newTask);
      localStorage.setItem("data", JSON.stringify(tasksArray));
      renderTasks(newTask);

      input.value = '';
    }
  };


  tasksArray.forEach(renderTasks);

  button.addEventListener('click', addTask);

  input.addEventListener('keypress', (e) => {
    if (e.key === "Enter"){
      addTask();
    }
  }
  );
}