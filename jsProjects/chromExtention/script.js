let myLeads = [] ;  // It have to be " " in templates
const deleteBtn = document.getElementById('delete-btn');
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl  = document.getElementById('ul-el');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
const tabBtn = document.getElementById('tab-btn');

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener('click',function(){  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        render(myLeads);
    })
})

function render(leads){
    let listItems = ' ';
    for(let i = 0; i < leads.length; i++ ){
        //listItems += "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>";
        // WE can use template string instead 
        listItems += 
            ` <li>
                <a href='${leads[i]}' target='_blank'>
                ${leads[i]} 
                </a>
            </li> `
        //ulEl.innerHTML += '<li>'+ myLeads[i] + '</li> '; // Another way to do that is in below
        // const li = document.createElement('li');
        // li.textContent = myLeads[i];
        // ulEl.append(li);
    }
    ulEl.innerHTML = listItems;
}
    
deleteBtn.addEventListener('dblclick',function(){
    localStorage.clear();
    myLeads=[]    
    render(myLeads)
})
//localStorage.setItem('myLeads', 'www.google.com'); // Set local storage with key and value both in string
//console.log(localStorage.getItem(myLeads));  we can see it by this
//localStorage.clear(); and now we can clear that
inputBtn.addEventListener('click', function(){
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem('myLeads',JSON.stringify(myLeads));
    render(myLeads)
    //console.log(localStorage.getItem('myLeads'));
})

