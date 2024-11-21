function loadCategories(myCategories, option) {
    // Make the Object to Array
    let arrayCategories = myCategories.categories

    // sort Array
    let sortedCategories = [];
    if (option === "m") {
        sortedCategories = arrayCategories.filter(categories => categories.gender.includes("m"));
    } 
    else if (option === "w") {
        sortedCategories = arrayCategories.filter(categories => categories.gender.includes("w"));
    }
  
    // find the id col for Bootstrap Card
    let CardMovie = document.getElementById("col");
  
    // Clear previous movie data
    CardMovie.innerHTML = ""; // This will clear the previous movie data and image
  
    sortedCategories.forEach(category => {
      let article = category.article;
      let description = category.description;
      let image = category.image1;
 
      let AddCardMovie = document.createElement("div");
      AddCardMovie.classList.add("border", "rounded");
      AddCardMovie.style.backgroundColor = "hwb(223 7% 64%)";

        AddCardMovie.innerHTML = `
            <div class="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
                <div class="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                    <div class="my-3 py-3" style="color:white">
                        <h2 class="display-5">${article}</h2>
                        <p class="lead">${description}</p>
                    </div>
                    <img src="${image}" class="border border-warning rounded" alt="${article}" height="300px">
                </div>
            </div>`

        CardMovie.appendChild(AddCardMovie);
    }); // end of for
}

function showMens() {
    // <div class="row">
    //     <div class="col text-center mx-3">
    //         <h1 class="display-7 mt-md-7 p-md-3" style="font-family:'Verdana'"><strong>Men's Clothing</strong></h1>
    //     </div>
    // </div>
    fetch("./category.json")
      .then((response) => response.json())
      .then((myCategories) => loadCategories(myCategories, "m"))
      .catch((err) => console.log("Error :" + err));
}
  
function showWomens() {
    // <div class="row">
    //     <div class="col text-center mx-3">
    //         <h1 class="display-7 mt-md-7 p-md-3" style="font-family:'Verdana'"><strong>Women's Clothing</strong></h1>
    //     </div>
    // </div>
    fetch("./category.json")
      .then((response) => response.json())
      .then((myCategories) => loadCategories(myCategories, "w"))
      .catch((err) => console.log("Error :" + err));
}

function showAbout() {
    let CardMovie = document.getElementById("col");
    CardMovie.innerHTML = `
        <div class="row">
            <div class="col text-center mx-3">
                <h1 class="display-7 mt-md-7" style="font-family:'Verdana'"><strong>Meet Today's Team - September 18th, 2024</strong></h1>
            </div>
        </div>
        <div class="border rounded" style="background-color: hwb(223 7% 64%);">
            <div class="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
                <div class="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                    <div class="my-3 py-3 border border-warning rounded" style="color:white">
                        <h2 class="display-5">Charlie Dolphin</h2>
                        <p class="lead m-md-3">Charlie is dedicated to bringing comfort to the every day lives of our customers. For concerns regarding comfort and product flexibility, Charlie can be personally reached at <strong class="text-warning">cpd@iastate.edu</strong>.</p>
                    </div>
                </div>
                <div class="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                    <div class="my-3 p-3 border border-warning rounded" style="color:white">
                        <h2 class="display-5">Maurissa Higgins</h2>
                        <p class="lead">Maurissa makes sure our customers are always dressed to impress. Concerns regarding product design can be directed to Maurissa at <strong class="text-warning">maukhigs@iastate.edu</strong>.</p>
                    </div>
                </div>
                <div class="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                    <div class="my-3 py-3 border border-warning rounded" style="color:white">
                        <h2 class="display-5">Our Sponsors</h2>
                        <p class="lead">American Cardinal is thankful to all our sponsors from <strong class="text-warning">COM S 3190</strong> and extends special acknowledgments to the inspiration of our designs, <strong class="text-warning">Dr. Abraham N. Aldaco-Gastelum</strong>.</p>
                    </div>
                </div>
            </div>
        </div>`;
}


  
