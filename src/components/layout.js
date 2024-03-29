/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";
import {StaticQuery, graphql} from "gatsby";
import {HelmetDatoCms} from "gatsby-source-datocms";

import "../styles/index.sass";

const TemplateWrapper = ({children}) => {
  const [showMenu,
    setShowMenu] = useState(false);
  // (sort: { fields: position, order: ASC })
  return (
    <StaticQuery
      query={graphql ` query LayoutQuery { datoCmsSite { globalSeo { siteName } faviconMetaTags { ...GatsbyDatoCmsFaviconMetaTags } } datoCmsHome { seoMetaTags { ...GatsbyDatoCmsSeoMetaTags } introTextNode { childMarkdownRemark { html } } copyright location {latitude longitude} } allDatoCmsSocialProfile { edges { node { profileType url } } } } `}
      render={data => (
      <div className={`container ${showMenu
        ? "is-open"
        : ""}`}>
        <HelmetDatoCms
          favicon={data.datoCmsSite.faviconMetaTags}
          seo={data.datoCmsHome.seoMetaTags}/>
        <div className="container__sidebar">
          <div className="sidebar">
            <h6 className="sidebar__title">
              <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
            </h6>
            <div
              className="sidebar__intro"
              dangerouslySetInnerHTML={{
              __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html
            }}/>
            <ul className="sidebar__menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/portfolio">Portfolio</Link>
              </li>
              <li>
                <Link to="/reportage">Reportage</Link>
              </li>
              <li>
                <Link to="/project">Projects</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
            <p className="sidebar__social">
              {data
                .allDatoCmsSocialProfile
                .edges
                .map(({node: profile}) => (
                  <a
                    key={profile.profileType}
                    href={profile.url}
                    target="blank"
                    className={`social social--${profile
                    .profileType
                    .toLowerCase()}`}>
                    {" "}
                  </a>
                ))}
            </p>
            <div className="sidebar__copyright">
              {data.datoCmsHome.copyright}
            </div>
            {/* <pre>{ JSON.stringify(data.datoCmsHome.location)}</pre> */}
            <img src="https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-l+000(-87.6374652,41.9298705)/-87.6374652,41.9298705,14/500x300?access_token=pk.eyJ1Ijoia2hvb3BoZGV2IiwiYSI6ImNraTZqbjUyOTBnOTcycG5nenVkZXBtYW0ifQ.MZ6fU33ZTPhwzYSWcgz4Tw" alt="Map of the North Pond"  style={{width: '100%', marginTop: '15px'}}></img>
          </div>
        </div>
        <div className="container__body">
          <div className="container__mobile-header">
            <div className="mobile-header">
              <div className="mobile-header__menu">
                <button
                  onClick={e => {
                  e.preventDefault();
                  setShowMenu(!showMenu);
                }}/>
              </div>
              <div className="mobile-header__logo">
                <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    )}/>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/
