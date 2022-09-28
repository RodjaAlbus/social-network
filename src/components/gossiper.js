import { addDoc, onSnapshot } from "../importsFirebase.js"

export const Gossiper = () => {
    const div = document.createElement('div')

    const title = document.createElement('h1')
    title.textContent = 'The prank Society'
    const paperEffect = document.createElement('div')
    paperEffect.id = 'paperH1'

    //CLOSE SESION PART------------------------------------------------------------
    const logOut = document.createElement('div')
    logOut.id = 'logOutBtn'
    logOut.addEventListener('click', () => {
        signOut(auth).then(() => {
            onNavigate('/')
        }).catch((e) => {
            alert.textContent = e.message
        });
    })
    const logOutImg = document.createElement('img')
    logOutImg.src = '../img/outBtn.png'
    logOutImg.id = 'logOutImg'
    logOut.append(logOutImg)

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            deleteDoc(playerRef)
                .then((data) => { console.log('signOut:', data) })
                .catch((e) => { console.log('error singing out: ', e) })
        }
    });

    //POSTS SECTION-----------------------------------------------------------------


    //FOOTER-------------------------------------------------------------------------
    const btnReturnLobby = document.createElement('footer')
    btnReturnLobby.textContent = 'Go to playground'
    btnReturnLobby.className = 'footer'
    btnReturnLobby.addEventListener('click', () => onNavigate('/playground'))
    const footerPaperEffact = document.createElement('div')
    footerPaperEffact.id = 'footerPaper'

    div.append(title, paperEffect, btnReturnLobby, footerPaperEffact)

    return div
}