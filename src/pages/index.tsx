import React from 'react';
import { graphql } from 'gatsby';
import { Design, Section } from '@liontechnyc/gemini';
import { SEO, Navbar, Hero, About, Services, Footer } from '../components';
import { reduceGqlConnection } from '../utils';
import staticImages from '../images';
import FixedNav from '../components/FixedNav';

const design = {
  layout: [
    ['nav'],
    ['hero'],
    ['about'],
    ['services'],
    ['gallery'],
    ['blog'],
    ['clients'],
    ['footer'],
  ],
  grid: {
    y: [86, '0.4fr', '1fr'],
    x: ['1fr'],
  },
};

const IndexPage = (props: { data: any }) => {
  const content = props.data;
  const [{ meta }] = reduceGqlConnection(content.allIndexYaml);
  const navigation = reduceGqlConnection(content.allNavYaml);
  const files = reduceGqlConnection(content.allFile).reduce(
    (fileMap: object, node) => {
      return {
        [node.base]: { alt: node.base.split('.')[0], ...node },
        ...fileMap,
      };
    },
    {}
  );
  return (
    <Design is="page" noHorizontalScroll={true} {...design}>
      <SEO
        lang="en"
        metaTags={[{ name: 'robots', content: 'index,follow' }]}
        {...meta}
      />
      <FixedNav
        title={meta.title}
        routes={navigation}
        logo={staticImages['logo.svg']}
        revealAt={600}
      />
      <Section name="nav">
        <Navbar
          title={meta.title}
          routes={navigation}
          logo={staticImages['logo.svg']}
        />
      </Section>
      <Section name="hero">
        <Hero cta={meta.cta} action="Get A Quote" />
      </Section>
      <Section name="about">
        <About
          header={meta.about}
          content={reduceGqlConnection(content.allAboutYaml)}
        />
      </Section>
      <Section name="services">
        <Services
          header="Our Specializations"
          content={reduceGqlConnection(content.allServicesYaml)}
          images={files}
          {...{ staticImages }}
        />
      </Section>
      <Section name="footer">
        <Footer
          header="Let's Work Together"
          company={meta.title}
          contact={meta.contact}
          logo={staticImages['logo.svg']}
        />
      </Section>
    </Design>
  );
};

export const query = graphql`
  query IndexPageContent {
    allIndexYaml {
      edges {
        node {
          meta {
            title
            description
            keywords
            author
            cta
            about
            contact {
              address
              email
              phone
            }
            social {
              facebook
              instagram
              linkedin
            }
          }
        }
      }
    }
    allNavYaml {
      edges {
        node {
          title
          route
        }
      }
    }
    allAboutYaml {
      edges {
        node {
          title
          description
        }
      }
    }
    allServicesYaml {
      edges {
        node {
          title
          description
          image
          route
        }
      }
    }
    allFile(
      filter: {
        extension: { regex: "/(jpg)|(png)|(jpeg)/" }
        relativeDirectory: { eq: "services" }
      }
    ) {
      edges {
        node {
          base
          childImageSharp {
            fixed(width: 582, height: 375) {
              base64
              src
              srcSet
            }
            fluid(quality: 70) {
              base64
              src
              srcSet
              sizes
            }
            original {
              src
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
