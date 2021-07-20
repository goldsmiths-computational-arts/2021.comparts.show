#!/usr/bin/env node
var ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export',// <-- replace yourproject with your repo name
    {
        branch: 'github-pages',
        repo: 'https://github.com/goldsmiths-computational-arts/2021.comparts.show.git',
        user: {
            name: 'Nathan Adams',
            email: 'nathanadams@icloud.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)