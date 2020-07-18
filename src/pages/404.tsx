import React from 'react';
import { graphql } from 'gatsby';
import { Design, Section, Block, Image } from '@liontechnyc/gemini';
import { Hero, FixedNav, Navbar, SEO, Footer } from '../components';
import { reduceGqlConnection } from '../utils';
import staticImages from '../images';

const design = {
  layout: [['content'], ['footer']],
  grid: {
    y: ['1fr', 'auto'],
    x: ['1fr'],
  },
};

const ErrorPage = (props: { data: any }) => {
  const { seoContent, seoCover, navContent, coverImage } = props.data;
  const [{ meta }] = reduceGqlConnection(seoContent);
  const navigation = reduceGqlConnection(navContent);
  const errorImage = coverImage.childImageSharp.fluid.src;
  typeof window !== 'undefined' && window.scrollTo(0, 0);
  return (
    <Design is="page" noHorizontalScroll={true} {...design}>
      <SEO
        lang="en"
        cover={seoCover.childImageSharp.fixed.src}
        metaTags={[{ name: 'robots', content: 'index,follow' }]}
        title="404 Page Not Found"
        {...meta}
      />
      <FixedNav
        title={meta.title}
        routes={navigation}
        logo={staticImages['logo.svg']}
        revealAt={600}
      />
      <Section name="content">
        <Navbar
          title={meta.title}
          routes={navigation}
          logo={staticImages['logo.svg']}
        />
        <Block
          fluid={true}
          centered={true}
          style={{ marginTop: 128, marginBottom: 64, padding: '1em' }}
        >
          <Image src={errorImage} defaultImg={errorImage} />
        </Block>
      </Section>
      <Section name="footer">
        <Footer
          header="Let's Work Together"
          company={meta.title}
          contact={meta.contact}
          logo={staticImages['logo.svg']}
          social={meta.social}
        />
      </Section>
    </Design>
  );
};

export const pageQuery = graphql`
  query ErrorPageContent {
    seoContent: allSeoYaml {
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
    seoCover: file(relativePath: { eq: "cover.png" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          src
        }
      }
    }
    navContent: allNavYaml {
      edges {
        node {
          title
          route
        }
      }
    }
    coverImage: file(relativePath: { eq: "404.png" }) {
      childImageSharp {
        fluid {
          src
        }
      }
    }
  }
`;

export default ErrorPage;
