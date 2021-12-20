const complimentButton =document.getElementById("complimentButton")
const fortuneButton = document.getElementById('fortuneButton')
const goalInput = document.getElementById('goalInput')
const goalList = document.getElementById('goalsList')
const newCompliment = () => {
    axios.get("http://localhost:4004/api/compliment/")
    .then(function (response) {
        const data = response.data;
        alert(response.data);
    });
};

const newFortune = () => {
    axios.get('http://localhost:4004/api/fortune/')
    .then((res) => {
        alert(res.data)
    })
}

const addGoal = (body) => {
    axios.post('http://localhost:4004/api/goals/', body)
    .then(goalsCallback)  
}

const goalsCallback = ({data:goals}) => renderGoals(goals)

const deleteGoal = (id) => {
    axios.delete(`http://localhost:4004/api/goals/${id}`)
    .then(goalsCallback)
}



const createGoal = (goalObj) => {
    let newGoalContainer = document.createElement('div')
    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'DELETE'
    
    let newGoal = document.createElement('h2')
    newGoal.textContent = goalObj.goal
    let id = goalObj.id
    deleteButton.setAttribute('onclick', `deleteGoal(${id})`)


    newGoalContainer.appendChild(newGoal)
    newGoalContainer.appendChild(deleteButton)
    goalList.appendChild(newGoalContainer)








}

const renderGoals = (goalDB) => {
    goalsList.innerHTML = ''
    for (let i=0; i < goalDB.length; i++){
        createGoal(goalDB[i])

    }
}



function inputSubmitHandler (event){
    event.preventDefault()
    const inputField = document.getElementById('textField')
    let goalObj = {
        goal: inputField.value
    }
    addGoal(goalObj)
    inputField.value = ''
}


goalInput.addEventListener('submit', inputSubmitHandler)
fortuneButton.addEventListener('click', newFortune)
complimentButton.addEventListener('click', newCompliment)