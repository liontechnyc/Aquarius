import React, { useLayoutEffect } from 'react';
import { graphql } from 'gatsby';
import { Design, Section, Block, Image, Content } from '@liontechnyc/gemini';
import { Page, SEO, FixedNav, Navbar, Footer } from '../components';
import { reduceGqlConnection } from '../utils';
import staticImages from '../images';

export const pageContent = graphql`
  query IndexPageContent {
    seoContent: allSeoYaml {
      ...SeoMetaFragment
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

const design = {
  layout: [['content'], ['footer']],
  grid: {
    y: ['1fr', 'auto'],
    x: ['1fr'],
  },
};

const IndexPage = (props: PageProps) => {
  const { seoContent, seoCover, navContent } = props.data;
  const [{ meta }] = reduceGqlConnection(seoContent);
  const navigation = reduceGqlConnection(navContent);
  return (
    <Page>
      <SEO
        lang="en"
        cover={seoCover.childImageSharp.fixed.src}
        metaTags={[{ name: 'robots', content: 'index,follow' }]}
        title="Aquarius Home"
        {...meta}
      />
      <Design is="page" noHorizontalScroll={true} {...design}>
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
            <Image
              src={staticImages['start.png']}
              defaultImg={staticImages['start.png']}
            />
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
    </Page>
  );
};

export default IndexPage;
