/* jshint strict: true */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'app/js/*.js'
            ]
        },
        browserify: {
          dist: {
            files: {
              'build/js/all.js': 'app/js/main.js'
            }
          }
        },
        blogbuilder: {
          default: {
            options: {
              data: {
                author: "Matthew Daly",
                email: "matthew@matthewdaly.co.uk",
                url: "https://matthewdaly.co.uk",
                addthis: "MattBD",
                googleanalytics: "UA-17043630-1",
                disqus: "matthewdaly",
                github: "matthewbdaly",
                twitter: "MattBD",
                stackoverflow: "63717/matthew-daly",
                title: "Matthew Daly's Blog",
                description: "I'm a web developer in Norfolk. This is my blog...",
                linenos: true,
                truncatefeed: 0,
                keywords: [
                  'web',
                  'development',
                  'python',
                  'javascript',
                  'php',
                  'programming'
                ]
              },
              template: {
                post: 'app/templates/post.hbs',
                page: 'app/templates/page.hbs',
                index: 'app/templates/index.hbs',
                header: 'app/templates/partials/header.hbs',
                footer: 'app/templates/partials/footer.hbs',
                sidebar: 'app/templates/partials/sidebar.hbs',
                archive: 'app/templates/archive.hbs',
                notfound: 'app/templates/404.hbs',
                robots: 'app/templates/robots.txt',
                category: 'app/templates/category.hbs'
              },
              amppages: true,
              amptemplate: {
                 post: 'app/templates/amp/post.hbs',
                 header: 'app/templates/amp/header.hbs',
                 footer: 'app/templates/amp/footer.hbs',
              },
              src: {
                posts: 'content/posts/',
                pages: 'content/pages/'
              },
              www: {
                dest: 'blogbuilderoutput'
              }
            },
            files: {
              'tmp/default': ['test/fixtures/testing', 'test/fixtures/123']
            }
          }
        },
        copy: {
            html: {
                expand: true,
                cwd: 'build/',
                src: [
                    '**/*.html',
                    '**/rss.xml',
                    '**/atom.xml'
                ],
                dest: 'www/'
            },
            opensearch: {
                cwd: 'app/',
                expand: true,
                src: [
                    '**/opensearch.xml'
                ],
                dest: 'www/'
            },
            favicon: {
                expand: true,
                cwd: 'static/',
                src: [
                    'favicon.ico'
                ],
                dest: 'www/'
            },
            logo: {
                expand: true,
                cwd: 'static/',
                src: [
                    'logo.png'
                ],
                dest: 'www/'
            },
            icons: {
               expand: true,
               cwd: 'app',
               src: [
                  '*.png',
                  'manifest.json',
                  'browserconfig.xml'
               ],
               dest: 'www/'
            },
            img_header: {
                expand: true,
                cwd: 'static/',
                src: [
                  'pattern.svg'
                ],
                dest: 'www/'
            },
            css: {
                expand: true,
                cwd: 'build/css/',
                src: [
                    'style.min.css'
                ],
                dest: 'www/static/css/'
            },
            js: {
                cwd: 'build/js/',
                expand: true,
                src: [
                    'all.min.js'
                ],
                dest: 'www/static/js/'
            },
            fonts: {
               cwd: 'node_modules/bootstrap-sass/assets/',
               expand: true,
               src: 'fonts/**/*',
               dest: 'www/static/'
            },
            rss: {
                cwd: 'blogbuilderoutput/',
                expand: true,
                src: [
                    '**/rss.xml'
                ],
                dest: 'www/'
            },
            atom: {
                cwd: 'blogbuilderoutput/',
                expand: true,
                src: [
                    '**/atom.xml'
                ],
                dest: 'www/'
            },
            cname: {
                src: 'CNAME',
                dest: 'www/'
            },
            sitemap: {
                cwd: 'blogbuilderoutput/',
                expand: true,
                src: [
                    'sitemap.xml'
                ],
                dest: 'www/'
            },
            robots: {
                cwd: 'blogbuilderoutput/',
                expand: true,
                src: [
                    'robots.txt'
                ],
                dest: 'www/'
            },
            lunr: {
                cwd: 'blogbuilderoutput/',
                expand: true,
                src: [
                    'lunr.json'
                ],
                dest: 'www/'
            }
        },
        clean: [
            'www',
            'build',
            'blogbuilderoutput'
        ],
        watch: {
            css: {
                files: [
                    'app/sass/*.scss',
                ],
                tasks: [
                    'sass',
                    'cssmin',
                    'copy:css'
                ],
                options: {
                    spawn: false,
                    livereload: {
                        options: {
                            livereload: 35729
                        }
                    }
                }
            },
            js: {
                files: [
                    'app/js/main.js'
                ],
                tasks: [
                    'newer:jshint',
                    'browserify',
                    'uglify',
                    'copy:js',
                ],
                options: {
                    spawn: false,
                    livereload: {
                        options: {
                            livereload: 35729
                        }
                    }
                }
            },
            content: {
                files: [
                    'app/templates/*.hbs',
                    'app/templates/partials/*.hbs',
                    'app/templates/amp/*.hbs',
                    'app/templates/robots.txt',
                    'content/pages/*.md',
                    'content/pages/*.markdown',
                    'content/posts/*.md',
                    'content/posts/*.markdown',
                ],
                tasks: [
                    'blogbuilder',
                    'sitemap',
                    'htmlmin',
                    'copy:html',
                    'copy:favicon',
                    'copy:rss',
                    'copy:cname',
                    'copy:sitemap',
                    'copy:robots',
                    'copy:lunr'
                ],
                options: {
                    spawn: false,
                    livereload: {
                        options: {
                            livereload: 35729
                        }
                    }
                }
            }
        },
        connect: {
            options: {
                hostname: 'localhost',
                livereload: 35729,
                open: 'http://localhost:8000/',
                debug: true,
                base: 'www'
            },
            www: {
                directory: 'www',
                livereload: true
            }
        },
        sass: {
            dist: {
                files: {
                   'build/css/style.css': 'app/sass/style.scss'
                }
            }
        },
        cssmin: {
            dist: {
                src: 'build/css/style.css',
                dest: 'build/css/style.min.css'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'blogbuilderoutput',
                    src: '**/*.html',
                    dest: 'build/'
                }]
            }
        },
        uglify: {
            dist: {
                src: [
                  'build/js/all.js'
                ],
                dest: 'build/js/all.min.js'
            }
        },
        imagemin: {
            images: {
                files: [{
                    expand: true,
                    cwd: 'content/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'www/static/images/'
                }]
            }
        },
        sitemap: {
            dist: {
                siteRoot: 'blogbuilderoutput/',
                pattern: [
                    'blogbuilderoutput/index.html',
                    'blogbuilderoutput/**/*.html',
                    'blogbuilderoutput/**/rss.xml'
                ],
                homepage: 'https://matthewdaly.co.uk/'
            }
        },
        'gh-pages': {
            options: {
                base: 'www',
                branch: 'master'
            },
            src: ['**']
        },
        cloudflare: {
            a: 'fpurge_ts',
            tkn: process.env.CLOUDFLARE_API_KEY,
            email: process.env.CLOUDFLARE_EMAIL,
            z: process.env.CLOUDFLARE_DOMAIN
        },
        http: {
          'Atom': {
             options: {
                url: 'https://pubsubhubbub.appspot.com/',
                method: 'POST',
                json: {
                   'hub.mode': 'publish',
                   'hub.url': 'https://matthewdaly.co.uk/atom.xml'
                }
             }
          },
          'RSS': {
             options: {
                url: 'https://pubsubhubbub.appspot.com/',
                method: 'POST',
                json: {
                   'hub.mode': 'publish',
                   'hub.url': 'https://matthewdaly.co.uk/rss.xml',
                }
             }
          }
        },
        rsync: {
          options: {
            args: ["--verbose"],
            exclude: [".git*","*.scss","node_modules"],
            recursive: true
          },
          dist: {
            options: {
              src: "www/",
              dest: "/usr/share/nginx/www",
              host: "matthew@192.168.1.15",
              delete: true // Careful this option could cause data loss, read the docs!
            }
          },
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-blogbuilder');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-cloudflare');
    grunt.loadNpmTasks('grunt-sitemap');
    grunt.loadNpmTasks('grunt-rsync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-http');

    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'newer:jshint',
        'browserify',
        'blogbuilder',
        'sitemap',
        'sass',
        'cssmin',
        'htmlmin',
        'uglify',
        'imagemin',
        'copy'
    ]);
    grunt.registerTask('serve', [
        'default',
        'connect',
        'watch'
    ]);
    grunt.registerTask('local', [
        'default',
        'rsync'
    ]);
    grunt.registerTask('deploy', [
        'default',
        'gh-pages',
         'cloudflare'
    ]);
};
