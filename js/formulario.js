const db = firebase.firestore();

const form = document.getElementById('form');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = form['email'].value;
    const genero = form['genero'].value;
    const idade = form['idade'].value;
    const formacao = form['formacao'].value;
    const nacionalidade = form['nacionalidade'].value;
    const eprofessor = form['eprofessor'].value;
    const atuacao = form['atuacao'].value;
    const braille = form['braille'].value;

    db.collection(firebase.auth().currentUser.email).doc('Formulário').set({
        email: email,
        genero: genero,
        idade: idade,
        formacao: formacao,
        nacionalidade: nacionalidade,
        eprofessor: eprofessor,
        atuacao: atuacao,
        braille: braille
    })
    .then(() => {
        alert('Formulário enviado com sucesso!');
        window.location.href = "./menu.html";
        form.reset();
    })
    .catch(error => {
        console.error('Erro ao enviar formulário: ', error);
    });
});
