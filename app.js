const apiURL = 'https://acme-users-api-rev.herokuapp.com/api/users/search/';

const resultsDiv = document.querySelector('#results')
const userHTMLString = (user) => {
    let str = '<tr>';
    str += `<td><img src=${user.avatar}></td>`
    str += `<td>${user.firstName}</td>`;
    str += `<td>${user.lastName}</td>`;
    str += `<td>${user.email}</td>`;
    str += `<td>${user.title}</td>`;
    str += '</tr>';
    return str;
}
const renderUsers = users => {
    let html = '<table><thead><th></th><th>First Name</th><th>Last Name</th><th>Email</th><th>Title</th>';
    html += '<tbody>';
    users.forEach( (user) => { html += userHTMLString(user)});
    html += '</tbody>';
    resultsDiv.innerHTML = html;
}

const runSearch = async str => {
    const response = await fetch(`${apiURL}${str}`);
    const data = await response.json();
    renderUsers(data.users);
}

const acmeSearch = document.querySelector('#acme-search');
acmeSearch.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        location.hash = `#${acmeSearch.value}`
    }
})

window.addEventListener('hashchange', () => {
    let currentSearch = location.hash.split('#')[1];
    if (currentSearch) {
        runSearch(currentSearch);
    } else {
        resultsDiv.innerHTML = '';
    }
});

