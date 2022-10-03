import {
    addDoc, onSnapshot, deleteDoc, db, doc, setDoc, auth, collection,
    query, getDoc, signOut
} from "../importsFirebase.js"
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
                postSection.className = 'postContainer'
                postSection.id = 'postSection'
                const postInput = document.createElement('input')
                postInput.setAttribute('type', 'text')
                postInput.id = 'postInput'
                const alert = document.createElement('p')
                alert.id = 'alert'
                const postButton = document.createElement('button')
                postButton.id = 'postButton'
                postButton.className = 'buttons'
                postButton.textContent = 'make some noise!'
                postButton.addEventListener('click', () => {
                    if (!postInput.value) alert.textContent = "write a gossip :p"
                    else {
                        getDoc(doc(db, 'Pranksters', auth.currentUser.uid))
                            .then((data) => {
                                console.log('insideGetDoc:  ', data.data().color)
                                addDoc(collection(db, 'Gossiper'), {
                                    date: new Date(),
                                    userID: auth.currentUser.uid,
                                    userName: auth.currentUser.displayName,
                                    post: document.getElementById('postInput').value,
                                    color: data.data().color,
                                    likes: 0
                                }).then((data) => {
                                    console.log('insideAddDoc: ', data)
                                    const documentLocation = data._key.path.segments[1]
                                    console.log('data: ', documentLocation)
                                    spreadGossip.textContent = 'spread a gossip'
                                    counter = 1
                                    document.getElementById('postSection').remove()
                                    //--
                                    //--
                                }).catch((e) => console.log('error posting: ', e))
                            })
                    }
                })
                postSection.append(postInput, alert, postButton)
                div.appendChild(postSection)
                spreadGossip.textContent = 'abbort mission'
                counter = 0
                break;
            case 0:
                spreadGossip.textContent = 'spread a gossip'
                counter = 1
                document.getElementById('postSection').remove()
                break;
        }
    })
    gossipButton.append(sGossipPaper, spreadGossip)

    //SHOW THE POSTS-----------------------------------------------------------------
    const showPostContainer = document.createElement('section')
    showPostContainer.id = 'showPostContainer'
    const q = query(collection(db, 'Gossiper'))
    const allPosts = onSnapshot(q, (querySnapshot) => {
        showPostContainer.innerHTML = ''
        console.log(querySnapshot, "querySnapshot")
        if (q) {
            querySnapshot.forEach((individualDoc) => {                
                const dataGeter = individualDoc.data()
                postCreation(dataGeter)
            })
            
        }
    })

    //FOOTER-------------------------------------------------------------------------
    const btnReturnLobby = document.createElement('footer')
    btnReturnLobby.textContent = 'Go to playground'
    btnReturnLobby.className = 'footer'
    btnReturnLobby.addEventListener('click', () => onNavigate('/playground'))
    const footerPaperEffact = document.createElement('div')
    footerPaperEffact.id = 'footerPaper'

    div.append(title, paperEffect, logOut, gossipButton, showPostContainer, btnReturnLobby, footerPaperEffact)

    return div
}

const postCreation = (dataGeter) => {
    const post = document.createElement('div')
    post.className = 'post'
    post.style.backgroundColor = dataGeter.color
    const poster = document.createElement('div')
    poster.textContent = dataGeter.userName
    poster.id = 'poster'
    const postText = document.createElement('div')
    postText.className = 'postText'
    postText.textContent = dataGeter.post
    const likeContainer = document.createElement('div')
    likeContainer.className = 'likeContainer'
    const likeCounter = document.createElement('div')
    likeCounter.textContent = dataGeter.likes
    likeCounter.className = 'likeCounter'
    const likesPost = document.createElement('button')
    likesPost.className = 'likesPost'
    likesPost.textContent = '<3'
    if (dataGeter.userID === auth.currentUser.uid) {
        post.id = 'yourPost'
    } else {
        likesPost.addEventListener('click', () => {
            dataGeter.likes = dataGeter.likes++
            console.log('like')
        })
    }
    likeContainer.append(likesPost, likeCounter)
    post.append(poster, postText, likeContainer)
    showPostContainer.appendChild(post)
}