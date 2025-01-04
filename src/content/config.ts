import { z, defineCollection } from 'astro:content';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const post = defineCollection({
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    publishDate: z.date().optional(),
    author: z.string().optional(),
    language: z.enum(['en', 'zh']).default('zh'),
    draft: z.boolean().optional(),
    metadata: metadataDefinition(),
  }),
});

export const collections = {
  post: post,
};
