var assembleData = ['package.json', process.env.SETTINGS_PATH, '.tmp/assets/data/*.{json,yml}'],
    partialsBase = 'app/templates/partials/*.hbs',
    partialsBlogBase = "app/templates/blog/partials/*.hbs";
partialsCustom = partialsBase, partialsBlogCustom = partialsBlogBase;

if (process.env.PATH_SITE_TEMPLATE_PARTIALS_PATH != "") {
    partialsCustom = process.env.PATH_SITE_TEMPLATE_PARTIALS_PATH + "*.hbs";
}
if (process.env.PATH_BLOG_TEMPLATE_PARTIALS_PATH != "") {
    partialsBlogCustom = process.env.PATH_BLOG_TEMPLATE_PARTIALS_PATH + "*.hbs";
}

module.exports = {
    options: {
        flatten: true,
        data: assembleData,
        plugins: [
            'assemble-contrib-permalinks', 'assemble-contrib-wordcount', 'assemble-contrib-contextual'
        ],
        contextual: {
            dest: '.tmp/assemble-context/'
        },
        helpers: [
            "src/helpers/*.js",
            "helper-moment"
        ]
    },
    development: {
        options: {
            production: false,
            partials: [partialsBase, partialsCustom]
        },
        files: {
            '.tmp/': ['app/templates/pages/*.hbs']
        }
    },
    production: {
        options: {
            production: true,
            partials: [partialsBase, partialsCustom]
        },
        files: {
            '.tmp/': ['app/templates/pages/*.hbs']
        }
    },
    blog_development: {
        options: {
            data: assembleData,
            partials: [partialsBase, partialsCustom, partialsBlogBase, partialsBlogCustom],
            production: false,
            permalinks: {
                structure: ':basename/index:ext'
            },
            collections: [{
                title: 'pages',
                sortby: 'date',
                sortorder: 'desc'
            }]
        },
        files: {
            '.tmp/blog/': [
                'app/templates/blog/pages/**/*{.hbs,.md}',
                process.env.PATH_BLOG_POSTS_PATH + '**/*{.hbs,.md}'
            ]
        }
    },
    blog_production: {
        options: {
            data: assembleData,
            partials: [partialsBase, partialsCustom, partialsBlogBase, partialsBlogCustom],
            production: true,
            permalinks: {
                structure: ':basename/index:ext'
            },
            collections: [{
                title: 'pages',
                sortby: 'date',
                sortorder: 'desc'
            }]
        },
        files: {
            '.tmp/blog/': [
                'app/templates/blog/pages/**/*{.hbs,.md}',
                process.env.PATH_BLOG_POSTS_PATH + '**/*{.hbs,.md}'
            ]
        }
    }


};
