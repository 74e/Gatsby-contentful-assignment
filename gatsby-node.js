const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allContentfulPortfolioContent {
        nodes {
          id
        }
      }
    }
  `);

  const portfolioPostTemplate = path.resolve(
    "./src/templates/portfolio-post.js"
  );
  result.data.allContentfulPortfolioContent.nodes.forEach((node) => {
    createPage({
      path: `/post/${node.id}`,
      component: portfolioPostTemplate,
      context: {
        postId: node.id,
      },
    });
  });
};
