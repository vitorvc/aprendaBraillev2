function login(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)

        .then((result) => {
            window.location.href = "./form.html";
            const user = result.user;
        })
        .catch((error) => {
            console.error(error.message);
        });
};
function login2(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            window.location.href = "./SistemaBraille/sistemaBraille.html";
            const user = result.user;
        })
        .catch((error) => {
            console.error(error.message);
        });
}

function logout(){
    firebase.auth().signOut()
        .then(() => {
            alert('Usuário fez logout com sucesso!');
           
            window.location.href = "../index.html";
        })
        .catch((error) => {
            console.error(error.message);
        });
};

const userDiv = document.getElementById('user-div');
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userDiv.style.display = 'block';
        userDiv.querySelector('h4').textContent = ` ${user.email}`;
    } else {
      //if (!window.location.pathname.includes("index.html")) {
       //    window.location.replace("../index.html");
        }
    }
});

