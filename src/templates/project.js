import React from 'react'
import Slider from 'react-slick'
import {HelmetDatoCms} from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import {graphql} from 'gatsby'
import Layout from "../components/layout"

export default({data}) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsProject.seoMetaTags}/>
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsProject.title}</h1>
        <p className="sheet__lead">{data.datoCmsProject.excerpt}</p>
        <div className="sheet__slider">
          <Slider infinite={true} slidesToShow={1} arrows autoplay>
            {data
              .datoCmsProject
              .gallery
              .map(({fluid}) => (<img alt={data.datoCmsProject.title} key={fluid.src} src={fluid.src}/>))}
          </Slider>
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
          __html: data.datoCmsProject.descriptionNode.childMarkdownRemark.html
        }}/>
        <div className="sheet__gallery">
          <Img fluid={data.datoCmsProject.coverImage.fluid}/>
        </div>
        <img src={`https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-l+000(${data.datoCmsProject.location.longitude},${data.datoCmsProject.location.latitude})/${data.datoCmsProject.location.longitude},${data.datoCmsProject.location.latitude},14/500x300?access_token=pk.eyJ1Ijoia2hvb3BoZGV2IiwiYSI6ImNraTZqbjUyOTBnOTcycG5nenVkZXBtYW0ifQ.MZ6fU33ZTPhwzYSWcgz4Tw`} alt="Map of the North Pond" style={{width: '100%'}}></img>
      </div>
    </article>
  </Layout>
)

export const query = graphql `
  query ProjectsQuery($slug: String!) {
    datoCmsProject(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      location {
        latitude
        longitude
      }
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
