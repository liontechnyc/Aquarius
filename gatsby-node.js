const path = require(`path`);

const templates = {
  policyTemplate: path.resolve(`src/templates/policyTemplate.js`),
};

async function generateMarkdownTemplates({ actions, graphql, reporter }) {
  const query = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
              template
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (query.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  query.data.allMarkdownRemark.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.frontmatter.path,
      component: templates[node.frontmatter.template],
      context: {},
    });
  });
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  await generateMarkdownTemplates({ actions, graphql, reporter });
};
