import React, { FC } from "react"
import { graphql, PageProps } from "gatsby"
import { Disqus, CommentCount } from "gatsby-plugin-disqus"
import SEO from "./seo"
import Layout from "./layout"
import Time from "./time"
interface ArticleLayoutData {
  site: {
    siteMetadata: {
      url: string
    }
  }
  markdownRemark: {
    id: string
    html: any
    excerpt: string
    frontmatter: {
      title: string
      date: string
      slug: string
      summary?: string
      stencilbot?: string
    }
  }
}

const ArticleLayout: FC<PageProps<ArticleLayoutData>> = ({
  data: { markdownRemark, site },
}) => {
  const { excerpt } = markdownRemark
  const { title, summary, stencilbot, date, slug } = markdownRemark.frontmatter

  const articleUrl = new URL(slug, site.siteMetadata.url);

  return (
    <Layout>
      <SEO
        title={title}
        description={summary || excerpt}
        stencilbot={stencilbot}
      />

      <article>
        <Time date={new Date(date)} />

        <h1>{markdownRemark.frontmatter.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }}></div>
      </article>

      <Disqus
        config={{
          /* Replace PAGE_URL with your post's canonical URL variable */
          url: articleUrl.href,
          identifier: slug,
          title,
        }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ArticleQuery($id: String) {
    site {
      siteMetadata {
        url
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt
      frontmatter {
        date
        slug
        title
        stencilbot
        summary
      }
    }
  }
`

export default ArticleLayout
