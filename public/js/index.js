// Snackbar Message
const showSnackbarMsg = async () => {
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
const setDefaultProfile = () => {
    const defaultProfile = 'https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg'
    document.getElementById('profile-update-url').value = defaultProfile;
}
const defaultProfBtn = document.getElementById('setdefault-profile-btn')  
if (defaultProfBtn) defaultProfBtn.addEventListener('click',setDefaultProfile);

// Edit Post - Auto resize of text area
function autoResize(textarea) {
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set height to scrollHeight
}
const textarea = document.querySelector('.post-pop-up textarea[name="content"]');
if (textarea) textarea.addEventListener('input',()=>{autoResize(textarea)});


// Edit Post - Provide Post data to Edit Pop-up 
const editPost = (postId,index) => {
    // Set title & Button
    document.querySelector('.post-pop-up .pop-up-title h1').innerText = 'Edit Post' 
    document.querySelector('.post-pop-up button').innerText = 'Edit Post' 
    // Get Data
    const content = document.querySelector(`div[dataof="${index}"]`).innerText
    const img = document.querySelector(`img[dataof="${index}"]`).src
    // Set Data
    document.querySelector('.post-pop-up input[name="img"]').value = img;
    document.querySelector('.post-pop-up textarea[name="content"]').value = content;
    // Set Form Action
    document.querySelector('.post-pop-up-container form').action = `/updatePost/${postId}`
}
document.querySelectorAll('.post-update-btn').forEach((e,i)=>{
    e.addEventListener('click',()=>{editPost(e.getAttribute('dataof'), i)})
});


const createPost = () => {
    // Set title & Button
    document.querySelector('.post-pop-up .pop-up-title h1').innerText = 'Create Post' 
    document.querySelector('.post-pop-up button').innerText = 'Create Post'
    // Clear Input Field
    document.querySelector('.post-pop-up input[name="img"]').value = '';
    document.querySelector('.post-pop-up textarea[name="content"]').value = '';
    // Set Form Action
    document.querySelector('.post-pop-up-container form').action = '/createPost'
}
const createPostBtn = document.querySelector('nav .create-post-btn');
if (createPostBtn) createPostBtn.addEventListener('click',createPost);

// Delete Post Confirm Dialogue
document.querySelectorAll('.post-delete-btn')
.forEach(e=>{e.addEventListener('submit',function(event){
    const userConfirmed = confirm('Are you sure you want to delete this post?');
    if (!userConfirmed) {
        event.preventDefault(); 
    }
})})