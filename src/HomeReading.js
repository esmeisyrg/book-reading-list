// HomeReading.js
export const HomeReading = () => `
  <div class="flex flex-row gap-2 w-full pb-4">
    <input id="input-add" type="text" class="w-full h-10 border-2 border-primary rounded-lg p-2" placeholder="Add a new book">
    <button id="add-button" type="submit" class="bg-primary p-2 px-8 w-fit text-white rounded-lg cursor-pointer hover:bg-amber-950">Add</button>
  </div>

  <div class="bg-amber-100 rounded-lg p-2 flex justify-between w-full">
    <div>
      <p class="font-mono">The list</p>
    </div>
    <div class="flex gap-4">
      <img class="cursor-pointer" src="/src/assets/icons/check.svg" alt="">
      <img class="cursor-pointer" src="/src/assets/icons/trash.svg" alt="">
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
    console.log('Botón Add clickeado. Valor actual:', input.value);
  });
}
