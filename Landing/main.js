import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyA2zbZDoExL62KLbtNXBBQr3GmkzW2aCCo",
    authDomain: "codezee-app.firebaseapp.com",
    databaseURL: "https://codezee-app-default-rtdb.firebaseio.com",
    projectId: "codezee-app",
    storageBucket: "codezee-app.appspot.com",
    messagingSenderId: "437607656931",
    appId: "1:437607656931:web:e0370346d494d6108584d6"
  };
  

const app = initializeApp(firebaseConfig);
const fdb = getFirestore(app);
const blogBut = document.querySelector('.blog-button');
const logOutBut = document.querySelector('.logout-button');
const qnaDataContainer = document.getElementById('qnaData');
const isUser = JSON.parse(localStorage.getItem("userData"));

if (!isUser) window.location.replace("/index.html");


const renderBlogs = async () => {
    qnaDataContainer.innerHTML = "";


    const q = query(collection(fdb, "blogs"));

    const querySnapshot = await getDocs(q);
    const blogs = []
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        blogs.push(data);
    });

    if(!blogs.length){
        const div = document.createElement("div");
        div.innerHTML = `<p style="color:black;">No Blogs Found</p>`;
        qnaDataContainer.appendChild(div);
        return;
    }

    blogs.reverse().forEach(data => {
        const div = document.createElement("div");
        div.setAttribute(
            "class",
            "question"
        );
        div.addEventListener('click', () => questionSection(data));

        div.innerHTML = `<div class="info-Data">

          <div class="heading">
              <h1>${data.title}</h1>
          </div>
  
          <div class="description">
              <p>${data.description}</p>
          </div>
  
          <div class="admin-info">
              <span class="admin-Name"><i class="fa-solid fa-user"></i> ${data?.username}</span>
              <span class="issue-Date">${data?.date}</span>
          </div>
  
      </div>
  
      <div class="image-Section-1">
      </div>`


        qnaDataContainer.appendChild(div);
    })



}

renderBlogs()

const blogSection = () => {

    window.location.href = "blog.html";

}


const logOutSection = () => {

    localStorage.removeItem("userData");
    window.location.href = "index.html";

}

const questionSection = (e) => {
    localStorage.setItem("blog",JSON.stringify(e))
    window.location.href = "questionPage.html";

}

logOutBut.addEventListener('click', logOutSection);
blogBut.addEventListener('click', blogSection);