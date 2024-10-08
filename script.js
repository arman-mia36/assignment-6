

// buttonCategoryShow function here  
const buttonCategoryShow = () => {
  console.log("Hello");
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((response) => response.json())
    .then((data) => displayBtnShow(data.categories))
    .catch((err) => console.log(err));
};

//  all pets section function
let pet = [];
const allPets = () => {
  console.log("Allpets");
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((response) => response.json())
    .then((data) => {
      pet = data.pets;
      displayAllPets(pet);
    })
    .catch((err) => console.log(err));
};

// displayBtnShow function here
const displayBtnShow = (categorBtn) => {
  const categoryBtn = document.getElementById("category-btn");
  categorBtn.innerHTML = "";
  categorBtn.forEach((btn) => {
    // console.log(btn);

    const showAllBtn = document.createElement("div");
    showAllBtn.innerHTML = `
        <button class="category-button h-12 w-full flex justify-center gap-2 items-center py-8 rounded-lg border-2">
                        <img src='${btn.category_icon}' alt="">
                        <p>${btn.category}</p>
                    </button>
        
                    `;
    categoryBtn.appendChild(showAllBtn);

    showAllBtn
      .querySelector(".category-button")
      .addEventListener("click", () => {
        
        getPetsByCategory(btn.category);

        document.querySelectorAll(".category-button").forEach((button) => {
          button.classList.remove("active");
        });
        showAllBtn.querySelector(".category-button").classList.add("active");
      });
  });
};

//  get pets by category buttons
const getPetsByCategory = (categoryName) => {
  fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const pets = data.data;
      if (pets.length === 0) {
        document.getElementById("hidden-box").classList.remove("hidden");
        document.getElementById("all-pets").classList.add("hidden");
      } else {
        document.getElementById("hidden-box").classList.add("hidden");
        document.getElementById("all-pets").classList.remove("hidden");
        displayAllPets(pets);
      }
    });
  
};

// click like button function
const likePet = (petId) => {
  const likeImgBox = document.getElementById("like-img-box");
  const likePetImg = document.createElement("div");
  likePetImg.innerHTML = `
  
  <div class=" p-[10px]">
              <img class="rounded-xl w-auto" src="${petId}" alt="" />
            </div>
  
  `;
  likeImgBox.appendChild(likePetImg);
};

// modal function   details
const displayDetails = (id) => {
  console.log(id);

  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((response) => response.json())
    .then((details) => {
      const petData = details.petData;

      // Select the modal elements
      const modalBox = document.getElementById("adoptModal");
      const modalBody = document.getElementById("modalContent");

      modalBody.innerHTML = `
        <div class="border-2 bg-white mt-[200px] p-6 space-y-4 rounded-xl">
          <!-- Image -->
          <div class="w-full">
            <img class="w-full object-cover rounded-xl" src="${petData.image}" alt="${petData.pet_name}">
          </div>
          <!-- Text -->
          <div class="space-y-2">
            <h3 class="text-xl font-bold">${petData.pet_name}</h3>
            
            <!-- Container text -->
            <div class="border-2 flex w-8/12 py-2 justify-between items-center">
              <!-- Left side -->
              <div class="space-y-2">
                <div class="flex gap-2 items-center">
                  <img src="./images/box-icon.png" alt="">
                  <p>Breed: ${petData.breed}</p>
                </div>
                <div class="flex gap-2 items-center">
                  <img src="./images/gender-icon.png" alt="">
                  <p>Birth: ${petData.date_of_birth}</p>
                </div>
                <div class="flex gap-2 items-center">
                  <img src="./images/gender-icon.png" alt="">
                  <p>vaccinated_status: ${petData.vaccinated_status}</p>
                </div>
              </div>
              <!-- Right side -->
              <div class="space-y-2">
                <div class="flex gap-2 items-center">
                  <img src="./images/bird-icon.png" alt="">
                  <p>Gender: ${petData.gender}</p>
                </div>
                <div class="flex gap-2 items-center">
                  <img src="./images/dolor-icon.png" alt="">
                  <p>Price: $${petData.price}</p>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <h3 class="text-2xl font-bold">Details Information</h3>
          <p>${petData.pet_details}</p>

          <button id="closeButton" class="mt-4 px-4 py-2 w-full text-green-900 bg-[#0E7A811A] rounded">Cancel</button>
        </div>
      `;

      // Show the modal
      modalBox.classList.remove("hidden");

      // Close modal on button click
      document.getElementById("closeButton").addEventListener("click", () => {
        modalBox.classList.add("hidden");
      });
    })
    .catch((error) => {
      console.error("Error fetching pet details:", error);
    });
};

// displayAllPets function here
const displayAllPets = (pets) => {
  const allPets = document.getElementById("all-pets");
  const spinner = document.getElementById("spinner");
  spinner.classList.add("flex");
  spinner.classList.remove("hidden");
  allPets.classList.add("invisible");

  setTimeout(() => {
    allPets.innerHTML = "";
    pets.forEach((pet) => {
      const showAllPets = document.createElement("div");
      showAllPets.innerHTML = `
        
        <div class="border-2 p-6 space-y-4 rounded-xl">
            <!-- img -->
             <div class="w-full">
              <img class="w-full rounded-xl" src="${
                pet.image || "Not Found"
              }" alt="">
             </div>
             <!-- text -->
              <div class="space-y-2">
                <h3 class="text-xl font-bold">${
                  pet.pet_name || "Not Found"
                }</h3>
                <div class="flex gap-2 items-center">
                  <img src="./images/box-icon.png" alt="">
                  <p>Breed: ${pet.breed || "Not Found"}</p>
                </div>

                <div class="flex gap-2 items-center">
                  <img src="./images/bird-icon.png" alt="">
                  <p>Birth: ${pet.date_of_birth || "Not Found"}</p>
                </div>

                <div class="flex gap-2 items-center">
                <img src="./images/gender-icon.png" alt="">
                  <p>Gender: ${pet.gender || "Not Found"}</p>
                </div>

                <div class="flex gap-2 items-center">
                  <img src="./images/dolor-icon.png" alt="">
                  <p>Price : ${pet.price || "Not Found"}$</p>
                </div>

              </div>
              <hr>
              <!-- btn -->
               <div class="flex justify-between items-center">
                <button onclick="likePet('${
                  pet.image || "Not Found"
                }')" class=" btn  border-2 border-[#0e79814d] bg-transparent"><img " src="./images/like-icon.png" alt=""></button>

                <button   onclick="clickAdoptBtn(this)"  class="btn text-primary border-2 border-[#0e79814d] bg-transparent">Adopt</button>

                <button onclick="displayDetails('${
                  pet.petId || "Not Found"
                }')" class="btn text-primary border-2 border-[#0e79814d] bg-transparent">Details</button>

               </div>


           </div>

        `;
      allPets.appendChild(showAllPets);
    });

    spinner.classList.add("hidden");
    spinner.classList.remove("flex");
    allPets.classList.remove("invisible");
  }, 2000);
};

// ============sort
function sortedProducts() {
  console.log("Sort button clicked");
  const data = pet.sort((a, b) => b.price - a.price);
  // console.log(data);
  displayAllPets(data);
}


const style = document.createElement("style");
style.innerHTML = `
.active {
background-color: rgba(14, 122, 129, 0.1);
border-radius: 120px;
border: 1.5px solid rgb(14, 122, 129);
}

`;
document.head.appendChild(style);

buttonCategoryShow();
allPets();


// adopt 
let interval;
function clickAdoptBtn(e) {
  e.classList.add(
    "bg-[lightgray]",
    "text-[gray]",
    "border-none",
    "disabled_button",
    "hover:bg-[lightgray]"
  );

  const countdownBox = document.getElementById("countdown_container");
  countdownBox.classList.remove("hidden");
  countdownBox.classList.add("flex");

  let counter = 3;
  const counterPoint = document.getElementById("countdown");
  counterPoint.textContent = counter;

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    counter--;
    counterPoint.textContent = counter;

    if (counter <= 1) {
      clearInterval(interval);
      setTimeout(() => {
        countdownBox.classList.add("hidden");
        countdownBox.classList.remove("flex");
        e.innerHTML = "Adopted";
        e.disabled = true;
      }, 1000);
    }
  }, 1000);
}
