// import axios from 'axios';

console.log('banana');
const courseState = {
  sessions: 0,
};

// Identify existing form elements
const eleLearningPathway = document.getElementById('learningPathway');
const eleLevel = document.getElementById('level');
const eleName = document.getElementById('name');
const eleLocation = document.getElementById('location');
const eleLimit = document.getElementById('limit');
const sessionsHeaderContainer = document.getElementById('sessionsHeaderContainer');
const sessionsContainer = document.getElementById('sessionsContainer');
const newSessionBtn = document.getElementById('newSessionBtn');

// EVENT LISTENER to handle change of learning pathway
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

// EVENT LISTENER to automatically fill up name
eleLevel.addEventListener('change', () => {
  const courseName = `${eleLearningPathway.value} ${eleLevel.value}`;
  console.log(courseName);
  eleName.setAttribute('value', courseName);
});

// Define the fields to appear in sessions section here
const sessionInputsArr = [
  {
    name: 'date',
    label: 'Date',
    type: 'date',
    size: '2',
    placeholder: '',
    class: 'form-control',
    value: '',
  },
  {
    name: 'startTime',
    label: 'Start',
    type: 'time',
    size: '2',
    placeholder: '',
    class: 'form-control',
    value: '',
  },
  {
    name: 'endTime',
    label: 'End',
    type: 'time',
    size: '2',
    placeholder: '',
    class: 'form-control',
    value: '',
  },
  {
    name: 'limit',
    label: 'Limit',
    type: 'number',
    size: '1',
    placeholder: 'limit',
    class: 'form-control',
    value: '',
  },
  {
    name: 'isChargeable',
    label: 'Chargeable?',
    type: 'checkbox',
    size: '1',
    placeholder: '',
    class: 'form-check-input',
    value: '',
  },
  {
    name: 'sessionType',
    label: 'Type',
    type: 'text',
    size: '2',
    placeholder: 'Foundation/Practice',
    class: 'form-control',
    value: '',
  },
];

// Function to display "Sessions" and each session field title
const showSessionHeader = () => {
  const sessionHeader = document.createElement('h3');
  sessionHeader.innerHTML = 'Sessions';
  sessionsHeaderContainer.appendChild(sessionHeader);

  const columnTitles = document.createElement('div');
  columnTitles.classList.add('row');
  sessionInputsArr.forEach((item) => {
    const columnTitleEle = document.createElement('div');
    columnTitleEle.classList.add(`col-md-${item.size}`);
    columnTitleEle.innerHTML = item.label;
    columnTitles.appendChild(columnTitleEle);
  });
  sessionsHeaderContainer.appendChild(columnTitles);
};

// EVENT LISTENER to handle addition of new session
newSessionBtn.addEventListener('click', () => {
  console.log('lol');
  console.log(eleLimit.value);
  if (courseState.sessions === 0) {
    showSessionHeader();
  }
  courseState.sessions += 1;
  const eleSessionRow = document.createElement('div');
  eleSessionRow.classList.add('row', 'my-1');
  eleSessionRow.innerHTML = courseState.sessions;
  sessionsContainer.prepend(eleSessionRow);

  sessionInputsArr.forEach((item) => {
    const newInputCol = document.createElement('div');
    const newInputEle = document.createElement('input');
    newInputCol.classList.add(`col-md-${item.size}`, 'justify-content-center');
    newInputEle.classList.add(`${item.class}`);
    newInputEle.setAttribute('type', `${item.type}`);
    newInputEle.setAttribute('name', `${item.name}`);
    newInputEle.setAttribute('placeholder', `${item.placeholder}`);
    newInputEle.setAttribute('value', `${item.value}`);
    newInputCol.appendChild(newInputEle);
    eleSessionRow.appendChild(newInputCol);
  });
  // date
  // start time
  // end time
  // limit
  // isChargeable
  // sessionType
});
