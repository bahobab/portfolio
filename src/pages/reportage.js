import React from 'react'
import {Link, graphql} from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const IndexPage = ({data}) => (
  <Layout>
    <Masonry className="showcase">
      {data
        .allDatoCmsReportage
        .edges
        .map(({node: work}) => (
          <div key={work.id} className="showcase__item">
            <figure className="card">
              <Link to={`/reportage/${work.slug}`} className="card__image">
                <Img fluid={work.coverImage.fluid}/>
              </Link>
              <figcaption className="card__caption">
                <h6 className="card__title">
                  <Link to={`/reportage/${work.slug}`}>{work.title}</Link>
                </h6>
                <div className="card__description">
                  <p>{work.excerpt}</p>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
    </Masonry>
  </Layout>
)

export default IndexPage

export const query = graphql `
  query IndexQueryAndIndexQuery {
    allDatoCmsReportage{
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
