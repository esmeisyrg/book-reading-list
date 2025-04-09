// BookCard.js
export const createBookCard = ({ image, text, author, pages }, options = {}) => {
    const card = document.createElement("div");
    card.className =
    "book-card border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all transition-discrete";
  
    card.innerHTML = `
      <div class="flex flex-col w-full p-2">
        <div class="flex gap-2 w-full items-center">
          <img class="w-18 h-26  aspect-[3/4] object-cover" src="${image ?? "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}" alt="Book cover">
          <div class="flex flex-col flex-grow">
            <h2 class="font-bold text-primary">${text ?? "-"}</h2>
            <p class="font-normal">${author ?? "Desconocido"}</p>

            ${pages ? `<p class="font-normal text-gray-500">Pages: ${pages}</p>` : ''}
          </div>
          ${options.showActions ? `
            <div class="flex gap-2">
            <div class="p-1 bg-amber-100 rounded-4xl hover:bg-[#d4ff95]">
              <img class="check-element cursor-pointer w-6" src="/src/assets/icons/check.svg" alt="Mark as read">
            </div>

            <div class="p-1 bg-amber-100 rounded-4xl hover:bg-red-300 ">
                <img class="delete-element cursor-pointer w-6" src="/src/assets/icons/trash.svg" alt="Delete">
            </div>
            </div>
          ` : ""}
        </div>
      </div>
    `;
  
    if (options.showActions) {
      card.querySelector(".delete-element")?.addEventListener("click", () => {

        card.classList.add("opacity-0", "scale-95");

        setTimeout(() => {
          options.onDelete?.();

        }, 500);
      });
  
      card.querySelector(".check-element")?.addEventListener("click", () => {

        card.classList.add("opacity-0", "scale-95");

        setTimeout(() => {
          options.onCheck?.();
        }, 500);

      });
    }
  
    return card;
  };
