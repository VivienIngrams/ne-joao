import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    overview_pt,
    coverImage,
       title,
  }
`


export const projectsPageQuery = groq`
  *[_type == "projects"][0]{
    _id,
    overview,
    "overview_pt": overview_pt,
    showcaseProjects[]->|order(duration.start desc){
      _type,
      coverImage,
      overview,
      "overview_pt": overview_pt,
      "slug": slug.current,
      tags,
      title,
      "title_pt": title_pt,
      duration,
    },
    title,
    "title_pt": title_pt,
  }
`


export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    "body_pt": body_pt,
    overview,
    "overview_pt": overview_pt,
    title,
    "title_pt": title_pt,
    "slug": slug.current,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    "description_pt": description_pt,
    duration,
    overview,
    "overview_pt": overview_pt,
    site,
    "slug": slug.current,
    tags,
    title,
    "title_pt": title_pt,
  }
`


export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    "footer_pt": footer_pt,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title,
      "title_pt": title_pt,
      "duration": duration,
    },
    ogImage,
  }
`


