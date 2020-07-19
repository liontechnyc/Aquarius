import React, { useLayoutEffect } from 'react';
import { graphql } from 'gatsby';
import { Design, Section, Block, Image } from '@liontechnyc/gemini';
import { Page, SEO, FixedNav, Navbar, Footer } from '../components';
import { reduceGqlConnection } from '../utils';
import staticImages from '../images';

export const pageContent = graphql`
  query ErrorPageContent {
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

const ErrorPage = (props: PageProps) => {
  const { seoContent, seoCover, navContent } = props.data;
  const [{ meta }] = reduceGqlConnection(seoContent);
  const navigation = reduceGqlConnection(navContent);
  return (
    <Page>
      <SEO
          lang="en"
          cover={seoCover.childImageSharp.fixed.src}
          metaTags={[{ name: 'robots', content: 'index,follow' }]}
          title="404 Page Not Found"
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
          <Block
            fluid={true}
            centered={true}
            style={{ marginTop: 128, marginBottom: 64, padding: '1em' }}
          >
            <Image
              src={staticImages['404.png']}
              defaultImg={staticImages['404.png']}
            />
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
    </Page>
  );
};

export default ErrorPage;
