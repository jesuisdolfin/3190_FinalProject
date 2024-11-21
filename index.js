window.onload = function() {
    showAbout();
    let header = document.getElementById("header");
    header.innerHTML = `
        <ul>
        <li><a href="#" ><button type="button" onclick="showAbout()" class="navBtn">About</button></a></li>
        <li><a href="#" ><button type="button"  onclick="showMens()" class="navBtn">Men</button></a></li>
        <li><a href="#" ><button type="button"  onclick="showWomens()" class="navBtn">Women</button></a></li>
      </ul>
      <ul>
        <li style="margin-left: auto"> 
        <a onclick="showCart()">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
        </a>
        <ul id="items" hidden>
        </ul>
        </li>
        <li>
          <div class="container" id="loginform">
            <button type="button" class="navBtn">Login</button>
              <div class="content">
                <form class="form" id="login">
                  <div class="formInputGroup">
                    <input type="text" class="formInput" id="username" autofocus placeholder="Username">
                  </div>
                  <div class="formInputGroup">
                    <input type="password" class="formInput" id="password" placeholder="Password">
                  </div>
                  <button class="formButton" type="button" onclick="login()">Continue</button>
                  <p class="formText">
                    <button type="button" id="linkCreateAccount" onclick="signup()">Create an account</button>
                  </p>
              </form>
              </div>
          </div>
          <div id="loggedin" hidden>
            <p id="greeting"></p>
          </div>
        </li>
      </ul>`
      var collBtn = document.getElementsByClassName("navBtn");
      var i;
      for (i = 0; i < collBtn.length; i++) {
        collBtn[i].addEventListener("click", 
        function() {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.display === "list-item") {
            content.style.display = "none";
          } else {
            content.style.display = "list-item";
          }
        });
      }
}

const loadCategories = (myCategories, option) => {
    let arrayCategories = myCategories.categories;
    let sortedCategories = [];
    if (option === "m") {
        sortedCategories = arrayCategories.filter(categories => categories.gender.includes("m"));
    } else if (option === "w") {
        sortedCategories = arrayCategories.filter(categories => categories.gender.includes("w"));
    }
    let catalog = document.getElementById("col");
    catalog.classList.add("border", "rounded");
    catalog.style.backgroundColor = "hwb(223 7% 64%)";
    catalog.style.display = "flex";
    catalog.style.flexWrap = "wrap";
    catalog.innerHTML = "";

    sortedCategories.forEach(category => {
      let currentImageIndex = 0;
      let images = [category.image1, category.image2, category.image3];
      let captions = [category.img1cap, category.img2cap, category.img3cap];

      let article = category.article;
      let description = category.description;

      let showCategories = document.createElement("div");
      showCategories.style.flex = "1 1 20%";
      showCategories.style.margin = "0px";
        
      showCategories.innerHTML = `
          <div class="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
              <div class="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                  <div class="my-3 py-3" style="color:white">
                      <h2 class="display-5">${article}</h2>
                      <button class="prev-btn">←</button>
                      <img src="${images[currentImageIndex]}" class="border border-warning rounded" alt="${article}" height="300px" width="200px">
                      <button class="next-btn">→</button>
                      <p class="lead">${description}</p>
                      <p class="caption">${captions[currentImageIndex]}</p>
                      <button class="add-btn" type="button">Add To Cart</button>
                  </div>
              </div>
          </div>`;
        
        let imgElement = showCategories.querySelector("img");
        let captionElement = showCategories.querySelector(".caption");
        let prevBtn = showCategories.querySelector(".prev-btn");
        let nextBtn = showCategories.querySelector(".next-btn");
        let addBtn = showCategories.querySelector(".add-btn");
        
        prevBtn.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            imgElement.src = images[currentImageIndex];
            captionElement.textContent = captions[currentImageIndex];
        });
        
        nextBtn.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            imgElement.src = images[currentImageIndex];
            captionElement.textContent = captions[currentImageIndex];
        });

        addBtn.addEventListener("click", () => {
          const items = document.getElementById('items');
          const newItem = document.createElement('li');
          newItem.textContent = captionElement.textContent;
          items.appendChild(newItem);
        })
        
        catalog.appendChild(showCategories);
    });
};


const items = document.getElementById('items');
function showCart() {
    const items = document.getElementById('items');
    if (document.getElementById('items').hidden == true) {
        document.getElementById('items').hidden=false;
    }
    else {
        document.getElementById('items').hidden = true;
    }
}

function addToCart() {
    fetch('./data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const items = document.getElementById('items');
        const newItem = document.createElement('li');
        newItem.textContent = "New Item: " + data.captionElement;
        items.appendChild(newItem);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}

function showMens() {
    fetch("./data.json")
      .then((response) => response.json())
      .then((myCategories) => loadCategories(myCategories, "m"))
      .catch((err) => console.log("Error :" + err));
}
  
function showWomens() {
    fetch("./data.json")
      .then((response) => response.json())
      .then((myCategories) => loadCategories(myCategories, "w"))
      .catch((err) => console.log("Error :" + err));
}

function showAbout() {
    let today = new Date();
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = today.toLocaleDateString('en-US', options);
    let about = document.getElementById("col");
    about.innerHTML = `
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
                        <p class="lead">American Cardinal is thankful to all our sponsors from <strong class="text-warning">SE/ComS3190 Construction of User Interfaces, Fall 2024</strong> and extends special acknowledgments to the inspiration of our designs, <strong class="text-warning">Dr. Abraham N. Aldaco-Gastelum</strong>.</p>
                    </div>
                </div>
            </div>
        </div>`;
}
