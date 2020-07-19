import { graphql } from 'gatsby';

export const NavContentFragment = graphql`
  fragment NavContentFragment on NavYamlConnection {
    edges {
      node {
        title
        route
      }
    }
  }
`;
