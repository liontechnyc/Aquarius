import React from 'react';
import { graphql } from 'gatsby';
import { Design, Section, Content } from '@liontechnyc/gemini';
import { Hero, FixedNav, Navbar, SEO, Footer } from '../components';
import { reduceGqlConnection } from '../utils';
import staticImages from '../images';

const design = {
  layout: [['hero'], ['content'], ['footer']],
  grid: {
    y: ['1fr', 'auto'],
    x: ['1fr'],
  },
};
import './policy-template.scss';

const Template = (props: { data: any }) => {
  const { seoContent, seoCover, navContent, markdownContent } = props.data;
  const { html, frontmatter } = markdownContent;
  const [{ meta }] = reduceGqlConnection(seoContent);
  const navigation = reduceGqlConnection(navContent);
  typeof window !== 'undefined' && window.scrollTo(0, 0);
  return (
    <Design is="page" noHorizontalScroll={true} {...design}>
      <SEO
        lang="en"
        cover={seoCover.childImageSharp.fixed.src}
        metaTags={[{ name: 'robots', content: 'index,follow' }]}
        title={frontmatter.title}
        {...meta}
      />
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
            className="policy__container--content animated fadeIn"
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
  );
};

export const pageQuery = graphql`
  query PostByPath($path: String!) {
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
    markdownContent: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;

export default Template;
