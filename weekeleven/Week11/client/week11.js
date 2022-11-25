import Auth from './auth.js';
import {makeRequest} from './authHelpers.js';

const auth = new Auth;
const loginForm = document.getElementById('login');

// makeRequest('login', 'POST', {
//     password: 'user1',
//     email: 'user1@email.com'
// });

loginForm.querySelector('button').addEventListener('click', () => {
    auth.login(getPosts);
});

async function getPosts() {
    try {
        const data = await makeRequest('posts', 'GET', null, auth.token);
        document.getElementById('content').classList.remove('hidden');
        console.log(data);
        let ul = document.getElementById('list');
        ul.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            let li = document.createElement('li');
            li.appendChild(document.createTextNode(data[i].title));
            ul.appendChild(li);
        }
    } catch (error) {
        console.log(error)
    }
}