import type { Shortcut } from "~~/shared/types/shortcut"

const shortcutsData: Shortcut[] = [
  {
    label: "GitLab (AgoraVita) Repos Search",
    fromPath: "gls/%q",
    toUrl: "https://avonline2.agoravita.com/search?search=%q&nav_source=navbar"
  },
  {
    label: "GitHub (Perso)",
    fromPath: "gh",
    toUrl: "https://github.com/LalbaAnthony"
  },
  {
    label: "GitHub (Perso) Repos",
    fromPath: "ghr",
    toUrl: "https://github.com/LalbaAnthony?tab=repositories"
  },
  {
    label: "GitHub (Perso) Repos Search",
    fromPath: "ghs/%q",
    toUrl: "https://github.com/LalbaAnthony?tab=repositories&q=%q"
  },
  {
    label: "Docker Hub",
    fromPath: "dhb",
    toUrl: "https://hub.docker.com/u/lalbaanthony"
  },
  {
    label: "Wikipedia",
    fromPath: "w/%q",
    toUrl: "https://www.wikipedia.org/w/index.php?title=Special:Search&search=%q"
  },
  {
    label: "MDN",
    fromPath: "mdn/%q",
    toUrl: "https://developer.mozilla.org/search?q=%q"
  }
]

export default shortcutsData

