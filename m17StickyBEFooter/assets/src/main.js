const add = (a, b) => a + b
const subtract = (a, b) => a - b
const _pipe = (f, g) => (...args) => g(f(...args))
const flow = (...fns) => fns.reduce(_pipe)
const partial = (fn, firstArg) => {  return (...lastArgs) => {    return fn(firstArg, ...lastArgs);  }}

/**
 * Short hand for native querySelector
 * @param {String} query
 * @returns {HTMLElement}
 */
const querySelector = query => document.querySelector(query)

/**
 * shortcut o get leaner the computed styles of an element
 * @param {HTMLDivElement} container
 */
const getStyle = container => window.getComputedStyle ? getComputedStyle(container, null) : container.currentStyle

/**
 * get an single computed style from an item
 * @param {HTMLDivElement} container
 * @param {String} type
 */
const getSingleStyle = (container, type) => getStyle(container)[type]

/**
 * Shorthand to set the sticky class
 * @param {HTMLBodyElement} body
 * @param {String} type
 */
const classListModify = (body, type) => {
  body.classList[type]('stickySave')
}

/**
 * set the width to an given element
 * @param {HTMLDivElement} container
 * @param {String} width
 */
const setWidth = (container, width) => {
  container.style.width = width
}

/**
 *
 * @param {*} itemStyle
 */
const getPlainValue = itemStyle => flow(
  itemStyle,
  parseInt
)

/**
 *
 * @param {*} body
 * @param {*} container
 * @param {*} type
 * @param {*} width
 */
const handleDisplay = (body, container, type, width) => {
  classListModify(body, type)
  setWidth(container, width)
}

/**
 * show the sticky bar
 * @param {*} body
 * @param {*} container
 * @param {*} submitForm
 */
const show = (body, container, submitForm) => {
  const width = generateWidth(container, submitForm)
  handleDisplay(body, container, 'add', width)
}

/**
 * reset to default
 * @param {*} body
 * @param {*} container
 */
const hide = (body, container) => handleDisplay(body, container, 'remove', '')

/**
 * generate the real inner width with px suffix
 * @param {HTMLDivElement} submitContainer
 * @param {HTMLDivElement} submitForm
 */
const generateWidth = (submitContainer, submitForm) => {
  const containerStyle = partial(getSingleStyle, submitContainer)
  const formStyle = partial(getSingleStyle, submitForm)
  return calcTotal(containerStyle, formStyle) + 'px'
}

/**
 * handles the intersection observer
 * @param {Array} entries
 * @param {HTMLBodyElement} docBody
 * @param {HTMLDivElement} submitContainer
 * @param {HTMLDivElement} submitForm
 */
const observeHandler = (entries, docBody, submitContainer, submitForm) => !(entries[0].isIntersecting)
    ? show(docBody, submitContainer, submitForm)
    : hide(docBody, submitContainer)

/**
 * calculates the required inner width
 * @param {HTMLDivElement} containerStyle
 * @param {HTMLDivElement} formStyle
 */
const calcTotal = (containerStyle, formStyle) => {
  const paddingRight = getPlainValue(containerStyle)('paddingRight')
  const paddingLeft = getPlainValue(containerStyle)('paddingLeft')
  const widthPlain = getPlainValue(formStyle)('width')
  const padding = add(paddingRight, paddingLeft)
  const total = subtract(widthPlain, padding)

  return total
}

/**
 * Resize observer to update width on window resize
 * @param {HTMLDivElement} submitContainer
 * @param {HTMLDivElement} submitForm
 */
const autoFixContainerWidth = (submitContainer, submitForm) => {
  var resizer;
  window.addEventListener('resize', () => {
    clearTimeout(resizer)
    resizer = setTimeout(() => {
      const width = generateWidth(submitContainer, submitForm)
      setWidth(submitContainer, width)
    }, 100)
  })
}

/**
 * invoke the sticky backend footer
 */
const init = () => {
  const submitForm = querySelector('.tl_formbody_submit')
  const submitContainer = querySelector('.tl_submit_container')
  const docBody = document.body

  const observer = new window.IntersectionObserver(entries => observeHandler(entries, docBody, submitContainer, submitForm))
  observer.observe(submitForm, 500)

  autoFixContainerWidth(submitContainer, submitForm)
}

/** wait unitil the dom is loaded to get the needed elements */
document.addEventListener("DOMContentLoaded", () => init())
