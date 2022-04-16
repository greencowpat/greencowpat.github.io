document.querySelector('button').addEventListener('click', getCocktail)

const drinkArray = [];

function getCocktail() {
    let drink = document.querySelector('input').value;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => {
    return res.json()
    })
    .then(data => {

        let canvas = document.querySelector('.canvas');
        drinkArray.length = 0;
        drinkArray.push(data.drinks)
        let generatedHtml = data.drinks.reduce((accum, currKey, currIndex) => accum + 
        `<div class="card" data-drink-id=${currKey.idDrink} data-index=${currIndex}>
            <div class="thumbnail"><img src="${currKey.strDrinkThumb}"></div>
            <div class="drink-name">${currKey.strDrink}</div>
            <div class="base">${currKey.strIngredient1}</div>
        </div>`,"")
        canvas.innerHTML = generatedHtml;
        console.log('success', data.drinks)
    })
    .catch(error => {
    console.log('failed:', error)
    })
};

// Popup modal after clicking on card
document.addEventListener('click', (e) => {
    if(e.target.closest('.card')) {
        let id = e.target.closest('.card');
        let chosenIndex = id.dataset.index;
        let selectedDrink = drinkArray[0][chosenIndex];
        document.querySelector('.modalName').textContent = selectedDrink.strDrink;
        document.querySelector('.modalImg img').src = selectedDrink.strDrinkThumb;
        document.querySelector('.modalIngredients')

    }
})
