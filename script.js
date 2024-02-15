function getRandomMeal() {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];

            
            document.getElementById('menufood').src = meal.strMealThumb;
            document.getElementById('menufood').alt = meal.strMeal;

            displayIngredientsAndProcedure(meal);
        })
        .catch(error => {
            console.error('Error fetching random meal:', error);
        });
}

function displayIngredientsAndProcedure(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && measure) {
            ingredients.push(`${measure} ${ingredient}`);
        } else {
            break;
        }
    }

    // Display ingredients and procedure in the 'meal-details' div
    const mealDetailsContainer = document.getElementById('meal-details');
    mealDetailsContainer.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <h3>Procedure:</h3>
        <p>${meal.strInstructions}</p>
    `;
}
function searchAndDisplayMeals(mealName) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            displayMealGrid(meals);
        })
        .catch(error => {
            console.error('Error fetching meals:', error);
        });
}

// Get a random meal 
getRandomMeal();

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const searchInput = document.getElementById('search').value;
    if (searchInput.trim() !== '') {
        searchAndDisplayMeals(searchInput);
    }
});

function searchAndDisplayMeals(mealName) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;

            // to Clear previous grid
            document.getElementById('grid-container').innerHTML = '';
            document.getElementById('meal-details').innerHTML = '' ;

            //  to Display images in a 4x4 grid
            for (let i = 0; i < Math.min(16, meals.length); i++) {
                const meal = meals[i];
                const image = document.createElement('img');
                image.src = meal.strMealThumb;
                image.alt = meal.strMeal;
                image.className = 'meal-image';

                // It shows img details.
                image.addEventListener('click',function(){
                    displayModal(meal);
                });

                document.getElementById('grid-container').appendChild(image);
            }
        })
        .catch(error => {
            console.error('Error fetching meals:', error);
        });
}

function displayModal(meal) {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // Display details in the meal-detail contain
    const detailsContainer = document.getElementById('modal-meal-details');
    detailsContainer.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
        <h3>Ingredients</h3>
        <ul>
            ${getIngredientsList(meal)}
        </ul>
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    `;

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Show the modal
    modal.style.display = "block";
}

function getIngredientsList(meal) {
    // Creating a list of ingredients..
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && measure) {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break; 
        }
    }
    
    // returning ingredients.
    return ingredientsList;
}
document.getElementById('searchbtn').addEventListener('click', function() {
    document.getElementById('menufood').style.display = 'none';
});


