import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    coverImage,
       title,
  }
`
export const projectsPageQuery = groq`
  *[_type == "projects"][0]{
    _id,
    overview,
      showcaseProjects[]->|order(duration.start desc){
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
      duration,
    },
    title,
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title,
      "duration": duration,
    },
    ogImage,
  }
`


