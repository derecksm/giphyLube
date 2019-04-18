//variable to swtich between animated and stil gif & to place my new gifs
let animalList = []
let toggle = false

// lets you grab data value of selected buttons on HTML
document.addEventListener('click', event => {
    if (event.target.className === 'gifImages') {
        let { animal } = event.target.dataset

        fetch(`https://api.giphy.com/v1/gifs/search?&api_key=dc6zaTOxFJmzC&q=${animal}&limit=10&rating=pg`
        )
            // This is pulling the path to the URL and adding it to our HTML
            .then(r => r.json())
            .then(({ data }) => {
                   for (let i = 0; i < data.length; i++) {
                    let animated = data[i].images.fixed_height.url
                    let still = data[i].images.fixed_height_still.url
                    let temp = document.createElement('img')
                    temp.setAttribute('id','gifImg')
                    temp.setAttribute('src',still)
                    temp.setAttribute('alt',animal)
                    temp.setAttribute('data-still',still)
                    temp.setAttribute('data-animated',animated)
                    temp.setAttribute('data-state', 'still')
                    document.querySelector('#gifDiv').append(temp) 
                }
            })
            .catch(event => console.error)
            document.querySelector('#gifDiv').innerHTML = ''
        //this allows me to play and pause the gif 
    } else if (event.target.id === 'gifImg') {
        let { animated, still, state } = event.target.dataset
        if (state === 'still') {
            event.target.setAttribute('src', animated)
            event.target.setAttribute('data-state', 'animated')
    } else {
        event.target.setAttribute('src', still)
            event.target.setAttribute('data-state', 'still')
    }
        // toggle = !toggle
        // event.target.setAttribute('src', toggle ? animated : still)
    }
})

// this is displaying what is being entered into the search box
function renderAnimals() {
    let autoAnimal = document.querySelector('#addAnimal').value

    document.querySelector('#aniList').innerHTML = ''
    animalList.forEach(item => {
        let aniElem = document.createElement('button')
        aniElem.setAttribute('class', 'gifImages')
        aniElem.setAttribute('data-animal', autoAnimal)
        aniElem.textContent = item
        document.querySelector('#aniList').append(aniElem)
    })
}

//this is pulling the value being entered the search box
document.querySelector('#sbmtAnimal').addEventListener('click', e => {
    e.preventDefault()
    animalList.push(document.querySelector('#addAnimal').value)
    document.querySelector('#addAnimal').value
    renderAnimals()
    document.querySelector('#addAnimal').value = ''

})
renderAnimals()