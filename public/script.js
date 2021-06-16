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
const submitBtnn = document.getElementById('submitBtnn');

// EVENT LISTENER to automatically fill up name
eleLevel.addEventListener('change', () => {
  const courseName = `${eleLearningPathway.value} ${eleLevel.value}`;
  console.log(courseName);
  eleName.setAttribute('value', courseName);
});

// Define the fields to appear in sessions section here
const sessionInputsArr = [
  {
    name: 'no',
    label: '#',
    type: 'number',
    size: '1',
    placeholder: '',
    class: 'form-control-plaintext',
  },
  {
    name: 'date',
    label: 'Date',
    type: 'date',
    size: '2',
    placeholder: '',
    class: 'form-control',
  },
  {
    name: 'startTime',
    label: 'Start',
    type: 'time',
    size: '2',
    placeholder: '',
    class: 'form-control',
  },
  {
    name: 'endTime',
    label: 'End',
    type: 'time',
    size: '2',
    placeholder: '',
    class: 'form-control',
  },
  {
    name: 'limit',
    label: 'Limit',
    type: 'number',
    size: '1',
    placeholder: 'limit',
    class: 'form-control',
  },
  {
    name: 'isChargeable',
    label: 'Chargeable?',
    type: 'checkbox',
    size: '1',
    placeholder: '',
    class: 'form-check-input',
  },
  {
    name: 'sessionType',
    label: 'Type',
    type: 'text',
    size: '2',
    placeholder: 'Foundation/Practice',
    class: 'form-control',
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

  // For submit button
  submitBtnn.classList.remove('d-none');
};

// EVENT LISTENER to handle addition of new session
newSessionBtn.addEventListener('click', () => {
  // show session if course state starts from 0
  if (courseState.sessions === 0) {
    showSessionHeader();
  }
  // increment state sessions by one
  courseState.sessions += 1;

  // create DOM for a new session's row
  const eleSessionRow = document.createElement('div');
  eleSessionRow.classList.add('row', 'my-1');
  // eleSessionRow.innerHTML = courseState.sessions;
  sessionsContainer.prepend(eleSessionRow);

  // append input fields to each session
  sessionInputsArr.forEach((item) => {
    const newInputCol = document.createElement('div');
    const newInputEle = document.createElement('input');

    newInputCol.classList.add(`col-md-${item.size}`);
    newInputEle.classList.add(`${item.class}`);

    newInputEle.setAttribute('type', `${item.type}`);
    newInputEle.setAttribute('name', `${item.name}`);
    newInputEle.setAttribute('placeholder', `${item.placeholder}`);

    if (item.label === 'Limit') {
      newInputEle.setAttribute('value', `${eleLimit.value}`);
    } else if (item.label === 'Chargeable?') {
      newInputEle.checked = true;
    } else if (item.label === '#') {
      newInputEle.setAttribute('value', `${courseState.sessions}`);
      newInputEle.readOnly = true;
    }

    newInputCol.appendChild(newInputEle);
    eleSessionRow.appendChild(newInputCol);
  });
});
