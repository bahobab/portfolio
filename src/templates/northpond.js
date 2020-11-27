import React from 'react'
import Slider from 'react-slick'
import {HelmetDatoCms} from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import {graphql} from 'gatsby'
import Layout from "../components/layout"

export default({data}) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsNorthpond.seoMetaTags}/>
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsNorthpond.title}</h1>
        <p className="sheet__lead">{data.datoCmsNorthpond.excerpt}</p>
        <div className="sheet__slider">
          <Slider infinite={true} slidesToShow={2} arrows>
            {data
              .datoCmsNorthpond
              .gallery
              .map(({fluid}) => (<img alt={data.datoCmsNorthpond.title} key={fluid.src} src={fluid.src}/>))}
          </Slider>
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
          __html: data.datoCmsNorthpond.descriptionNode.childMarkdownRemark.html
        }}/>
        <div className="sheet__gallery">
          <Img fluid={data.datoCmsNorthpond.coverImage.fluid}/>
        </div>
      </div>
    </article>
  </Layout>
)

export const query = graphql `
  query NorthpondQuery($slug: String!) {
    datoCmsNorthpond(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`
