import { onNavigate } from '../main.js'
export const message = () => {
  const div = document.createElement('div')
  const title = document.createElement('h1')
  title.textContent = 'The prank Society'
  const paperEffect = document.createElement('div')
  paperEffect.id = 'paperH1'

  const message = document.createElement('section')
  message.className = 'messageBG'

  const paragraph = document.createElement('p')
  paragraph.id = 'paragraph'
  paragraph.textContent = "So you think you have what it takes to join The Prank Society? We don't normally respond to applications from students who have just arrived at Grossham High, but after reading your background we were very impressed. How did you get the octopus to do that? Well, it doesn't matter. The important thing is that we will give you a chance, but only one. you will compete with other recruits to show us tomorrow that you are not just another nerd."

  const paragraph2 = document.createElement('p')
  paragraph2.textContent = '-Sincerly: The Prank Society.'

  const btnEnter = document.createElement('button')
  btnEnter.textContent = 'Let´s do some pranks'
  btnEnter.className = 'footer'
  btnEnter.addEventListener('click', () => onNavigate('/playground'))
  const footerPaperEffact = document.createElement('div')
  footerPaperEffact.id = 'footerPaper'

  message.append(paragraph, paragraph2)
  div.append(paperEffect, title, message, footerPaperEffact, btnEnter)
  return div
}
