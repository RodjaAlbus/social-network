import {
    addDoc, onSnapshot, deleteDoc, db, doc, auth, collection,
    query, getDoc, signOut, updateDoc, increment
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
    let arrayAllPosts = []
    const showPostContainer = document.createElement('section')
    showPostContainer.id = 'showPostContainer'
    const q = query(collection(db, 'Gossiper'))
    const allPosts = onSnapshot(q, (querySnapshot) => {
        showPostContainer.innerHTML = ''
        console.log(querySnapshot, "querySnapshot")
        if (q) {
            querySnapshot.forEach((individualDoc) => {
                //arrayAllPosts.push(individualDoc.data())
                //console.log(arrayAllPosts)
                postCreation(individualDoc, showPostContainer)
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

const postCreation = (data, showPostContainer) => {
    const post = document.createElement('div')
    post.className = 'post'
    post.style.backgroundColor = data.data().color
    const posterContainer = document.createElement('div')
    const poster = document.createElement('div')
    poster.textContent = data.data().userName
    poster.id = 'poster'
    posterContainer.appendChild(poster)
    const postText = document.createElement('div')
    postText.className = 'postText'
    postText.textContent = data.data().post
    const likeContainer = document.createElement('div')
    likeContainer.className = 'likeContainer'
    const likeCounter = document.createElement('div')
    likeCounter.textContent = data.data().likes
    likeCounter.className = 'likeCounter'
    if (data.data().userID === auth.currentUser.uid) {
        const deletePost = document.createElement('button')
        deletePost.className = 'buttons'
        deletePost.textContent = 'X'
        posterContainer.className = 'posterContainer'
        deletePost.addEventListener('click', ()=>{
            deleteDoc(doc(db, "Gossiper", data._key.path.segments[6]))
            .then(()=> console.log('deleted'))
        })
        posterContainer.appendChild(deletePost)
    } else {
        const likesPost = document.createElement('button')
        likesPost.className = 'likesPost'
        likesPost.textContent = '<3'
        likesPost.addEventListener('click', () => {
            updateDoc(doc(db, 'Gossiper', data._key.path.segments[6]), {
                likes: increment(1)
            })
        })
        likeContainer.appendChild(likesPost)
    }
    likeContainer.appendChild(likeCounter)
    post.append(posterContainer, postText, likeContainer)
    showPostContainer.appendChild(post)
}