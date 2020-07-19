import { graphql } from 'gatsby';

export const SeoMetaFragment = graphql`
  fragment SeoMetaFragment on SeoYamlConnection {
    edges {
      node {
        meta {
          title
          description
          keywords
          author
          header
          cta
          about
          publicUrl
          contact {
            address
            email
            phone
            booking
          }
          social {
            facebook
            instagram
            linkedin
            github
          }
        }
      }
    }
  }
`;
