// HomeReading.js
export const HomeReading = () => `
  <div class="flex flex-row gap-2 w-full">
    <input id="input-add" type="text" class="w-full h-10 border-2 border-primary rounded-lg p-2" placeholder="Add a new book">
    <button id="add-button" type="submit" class="bg-primary p-2 px-8 w-fit text-white rounded-lg cursor-pointer hover:bg-amber-950">Add</button>
  </div>
  </div>
`;

export function actions() {
  const input = document.getElementById('input-add');
  const button = document.getElementById('add-button');

  input.addEventListener('input', (e)=>{
    console.log(e.target.value)
  })


  button.addEventListener('click', () => {
    const value = input.value;
    if (value) {
      const list = document.createElement('div');
      list.classList.add('flex', 'justify-between', 'items-center', 'gap-2', 'w-full');
      list.innerHTML = `
    <div class=" rounded-lg p-2 flex justify-between w-full hover:bg-amber-100">
    <div>
      <p class="font-mono">${value}</p>
    </div>
    <div class="flex gap-4">
      <img class="cursor-pointer" src="/src/assets/icons/check.svg" alt="">
      <img class="delete-element cursor-pointer" src="/src/assets/icons/trash.svg" alt="">
    </div>
    </di>
      `;
      document.getElementById('second-container').appendChild(list);
      input.value = '';

      const elementItem = document.querySelector(".delete-element");
      elementItem.addEventListener('click', () =>{
        list.remove();
      })
    }



  });
}

// 'rounded-lg', 'border-2',)
