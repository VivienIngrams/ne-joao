import { DocumentIcon, ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon: DocumentIcon,
  fields: [
    // English Title
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title (English)',
      validation: (rule) => rule.required(),
    }),
    // Portuguese Title
    defineField({
      type: 'string',
      name: 'title_pt',
      title: 'Title (Portuguese)',
      validation: (rule) => rule.required(),
    }),

    // English Slug
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug)',
      options: {
        source: 'title_en',
      },
      validation: (rule) => rule.required(),
    }),
  

    // English Overview
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader in English.',
      title: 'Overview (English)',
      type: 'array',
      of: [
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),

    // Portuguese Overview
    defineField({
      name: 'overview_pt',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader in Portuguese.',
      title: 'Overview (Portuguese)',
      type: 'array',
      of: [
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),

    // English Body
    defineField({
      type: 'array',
      name: 'body',
      title: 'Body (English)',
      description:
        "This is where you can write the page's content in English, including custom blocks like timelines for more visual displays of information.",
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
          styles: [],
        }),
        defineArrayMember({
          name: 'timeline',
          type: 'timeline',
        }),
        defineField({
          type: 'image',
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              imageUrl: 'asset.url',
              title: 'caption',
            },
          },
          fields: [
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'string',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description:
                'Alternative text for screenreaders. Falls back on caption if not set',
            }),
          ],
        }),
      ],
    }),

    // Portuguese Body
    defineField({
      type: 'array',
      name: 'body_pt',
      title: 'Body (Portuguese)',
      description:
        "This is where you can write the page's content in Portuguese, including custom blocks like timelines for more visual displays of information.",
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
          styles: [],
        }),
        defineArrayMember({
          name: 'timeline',
          type: 'timeline',
        }),
        defineField({
          type: 'image',
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              imageUrl: 'asset.url',
              title: 'caption',
            },
          },
          fields: [
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'string',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description:
                'Alternative text for screenreaders. Falls back on caption if not set',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title', 
    },
    prepare({ title }) {
      return {
        subtitle: 'Page',
        title,
      }
    },
  },
})
