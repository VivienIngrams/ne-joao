
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'projects',
  title: 'All Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of the all projects page',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title_pt',
      description: 'This field is the title of the all projects page',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
       defineField({
      name: 'showcaseProjects',
      title: 'Showcase projects',
      description:
        'These are the projects that will appear first on your landing page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
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
        subtitle: 'projects',
        title,
      }
    },
  },
})