document.querySelector('button').addEventListener('click', getCocktail)

const drinkArray = [];



function clearChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function getCocktail() {
    let drink = encodeURI(document.querySelector('input').value);

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

    // reset ingredient list from previous clicks
    const ingredientsList = document.querySelector('.ingredientList ul')
    

    if(e.target.closest('.card')) {
        clearChildNodes(ingredientsList);
        let id = e.target.closest('.card');
        let chosenIndex = id.dataset.index;
        let selectedDrink = drinkArray[0][chosenIndex];
        document.querySelector('.modalName').textContent = selectedDrink.strDrink;
        document.querySelector('.modalImg img').src = selectedDrink.strDrinkThumb;

        //ingredients list
        for (let i = 0; i < 15; i++) {
            if (selectedDrink[`strIngredient${i}`]) {
                let ul = document.querySelector('.ingredientList ul')
                let li = document.createElement('li');
                li.appendChild(document.createTextNode(selectedDrink[`strIngredient${i}`]))
                ul.appendChild(li)
            }
        }
        document.querySelector('.modalInstructions').textContent = selectedDrink.strInstructions;

        let myModal = document.querySelector('.mymodal');
        myModal.classList.toggle('hidden');
    }
})

// close button
document.querySelector('.close').addEventListener('click', () => {
    let myModal = document.querySelector('.mymodal');
    myModal.classList.toggle('hidden')
})