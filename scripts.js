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
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
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
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
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

const bookmarks = [{"id":"mKc8iAcb1clFZ5rn","label":"virginia tech","bookmarks":[{"id":"Rdmd5zmh7xCPIzpT","label":"OneCampus","url":"https://onecampus.vt.edu/"},{"id":"hU5rIVzbYogCDMFl","label":"Hokie Spa","url":"https://hokiespa.vt.edu/"},{"id":"EW6YWG9bEXFlhqhY","label":"piazza","url":"https://piazza.com/class/ld3mz1609q1kb"}]},{"id":"9NU2bS9KmRmJMXRd","label":"organization","bookmarks":[{"id":"ICw3EADsxqCilZCy","label":"gmail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"hCqU7pKQtHZcVP8p","label":"outlook","url":"https://outlook.office.com/mail/"},{"id":"4VcbBSzbrFZKDWiO","label":"to-do","url":"https://www.notion.so/Tasks-Spring-2024-f863fd66560f49b5b62da1983e60f726"}]},{"id":"lHwi5WPoESibMmJ1","label":"projects","bookmarks":[{"id":"BKfs5vB8t42zwdL6","label":"excalidraw","url":"https://excalidraw.com/"},{"id":"uSeYxdDxLZudu8eZ","label":"github","url":"https://github.com/"},{"id":"orDqUgB8wsVWMX8e","label":"zerohero","url":"https://github.com/karpathy/nn-zero-to-hero"}]},{"id":"LVqUFb489FX3fQCA","label":"hobbies","bookmarks":[{"id":"V4kVcOXFVkSboRAL","label":"factoryfive","url":"https://www.factoryfive.com/"},{"id":"NjkZoYvnKI1dqFeX","label":"chess.com","url":"https://www.chess.com/"},{"id":"Zg7G2Ee7X0E63Xbw","label":"youtube","url":"https://www.youtube.com/"}]}]

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
