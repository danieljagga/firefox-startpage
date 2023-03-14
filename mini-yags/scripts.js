/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"mKc8iAcb1clFZ5rn","label":"mason","bookmarks":[{"id":"Rdmd5zmh7xCPIzpT","label":"BlackBoard","url":"https://mymasonportal.gmu.edu/"},{"id":"hU5rIVzbYogCDMFl","label":"Piazza","url":"https://piazza.com/class/ld3mz1609q1kb"}]},{"id":"9NU2bS9KmRmJMXRd","label":"email","bookmarks":[{"id":"ICw3EADsxqCilZCy","label":"gmail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"hCqU7pKQtHZcVP8p","label":"outlook - gmu","url":"https://outlook.office.com/mail/"}]},{"id":"lHwi5WPoESibMmJ1","label":"projects","bookmarks":[{"id":"BKfs5vB8t42zwdL6","label":"Phalerovia","url":"https://phalerovia.github.io/"},{"id":"uSeYxdDxLZudu8eZ","label":"github","url":"https://github.com/"},{"id":"orDqUgB8wsVWMX8e","label":"zerohero","url":"https://github.com/karpathy/nn-zero-to-hero"}]},{"id":"LVqUFb489FX3fQCA","label":"hobbies","bookmarks":[{"id":"V4kVcOXFVkSboRAL","label":"factoryfive","url":"https://www.factoryfive.com/"},{"id":"NjkZoYvnKI1dqFeX","label":"chess.com","url":"https://www.chess.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()