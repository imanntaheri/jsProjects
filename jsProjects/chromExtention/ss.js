let myLeads = [];
const deleteBtn = document.getElementById('delete-btn');
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
const tabBtn = document.getElementById('tab-btn');

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

const tabs = [
  { URL: 'https://www.youtube.com/watch?v=jS4aFq5-91M' }
];

tabBtn.addEventListener('click', function () {
  myLeads.push(tabs[0].URL);
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render(myLeads);
});

function render(leads) {
  let listItems = '';
  for (let i = 0; i < leads.length; i++) {
    //listItems += "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>";
    // WE can use template string instead
    listItems += `
            <li>
                <a href='${leads[i]}' target='_blank'>
                ${leads[i]}
                </a>
            </li> `;
    //ulEl.innerHTML += '<li>'+ myLeads[i] + '</li> '; // Another way to do that is in below
    // const li = document.createElement('li');
    // li.textContent = myLeads[i];
    // ulEl.append(li);
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener('dblclick', function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener('click', function () {
  myLeads.push(inputEl.value);
  inputEl.value = '';
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render(myLeads);
  //console.log(localStorage.getItem('myLeads'));
});
