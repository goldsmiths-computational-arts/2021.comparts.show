#!/usr/bin/env node
var ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export/2021.comparts.show',// <-- replace yourproject with your repo name
    {
        branch: 'gh-pages',
        repo: 'git@github.com:goldsmiths-computational-arts/2021.comparts.show.git',
        user: {
            name: 'Nathan Adams',
            email: 'nathanadams@icloud.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)