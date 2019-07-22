const classListModify = (body, type) => {
  body.classList[type]('stickySave')
}

const defineWidth = (container, width) => {
  container.style.width = width
}

const show = (body, container, initalWidth) => {
  classListModify(body, 'add')
  defineWidth(container, initalWidth)
}

const hide = (body, container) => {
  classListModify(body, 'remove')
  defineWidth(container, '')
}

const observeHandler = (entries, docBody, submitContainer, initalWidth) => {
  return !(entries[0].isIntersecting)
    ? show(docBody, submitContainer, initalWidth)
    : hide(docBody, submitContainer)
}

const init = () => {
  const submitForm = document.querySelector('.tl_formbody_submit')
  const submitContainer = document.querySelector('.tl_submit_container')
  const docBody = document.body
  const initalWidth = window.getComputedStyle ? getComputedStyle(submitContainer, null).width : submitContainer.currentStyle.width;

  const observer = new window.IntersectionObserver(entries => observeHandler(entries, docBody, submitContainer, initalWidth))
  observer.observe(submitForm)
}

document.addEventListener("DOMContentLoaded", () => init())
