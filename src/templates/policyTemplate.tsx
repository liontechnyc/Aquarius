import React, { useLayoutEffect } from 'react';
import { graphql } from 'gatsby';
import { Design, Section, Content } from '@liontechnyc/gemini';
import { Page, SEO, FixedNav, Navbar, Footer } from '../components';
import { reduceGqlConnection } from '../utils';
import staticImages from '../images';
import './policy-template.scss';

export const pageContent = graphql`
  query PolicyPageContent($path: String!) {
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
    markdownContent: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
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

const Template = (props: { data: any }) => {
  const { seoContent, seoCover, navContent, markdownContent } = props.data;
  const { html, frontmatter } = markdownContent;
  const [{ meta }] = reduceGqlConnection(seoContent);
  const navigation = reduceGqlConnection(navContent);
  return (
    <Page>
      <SEO
        lang="en"
        cover={seoCover.childImageSharp.fixed.src}
        metaTags={[{ name: 'robots', content: 'index,follow' }]}
        title={frontmatter.title}
        {...meta}
      />
      <Design is="page" noHorizontalScroll={true} {...design}>
        <FixedNav
          title={meta.title}
          routes={navigation}
          logo={staticImages['logo.svg']}
          revealAt={600}
        />
        <Section name="content" containerClass="policy__coontainer">
          <Navbar
            title={meta.title}
            routes={navigation}
            logo={staticImages['logo.svg']}
          />
          <Content
            containerStyle={{
              margin: '0 auto',
              marginTop: 128,
              paddingBottom: 64,
              maxWidth: 'calc(100vw - 1em)',
            }}
          >
            <div
              className="policy__container--content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Content>
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

export default Template;
