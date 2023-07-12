// ===================================================socket.io==================================================
// make connect to server
var socket = io.connect('https://minhhoang.info/chat')

// cookies null
socket.on('undefined-cookie', () => {
    alert('Fail to get session!');
    location.reload();
})

// test bug
socket.on('test', (msg) => {
    console.log(msg);
})

// ===================================================Personal===================================================
const navLinks = document.querySelectorAll('.nav-item a');
const sections = document.querySelectorAll('section');
const personalInfo = document.querySelector('#personal-info');
const personalProject = document.querySelector('#personal-projects');
const chatBox = document.querySelector('#chat-box');
const api = document.querySelector('#API');
var chatTargetId;

// Lấy endpoint từ URL
function set_section_endpoint(){
    const url = window.location.href.split('/');
    const endpoint = url[url.length - 1];
    
    if (url[url.length-1] === '')
        return
    
    // Tìm section tương ứng với endpoint và thêm lớp 'active'
    sections.forEach(section => {
        if (`#${section.id}` === endpoint) {
            section.classList.add('active');
            section.style.display = 'flex';
        } else {
            section.classList.remove('active');
            section.style.display = 'none';
        }
    });
    
    // Tìm liên kết nav tương ứng với endpoint và thêm lớp 'active'
    navLinks.forEach(link => {
        if (link.getAttribute('href') === endpoint) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
set_section_endpoint();

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        // remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        // add active class to clicked nav link
        e.target.classList.add('active');
        // hide all sections
        sections.forEach(section => section.classList.remove('active'));
        // show the clicked section
        document.querySelector(href).classList.add('active');
        // hide personal info when navigating to personal projects
        if (href === "#personal-info") {
            personalInfo.style.display = 'flex';
        } 
        else {
            personalInfo.style.display = 'none';
        }
        if (href === "#personal-projects") {
            personalProject.style.display = 'block';
        } 
        else {
            personalProject.style.display = 'none';
        }
        if (href === "#chat-box") {
            chatBox.style.display = 'flex';
            // select user
            var chatListItems = document.querySelectorAll('.chat-tab');
            
            // remove last active
            chatListItems.forEach(Item => Item.classList.remove('chat-active'));
            
            // auto select first user
            chatListItems[0].classList.add('chat-active');
            document.querySelector('#chat-target h2').innerHTML = chatListItems[0].children[1].children[0].textContent;
            document.querySelector('#chat-target img').src = chatListItems[0].children[0].src;
            
            // remove last message
            document.querySelectorAll(".message ").forEach(chatItm => chatItm.remove())
            
            // set target
            chatTargetId = chatListItems[0].getAttribute('href');
        } 
        else {
            chatBox.style.display = 'none';
        }
        if (href === "#API") {
            api.style.display = 'block';
        } 
        else {
            api.style.display = 'none';
        }
    });
});

const socialButtons = document.querySelectorAll('.social-button');

socialButtons.forEach(button => {
  const iconText = button.querySelector('i').textContent;
  if (iconText.length == 0){
    button.style.width = '50px';
  }
  else{
    const textWidth = iconText.length * 10;
    button.style.width = textWidth + 50 + 'px';
  }
});

// ===================================================Project===================================================

// api get list project -- do late
// const personalProjectsData = [
//   {
//     project_type: 'java',
//     project_items: 
//       [{
//         project_id: '2',
//         title: 'Project 1',
//         description: 'Description of Project 1',
//         image: 'https://placehold.it/150x150',
//         link1: 'https://example.com/project1',
//         link2: 'https://example.com/project1'
//       },
//       {
//         project_id: '3',
//         title: 'Project 2',
//         description: 'Description of Project 2',
//         image: 'https://placehold.it/150x150',
//         link1: 'https://example.com/project1',
//         link2: 'https://example.com/project1'
//       }],
//     },
//   {
//     project_type: 'python',
//     project_items: 
//     [{
//       project_id: '1',
//       title: 'Project 1',
//       description: 'Description of Project 2',
//       image: 'https://placehold.it/150x150',
//       link1: 'https://example.com/project1',
//       link2: 'https://example.com/project1'
//     }],
//   }
//   // Add more projects as needed
// ];

// function createProjectItemsHTML(projectData) {
//   return `
//     <li class="project-item">
//       <div class="project-title">
//         <span class="title-text"><a href="${projectData.link1}" target="_blank">${projectData.title}</a></span>
//       </div>
//       <div class="project-details">
//         <img class="project-image" src="${projectData.image}">
//         <div class="project-description">
//           <p>${projectData.description}</p>
//           <a class="see-more" href="${projectData.link2}">See More</a>
//         </div>
//       </div>
//     </li>
//   `;
// }

// function createProject(projectData) {
//   var projects = Object.values(projectData.project_items).map(createProjectItemsHTML).join('');
//   return `
//     <h1>${projectData.project_type}</h1>
//     <ul class="project-menu">
//       ${projects}
//     </ul>
//   `;
// }

// const personalProjectsList = document.querySelector('#personal-projects');
// const projectItemsHTML = personalProjectsData.map(createProject).join('');
// personalProjectsList.innerHTML += projectItemsHTML;

// ===================================================Chat box============================
// ==========================Chat list==========================
// show your name
const name = document.querySelector("#chat-list-tittle");
name.innerHTML = `<h2>User: ${document.cookie.split('=')[1]}</h2>`;

// Add event click on container chat list
var chatListItems = document.querySelector('#chat-list-items');
chatListItems.addEventListener('click', event => {
    const clickedElement = event.target;
    const chatListItems = document.querySelector('#chat-list');
    
    // Kiểm tra xem thẻ chat item nào được click
    if (clickedElement.classList.contains('chat-tab')) {
        event.preventDefault();
    
        if (clickedElement.classList.contains('chat-active')) {
            return;
        }
        
        // remove active class
        const activeChatItem = chatListItems.querySelector('.chat-active');
        if (activeChatItem) {
            activeChatItem.classList.remove('chat-active');
        }
    
        // add active class to clicked chat item
        clickedElement.classList.add('chat-active');
    
        // show target user
        const chatTarget = document.querySelector('#chat-target');
        chatTarget.querySelector('h2').innerHTML = clickedElement.children[1].children[0].textContent;
        chatTarget.querySelector('img').src = clickedElement.children[0].src;
        
        // remove last message
        document.querySelectorAll(".message ").forEach(chatItm => chatItm.remove())
        
        // set chat target ID
        chatTargetId = clickedElement.getAttribute('href');
        
        // get message list 
        if (chatTargetId !== 'SimSimi'){
           let userid = document.cookie.split("=")[1];
        
            socket.emit('client-get-messageList', {user: userid, target: chatTargetId}) 
        }
    }
});

// catch message list from targetId
// catch message list from targetId
socket.on('server_send_messageList', (messageList) => {
    let userid = document.cookie.split("=")[1];
    messageList.forEach((message) => {
        if (message.sender_name === userid) {
            send_message(message.content);
        } else if (message.sender_name === chatTargetId) {
            recieve_message(message.content);
        }
    });
});

// catch online users list
socket.on('server-send-onlineUsers', (chatList) => {
    let chatListJSON = JSON.parse(chatList);
    // find user in chat list
    let currentUserChat = chatListJSON[chatListJSON.length-1].chatList.find(chatItem => chatItem.name === document.cookie.split("=")[1]);
    // is connection
    if (currentUserChat){
        // user is connect
        chatlist(chatListJSON);
    }
    else {
        // reconnect
        socket = io.connect('https://minhhoang.info/chat')
    }
})

// show short massage
socket.on('server-send-usersShortMessage', (shortMessage) => {
    let shortMessageJSON = JSON.parse(shortMessage);
    // show short massage
    shortMessageJSON.forEach((shortMessage) => {
        document.querySelectorAll(".chat-tab").forEach((chat) => {
            if (chat.classList[1] === shortMessage.recipient_name || chat.classList[1] === shortMessage.sender_name) {
                chat.querySelector('.chat-tab-info span').textContent = shortMessage.content;
                chat.querySelector('.chat-tab-info #time').textContent = shortMessage.time;
            }
        })
    })
    
    sortChatList();
})

function chatlist(chatListJson) {
    //
    function createChatListItems(chatListData) {
        if (!document.cookie.includes(chatListData.name)){
            return `
                <a class="chat-tab ${chatListData.name} ${(chatListData.name === chatTargetId)?"chat-active":""}" href="${chatListData.name}">
                    <img src="${chatListData.image}" alt="avatar">
                    <div class="chat-tab-info">
                        <h3>${chatListData.name}</h3>
                        <span>${chatListData.des}</span>
                        <span id="time" hidden></span>
                    </div>
                </a>
            `;
        }
        // return this user
        else {
            return `
                <a class="chat-tab ${chatListData.name}" href="${chatListData.name}" style="display: none">
                    <img src="${chatListData.image}" alt="avatar">
                    <div class="chat-tab-info">
                        <h3>${chatListData.name}</h3>
                        <span>${chatListData.des}</span>
                        <span id="time" hidden></span>
                    </div>
                </a>
            `;
        }
    }
    
    //
    function createChatList(chatListData) {
      var chatList = chatListData.chatList.map(createChatListItems).join('');
      return `
        <h3>${chatListData.type}</h3>
        ${chatList}
      `;
    }
    
    // create chat list - html
    const chatList = document.querySelector('#chat-list-items');
    const chatListItemsHTML = chatListJson.map(createChatList).join('');
    chatList.innerHTML = chatListItemsHTML;
}

function sortChatList() {
    let userHeading = null;

    document.querySelectorAll("#chat-list-items h3").forEach(heading => {
        if (heading.textContent === "user") {
            userHeading = heading;
        }
    });
    
    if (userHeading) {
        let chatTabs = Array.from(document.querySelectorAll(".chat-tab"));
        let filteredChatTabs = chatTabs.filter(chatTab => chatTab.querySelector("#time").textContent !== "");
        let sortedChatTabs = filteredChatTabs.sort((a, b) => {
            let timeA = a.querySelector("#time").textContent;
            let timeB = b.querySelector("#time").textContent;
            return new Date(timeB) - new Date(timeA);
        });
        let reversedChatTabs = sortedChatTabs.reverse();
        
        reversedChatTabs.forEach(chatTab => {
            chatListItems.insertBefore(chatTab, userHeading.nextSibling);
        });
    }
}

// ==========================Chat Form==========================
// remove duplicate avatar
function removeDuplicateAvatar() {
    var chatMessages = document.querySelector('#chat-messages');
    for (let i = 0; i < chatMessages.childNodes.length-1; i++) {
        if (typeof chatMessages.childNodes[i].className === 'undefined')
            continue
        if (chatMessages.childNodes[i].className == chatMessages.childNodes[i+1].className){
            chatMessages.childNodes[i].querySelector('.ico').style.visibility = 'hidden'
        }
    }
}

// send message
const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');
const chatMessages = document.querySelector('#chat-messages');

var userTarget = null;
// writing
chatInput.addEventListener('focusin', () => {
    console.log("đang viết")
    socket.emit("client-send-writing", userTarget)
})

// end write
chatInput.addEventListener('focusout', () => {
    socket.emit("client-send-endWrite", userTarget)
})

// reciver function
function recieve_message(message){
    // create class container message
    const serverMessageEl = document.createElement('div');
    const serverMessageText = document.createElement('div');
    const serverMessageImagesIco = document.createElement('img');
    
    serverMessageEl.classList.add('message', 'received');
    serverMessageText.classList.add('text');
    serverMessageImagesIco.classList.add('ico');
    
    // get current user chat
    var currentTargetUser = document.querySelector(`[class="chat-tab ${chatTargetId} chat-active"]`).childNodes;
    
    // insert message received
    
    serverMessageText.textContent = message;
    serverMessageImagesIco.src = currentTargetUser[1].src;
    serverMessageEl.appendChild(serverMessageImagesIco);
    serverMessageEl.appendChild(serverMessageText);
    
    chatMessages.appendChild(serverMessageEl);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    removeDuplicateAvatar();
}

// send function
function send_message(message){
    const messageEl = document.createElement('div');
    const messageText = document.createElement('div');
    const messageImagesIco = document.createElement('img');
    
    messageEl.classList.add('message', 'send');
    
    messageText.classList.add('text');
    messageImagesIco.classList.add('ico');
    
    // user send
    var userid = document.cookie.split("=")[1];
    var currentTargetUser = document.querySelector(`[class="chat-tab ${userid}"]`).childNodes;
    
    messageText.textContent = message;
    messageImagesIco.src = currentTargetUser[1].src;
    messageEl.appendChild(messageText);
    messageEl.appendChild(messageImagesIco);
    
    chatMessages.appendChild(messageEl);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    chatInput.value = '';
    removeDuplicateAvatar();
}

// catch reciever from server
socket.on('server-send-message', (data) => {
    var messageData = JSON.parse(data);
    if (messageData.sender === chatTargetId) {
        recieve_message(messageData.content);
    }
})

// send message to server
chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = chatInput.value.trim();
    
    if (message !== '') {
        send_message(message);
        
        // send message
        let userid = document.cookie.split("=")[1];
        
        socket.emit('client-send-message', {sendId: userid, receiverId: chatTargetId, message: message});
    }
});

// ===================================================api list============================

var headers = document.getElementsByClassName("api-header");
    for (var i = 0; i < headers.length; i++) {
      headers[i].addEventListener("click", function() {
        var content = this.nextElementSibling;
        if (content.style.display === "none") {
          content.style.display = "block";
        } else {
          content.style.display = "none";
        }
      });
    }