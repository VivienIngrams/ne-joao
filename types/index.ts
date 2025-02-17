import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
  title_pt?: string
  duration?: {start?: string}
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  overview_pt?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
  title_pt?: string
  duration?: {
    start?: string
     }
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: string
  overview_pt?: string
  coverImage: Image
  title?: string
}
export interface ProjectsPagePayload {
  footer?: PortableTextBlock[]
  showcaseProjects?: ShowcaseProject[]
  title?: string
  title_pt?: string
}

export interface PagePayload {
  body?: PortableTextBlock[]
  body_pt?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  overview_pt?: PortableTextBlock[]
  title?: string
  title_pt?: string
  slug?: string
}

export interface ProjectPayload {
  project: {
    _id: string
    title?: string
    title_pt?: string
    description?: PortableTextBlock[]
    description_pt?: PortableTextBlock[]
    duration?: {
      start?: string
      end?: string
    }
    overview?: PortableTextBlock[]
    overview_pt?: PortableTextBlock[]
    coverImage?: Image
    client?: string
    site?: string
    tags?: string[]
    slug: string
  }
  allProjects: Array<{
    title: string
    title_pt?: string
    slug: string
    _type: string
  }>
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}
