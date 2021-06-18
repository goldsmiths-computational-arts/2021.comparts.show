#!/usr/bin/env node
const ghpages = require("gh-pages");

ghpages.publish(
  "__sapper__/export", // the folder we wish to deploy
  {
    branch: "gh-pages",
    repo: "https://github.com/aubergene/third.goldcomparts.show",
    user: {
      name: "Julian Burgess",
      email: "aubergene@gmail.com",
    },
  },
  () => {
    console.log("Deploy Complete!");
  }
);
