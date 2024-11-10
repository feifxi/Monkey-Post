// Snackbar Message
function showSnackbarMsg(){
    const statusMsg = document.getElementById('snackbar-msg')
    if (statusMsg) {
        setTimeout(() => {
            statusMsg.classList.add('show');
            setTimeout(() => {
                statusMsg.classList.remove('show');
                setTimeout(() => {
                    statusMsg.style.display = 'none';;
                }, 400);
            }, 6000);
        }, 100);
    }
}
showSnackbarMsg()

// Edit Owner Profile - Set default profile URL
function setDefaultProfile(){
    const defaultProfile = 'https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg'
    document.getElementById('profile-update-url').value = defaultProfile;
}


// Edit Post - Auto resize of text area
function autoResize(textarea) {
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set height to scrollHeight
}

// Edit Post - Provide Post data to Edit Pop-up 
function editPost (postId) {
    //Set title & Button
    document.querySelector('.post-pop-up .pop-up-title h1').innerText = 'Edit Post' 
    document.querySelector('.post-pop-up button').innerText = 'Edit Post' 
    // Get Data
    const content = document.querySelector(`div[dataof="${postId}"]`).innerText
    const img = document.querySelector(`img[dataof="${postId}"]`).src
    // Set Data
    document.querySelector('.post-pop-up input[name="img"]').value = img;
    document.querySelector('.post-pop-up textarea[name="content"]').value = content;
    // Set Form Action
    document.querySelector('.post-pop-up-container form').action = `/updatePost/${postId}`
}


function createPost() {
    // Set title & Button
    document.querySelector('.post-pop-up .pop-up-title h1').innerText = 'Create Post' 
    document.querySelector('.post-pop-up button').innerText = 'Create Post'
    // Clear Input Field
    document.querySelector('.post-pop-up input[name="img"]').value = '';
    document.querySelector('.post-pop-up textarea[name="content"]').value = '';
    // Set Form Action
    document.querySelector('.post-pop-up-container form').action = '/createPost'
}

// Delete Post Confirm Dialogue
document.querySelectorAll('.post-delete-btn')
.forEach(e=>{e.addEventListener('submit',function(event){
    const userConfirmed = confirm('Are you sure you want to delete this post?');
    if (!userConfirmed) {
        event.preventDefault(); 
    }
})})