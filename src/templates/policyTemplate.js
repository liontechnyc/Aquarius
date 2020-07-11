import React from 'react';
import { graphql } from 'gatsby';
import { SEO } from '../components';
import './policy-template.scss';

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;

export default function Template({ data }) {
  const { markdownRemark: page } = data;
  typeof window !== 'undefined' && window.scrollTo(0, 0);
  return (
    <div>
      <SEO title={page.frontmatter.title} />
      <div className="policy__container">
        <div
          className="policy__container--content animated fadeIn"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </div>
    </div>
  );
}
