console.log('banana');

const eleLearningPathway = document.getElementById('learningPathway');
const eleLevel = document.getElementById('level');
const eleLocation = document.getElementById('location');
const eleLimit = document.getElementById('limit');
const sessionsContainer = document.getElementById('sessionsContainer');

const btnTest = document.createElement('button');
btnTest.classList.add('btn', 'btn-primary');
btnTest.innerHTML = 'click me';
btnTest.addEventListener('click', () => {
  console.log(eleLearningPathway.value);
});
sessionsContainer.appendChild(btnTest);
