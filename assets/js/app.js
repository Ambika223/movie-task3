const cl = console.log;

const showMovieBtn = document.getElementById('showMovieBtn');
const movieContainer = document.getElementById('movieContainer');
const movieModel = document.getElementById('movieModel');
const closeMovieModal = [...document.querySelectorAll('.closeMovieModal')];
const backDrop = document.getElementById('backDrop');
const movieCloseIcon = document.getElementById('movieCloseIcon');

const movieForm = document.getElementById('movieForm');
const movieName = document.getElementById('movieName');
const movieImage = document.getElementById('movieImage');
const movieDescription = document.getElementById('movieDescription');
const movieRating = document.getElementById('movieRating');
const addMovieBtn = document.getElementById('addMovieBtn');
const updateMovieBtn = document.getElementById('updateMovieBtn');
const cancelMovieBtn = document.getElementById('cancelMovieBtn');


// const Movies = [
//   {
//     movieName: "Gentleman",
//     movieImage:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcud2HxVXn2s1r31YlKA22cb8k9amsBjna-nbZyKBiU_o2ySK9Rkpffvo&s=10",
//     movieDescription:
//       "The Gentleman Hindi dubbed movie (originally a Kannada action-thriller titled Gentleman) tells the story of Bharath, a man who suffers from a rare medical condition known as sleeping beauty syndrome. [1] (https://www.zee5.com/movies/details/gentlemen/0-0-1z575264), [2] (https://www.youtube.com/watch?v=2oFxPlt5n_s)",
//     movieRating: 5,
//     id: "5",
//   },
//   {
//     movieName: "Leo",
//     movieImage:
//       "https://m.media-amazon.com/images/M/MV5BMDk5ODNjNzMtYzI5Yy00NmI3LWIwYzctMTFjZjcwN2I2Yzk2XkEyXkFqcGc@._V1_.jpg",
//     movieDescription:
//       "A Tamil action thriller starring Vijay, directed by Lokesh Kanagaraj.",
//     movieRating: 4,
//     id: "6",
//   },
//   {
//     movieName: "Pushpa 2",
//     movieImage:
//       "https://img.nowrunning.com/content/movie/2023/pushp-27946/bg8-pushpa-2.jpg",
//     movieDescription:
//       "An action-packed Telugu drama starring Allu Arjun, continuing the story of Pushpa Raj.",
//     movieRating: 5,
//     id: "7",
//   },
// ];

// localStorage.setItem("moviesArr", JSON.stringify(Movies));

let movieData = localStorage.getItem('moviesArr');

let moviesArr = [];

if (movieData) {
  moviesArr = JSON.parse(movieData);
}
else {
  moviesArr = Movies;
  localStorage.setItem("moviesArr", JSON.stringify(moviesArr))
}

function setRating(rating) {
  if (rating >= 4) {
    return "badge-success";
  }
  else if (rating >= 3 && rating < 4) {
    return "badge-warning";
  }
  else {
    return "badge-danger";
  }
}


function snackBar(msg) {
  Swal.fire({
    text: msg,
    icon: "success",
    timer: 2500,
  });
}


function createMovieCards(arr) {
  let res = ``;
  arr.forEach((movie) => {
    res += `
        <div class="col-3 mb-3">
      <div class="card movieCard" id="${movie.id}">
            <div class="card-header">
              <div class="row">

                <div class="col-9">
                  <h4 class="headTitle">${movie.movieName}</h4>
                </div>

                <div class="col-3 text-right">
                  <span><h4 class="badge p-2 ${setRating(movie.movieRating)}">${movie.movieRating}</h4></span>
                </div>

              </div>
            </div>
            <div class="card-body py-1">
              <figure>
                <img src="${movie.movieImage}" alt="${movie.movieName}">
             
              <figcaption>
                <h4>${movie.movieName}</h4>
                <p>${movie.movieDescription}</p>
              </figcaption>
               </figure>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <button onclick="onMovieEditHandler(this)" class="btn btn-sm net-sec-btn" id="editMovieBtn">Edit</button>
              <button onclick="onDeleteHandler(this)" class="btn btn-sm net-pri-btn" id="deleteMovieBtn">Delete</button>
            </div>
          </div>
          </div>
    `;
  });
  movieContainer.innerHTML = res;

}
createMovieCards(moviesArr);

function onModalToggle() {
  movieModel.classList.toggle('active');
  backDrop.classList.toggle('active');
  movieForm.reset();
}

// showMovieBtn.addEventListener('click', onModalToggle);
closeMovieModal.forEach(ele => {
  ele.addEventListener("click", onCancelHandler);
})

//CREATE
function onMovieAdd(eve) {
  eve.preventDefault();
  let movieObj = {
    movieName: movieName.value,
    movieImage: movieImage.value,
    movieDescription: movieDescription.value,
    movieRating: movieRating.value,
    id: Date.now().toString()

  }
  moviesArr.unshift(movieObj);
  localStorage.setItem("moviesArr", JSON.stringify(moviesArr))
  createMovieCards(moviesArr)

  // let card = document.createElement('div');
  // card.className = 'col-md-3 mb-4';
  // card.innerHTML = `
  //         <div class="card movieCard" id="${movieObj.id}">
  //           <div class="card-header">
  //             <div class="row">
  //               <div class="col-9">
  //                 <h4 class="m-0">${movieObj.movieName}</h4>
  //               </div>
  //               <div class="col-3 text-right">
  //               <h5 class="m-0"><span class="badge ${setRating(movieObj.movieRating)}">${movieObj.movieRating}</span>
  //               </div>
  //             </div>
  //           </div>
  //           <div class="card-body py-0">
  //             <figure class="m-0">
  //               <img src="${movieObj.movieImage}" alt="${movieObj.movieName}">

  //             <figcaption>
  //               <h4>${movieObj.movieName}</h4>
  //               <p>${movieObj.movieDescription}</p>
  //             </figcaption>
  //              </figure>
  //           </div>
  //           <div class="card-footer d-flex justify-content-between">
  //             <button onclick="onMovieEditHandler(this)" class="btn btn-sm net-sec-btn" id="editMovieBtn">Edit</button>
  //             <button onclick="onDeleteHandler(this)" class="btn btn-sm net-pri-btn" id="deleteMovieBtn">Delete</button>
  //           </div>

  //       </div>`
  // movieContainer.append(card);
  movieForm.reset();

  onModalToggle();
  snackBar(
    `Movie ${movieObj.movieName} added successfully...`
  );
}



//edit
function onMovieEditHandler(ele) {
  const editId = ele.closest(".movieCard").id;
  localStorage.setItem("updateId", editId);
  const editObj = moviesArr.find((el) => el.id === editId);
  //show model for patching values
  onModalToggle();
  movieName.value = editObj.movieName;
  movieImage.value = editObj.movieImage;
  movieDescription.value = editObj.movieDescription;
  movieRating.value = editObj.movieRating;
  addMovieBtn.classList.add("d-none");
  updateMovieBtn.classList.remove("d-none");
}

//update
function onMovieUpdateHandler() {
  const updateId = localStorage.getItem("updateId");
  localStorage.removeItem("updateId");
  const updatedObj = {
    movieName: movieName.value,
    movieImage: movieImage.value,
    movieDescription: movieDescription.value,
    movieRating: movieRating.value,
    id: updateId,
  };
  const updateIndex = moviesArr.findIndex((el) => el.id === updateId);
  moviesArr[updateIndex] = updatedObj;
  localStorage.setItem("moviesArr", JSON.stringify(moviesArr));
  //update ui
  createMovieCards(moviesArr);

  movieForm.reset();

  addMovieBtn.classList.remove("d-none");
  updateMovieBtn.classList.add("d-none");
  onModalToggle();
  snackBar(`Movie ${updatedObj.movieName} is updated successfully...`);
}


// DELETE

function onDeleteHandler(ele) {
  const deleteId = ele.closest(".movieCard").id;

  const isConfirm = confirm(
    `Are you sure you want to delete movie with id : ${deleteId}?`);

  if (isConfirm) {
    const deleteIndex = moviesArr.findIndex((movie) => movie.id === deleteId);
    moviesArr.splice(deleteIndex, 1);
    localStorage.setItem("moviesArr", JSON.stringify(moviesArr));
    // Refresh UI
    createMovieCards(moviesArr);
    snackBar(
      `Movie with id : ${deleteId} deleted successfully.`
    );
  }
}

//Cancel
function onCancelHandler() {
  movieForm.reset();
  addMovieBtn.classList.remove('d-none');
  updateMovieBtn.classList.add('d-none');
  localStorage.removeItem("updateId");
  movieModel.classList.remove('active');
  backDrop.classList.remove('active');
}

movieForm.addEventListener("submit", onMovieAdd);
updateMovieBtn.addEventListener("click", onMovieUpdateHandler);
showMovieBtn.addEventListener('click', onModalToggle);
cancelMovieBtn.addEventListener("click", onCancelHandler);
