import React from 'react';
import { graphql } from 'gatsby';
import { Design, Section, Block, Image, Content } from '@liontechnyc/gemini';
import { FixedNav, Navbar, SEO, Footer } from '../components';
import { reduceGqlConnection } from '../utils';
import staticImages from '../images';

const design = {
  layout: [['content'], ['footer']],
  grid: {
    y: ['1fr', 'auto'],
    x: ['1fr'],
  },
};

const IndexPage = (props: { data: any }) => {
  const { seoContent, seoCover, navContent, coverImage } = props.data;
  const [{ meta }] = reduceGqlConnection(seoContent);
  const navigation = reduceGqlConnection(navContent);
  typeof window !== 'undefined' && window.scrollTo(0, 0);
  return (
    <Design is="page" noHorizontalScroll={true} {...design}>
      <SEO
        lang="en"
        cover={seoCover.childImageSharp.fixed.src}
        metaTags={[{ name: 'robots', content: 'index,follow' }]}
        title="Aquarius Home"
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
        <Block fluid={true} centered={true} className="content__container">
          <Content
            containerClass="content__hero"
            title={meta.header}
            description={meta.about}
          />
          <Image src={staticImages['start.png']} defaultImg={staticImages['start.png']} />
        </Block>
      </Section>
      <Section name="footer">
        <Footer
          header="Launch Your Project Today"
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
  query IndexPageContent {
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
  }
`;

export default IndexPage;
