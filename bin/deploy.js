#!/usr/bin/env node
const ghpages = require("gh-pages");

ghpages.publish(
    "__sapper__/export", // the folder we wish to deploy
    {
        branch: "gh-pages",
        repo: "https://github.com/goldsmiths-computational-arts/2021.comparts.show",
        user: {
            name: "Armando Gonzalez",
            email: "agonzalezsosto@gmail.com",
        },
    },
    () => {
        console.log("Deploy Complete!");
    }
);