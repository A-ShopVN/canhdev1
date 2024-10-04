'use strict'

// element toggle funtion

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar varibles

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle funcationality for mobile 

sidebar.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

// add click event to all modal items

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {

        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

        testimonialsModalFunc();
    });
}

// add click event to modal close button

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


// custom select variables

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });


// add Event in all select

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}


// filter variables

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    }
    else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    }
    else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerHTML = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact for variables

const form = document.querySelector("[data-form]");
const formInput = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");


// add event to all form input field

for (let i = 0; i < formInput.length; i++) {
  formInput[i].addEventListener("input", function () {

    if (form.checkVisibility()) {
      formBtn.removeAttribute("disabled");
    }

    else {
       formBtn.setAttribute("disabled", "")
    }
  });
}


// page navigation variables 

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link

for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
  
      for (let i = 0; i < pages.length; i++) {
        if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
          pages[i].classList.add("active");
          navigationLinks[i].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[i].classList.remove("active");
          navigationLinks[i].classList.remove("active");
        }
      }
  
    });
  }


  const postButton = document.getElementById('post-button');
    const postContent = document.getElementById('post-content');
    const postsContainer = document.getElementById('posts-container');
    const languageSelect = document.getElementById('language-select');

    postContent.addEventListener('input', () => {
        postButton.disabled = !postContent.value.trim();
    });

    window.onload = function() {
        displaySavedPosts();
    }

    function createPost() {
        const content = postContent.value.trim();
        const currentDate = new Date().toLocaleString();
        const author = "Dang Canh"; // Tên tác giả cố định cho ví dụ

        savePost(content, currentDate, author);
        displayPost(content, currentDate, author);

        postContent.value = '';
        postButton.disabled = true;
    }

    function displayPost(content, date, author, index = null) {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        
        const headerElement = `
            <div class="post-header">
                <div class="profile-pic"  onclick="window.open('https://www.facebook.com/profile.php?id=100056273888886')" ><img src="avt.jpg" alt="" class="profile-pic"></div>
                <div>
                    <strong class="strong">Đặng Cảnh</strong>
                    <div class="post-date">${date}</div>
                </div>
            </div>
        `;
        
        const contentElement = `<p class="post-content">${content}</p>`;
        const authorNote = `<p class="author-note"> --${author}--</p>`;
        const speakButton = `<button class="speak-button" onclick="speak('${content}')">🔊</button>`;
        
        // Tạo nút xóa
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'x';
        deleteButton.onclick = function() {
            deletePost(index);
        };
    
        postElement.innerHTML = headerElement + contentElement + authorNote + `<div class="post-footer">${speakButton}</div>`;
        postElement.appendChild(deleteButton); // Thêm nút xóa vào bài đăng
    
        postsContainer.insertBefore(postElement, postsContainer.firstChild);
    }
    

    function savePost(content, date, author) {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        savedPosts.push({ content, date, author });
        localStorage.setItem('posts', JSON.stringify(savedPosts));
    }

    function displaySavedPosts() {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        savedPosts.forEach((post, index) => {
            displayPost(post.content, post.date, post.author, index);
        });
    }

    function deletePost(index) {
        let savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        savedPosts.splice(index, 1); // Xóa bài đăng tại vị trí index
        localStorage.setItem('posts', JSON.stringify(savedPosts));
        refreshPosts();
    }

    function refreshPosts() {
        postsContainer.innerHTML = ''; // Xóa hết nội dung hiện tại
        displaySavedPosts(); // Hiển thị lại các bài đã lưu
    }

    function speak(content) {
        const selectedLanguage = languageSelect.value;
        const utterance = new SpeechSynthesisUtterance(content);
        utterance.lang = selectedLanguage;
        window.speechSynthesis.speak(utterance);
    }



    // toast//
    document.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault(); // Ngăn không cho form gửi đi
  
      var toast = document.getElementById('toast');
      toast.className = 'toast show'; // Hiển thị toast
      
      // Xóa nội dung của các trường form
      const inputs = document.querySelectorAll('[data-form-input]');
      inputs.forEach(input => {
          input.value = ''; // Xóa nội dung
      });
  
      // Vô hiệu hóa nút "Send Message" lại sau khi xóa dữ liệu
      document.getElementById('form-btn').disabled = true;
  
      // Ẩn toast sau 3 giây
      setTimeout(function() {
          toast.className = toast.className.replace('show', '');
      }, 3000);
  });



  
  let alerts = document.querySelectorAll('.alert');
  alerts.forEach(item=>{
      item.addEventListener('click', function(event){
          if(event.target.classList.contains('close')){
              item.style.display = 'none';
          }
      });
  });
  window.addEventListener('offline', function(){
    document.getElementById('success').style.display = 'none';
    document.getElementById('error').style.display = 'grid';
});
window.addEventListener('online', function(){
  document.getElementById('error').style.display = 'none';
  document.getElementById('success').style.display ='grid';
});
