import { addDoc, onSnapshot, deleteDoc, db, doc, setDoc, auth, collection } from "../importsFirebase.js"
import { onNavigate } from '../main.js'

export const Gossiper = () => {
    const div = document.createElement('div')

    const title = document.createElement('h1')
    title.textContent = 'The prank Society'
    const paperEffect = document.createElement('div')
    paperEffect.id = 'paperH1'

    deleteDoc(doc(db, 'PranksterMove', auth.currentUser.uid))
        .then((data) => { console.log('Deleting removable doc', data) })
        .catch((e) => { console.log('error deleting removable doc: ', e) })

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

    //POSTS SECTION-----------------------------------------------------------------

    const gossipButton = document.createElement('div')
    const sGossipPaper = document.createElement('div')
    sGossipPaper.id = 'sGossipPaper'
    const spreadGossip = document.createElement('button')
    spreadGossip.id = 'spreadGossip'
    spreadGossip.textContent = 'spread a gossip'
    let counter = 1
    spreadGossip.addEventListener('click', () => {
        switch (counter) {
            case 1:
                const postSection = document.createElement('section')
                postSection.className = 'postInput'
                postSection.id = 'postSection'
                const postInput = document.createElement('input')
                postInput.setAttribute('type', 'text')
                postInput.id = 'postInput'
                postSection.append(postInput)
                div.appendChild(postSection)
                spreadGossip.textContent = 'Abbort mission'
                counter = 0
                break;
            case 0:
                addDoc(collection(db, 'Gossiper'), {
                    date: new Date(),
                    userID: auth.currentUser.uid,
                    userName: auth.currentUser.displayName,
                    post: document.getElementById('postInput').value,
                    likes: 0
                }).then(() => {
                    spreadGossip.textContent = 'spread a gossip'
                    counter = 0
                    document.getElementById('postSection').remove()
                }).catch((e) => console.log('error posting: ', e))
                break;
        }
    })
    gossipButton.append(sGossipPaper, spreadGossip)

    //POST THE POSTS-----------------------------------------------------------------
    const q = query(collection(db, 'Gossiper'))
    const allPosts = onSnapshot(q, (querySnapshot) => {
      //console.log('querySnapshot: ', querySnapshot)
      querySnapshot.docChanges().forEach((change) => {

      })
    })



    //FOOTER-------------------------------------------------------------------------
    const btnReturnLobby = document.createElement('footer')
    btnReturnLobby.textContent = 'Go to playground'
    btnReturnLobby.className = 'footer'
    btnReturnLobby.addEventListener('click', () => onNavigate('/playground'))
    const footerPaperEffact = document.createElement('div')
    footerPaperEffact.id = 'footerPaper'

    div.append(title, paperEffect, logOut, gossipButton, btnReturnLobby, footerPaperEffact)

    return div
}