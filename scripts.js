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

const bookmarks = [{"id":"mKc8iAcb1clFZ5rn","label":"mason","bookmarks":[{"id":"Rdmd5zmh7xCPIzpT","label":"blackboard","url":"https://mymasonportal.gmu.edu/"},{"id":"hU5rIVzbYogCDMFl","label":"piazza","url":"https://piazza.com/class/ld3mz1609q1kb"},{"id":"tH1n0UWJZwM0qBL5","label":"phalerovia","url":"phalerovia.github.io/"}]},{"id":"9NU2bS9KmRmJMXRd","label":"organization","bookmarks":[{"id":"ICw3EADsxqCilZCy","label":"gmail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"hCqU7pKQtHZcVP8p","label":"outlook","url":"https://outlook.office.com/mail/"},{"id":"VQJ5qk4i3JydSnGL","label":"to-do","url":"https://www.notion.so/ef808b5d73b44239aab4d8c177bd0df9?v=0deb06b5f45f4b629b163b018f3253f9"}]},{"id":"lHwi5WPoESibMmJ1","label":"projects","bookmarks":[{"id":"BKfs5vB8t42zwdL6","label":"excalidraw","url":"https://excalidraw.com"},{"id":"uSeYxdDxLZudu8eZ","label":"github","url":"https://github.com/"},{"id":"orDqUgB8wsVWMX8e","label":"zerohero","url":"https://github.com/karpathy/nn-zero-to-hero"}]},{"id":"LVqUFb489FX3fQCA","label":"misc","bookmarks":[{"id":"V4kVcOXFVkSboRAL","label":"factoryfive","url":"https://www.factoryfive.com/"},{"id":"NjkZoYvnKI1dqFeX","label":"chess.com","url":"https://www.chess.com/"},{"id":"TDjwtb8vaUsP8vNK","label":"youtube","url":"https://www.youtube.com/"}]}]

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
