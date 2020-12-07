import React from 'react'
import {graphql} from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const IndexPage = ({data}) => (
  <Layout>
    <Masonry className="showcase">
      {data
        .allDatoCmsPortfolio
        .edges
        .map(({node: work}) => (
          <div key={work.id} className="showcase__item">
            <figure className="card">
              <a href={work.deployLink} target="_blank" rel="noreferrer" className="card__image">
                <Img fluid={work.coverImage.fluid}/>
              </a>
              <figcaption className="card__caption">
                <h6 className="card__title">
                  <a href={work.deployLink} target="_blank" rel="noreferrer">{work.title}</a>
                </h6>
                <div className="card__description">
                  <p>{work.description}</p>
                </div>
              </figcaption>
              <div className="card__footer">
                <div className="card__footer-wrapper">
        {/* <pre>{JSON.stringify(work.deployLogo.fixed.src)}</pre> */}
                  <p><a href={work.deployLink} target="_blank" rel="noreferrer"><img src={work.deployLogo.fixed.src} alt={work.deployLink}/></a></p>
                  <p><a href={work.repo} target="_blank" rel="noreferrer"><span className="social social--github"></span></a></p>
                </div>
              </div>
            </figure>
          </div>
        ))}
    </Masonry>
  </Layout>
)

export default IndexPage

export const query = graphql `
  query indexQueryAndIndexQuery {
    allDatoCmsPortfolio{
      edges {
        node {
          id
          title
          repo
          deployLink
          deployLogo{
            fixed(width: 80, forceBlurhash: false, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFixed
            }
          }
          description
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
