// import axios from 'axios';

console.log('banana');

// Identify existing form elements
const eleLearningPathway = document.getElementById('learningPathway');
const eleLevel = document.getElementById('level');
const eleLocation = document.getElementById('location');
const eleLimit = document.getElementById('limit');
const sessionsContainer = document.getElementById('sessionsContainer');
const newSessionBtn = document.getElementById('newSessionBtn');

// Handle change of learningPathway select tag
eleLearningPathway.addEventListener('change', () => {
  // make axios request here
  // axios
  //   .get('/coursetypes/levels')
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // For each level queries, add to eleLocation
  console.log(eleLearningPathway.value);
});

newSessionBtn.addEventListener('click', () => {
  console.log('lol');
});
