// gatsby-config.js
module.exports = {
  pathPrefix: '',
  plugins: [
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        root: __dirname,
        siteName: 'Qri Specs',
        description: 'Qri Core Specification',
        twitterHandle: 'qri_io',
        youtubeUrl: 'https://www.youtube.com/channel/UC7E3_hURgFO2mVCLDwPSyOQ',

        sidebarCategories: {
          null: [
            'index',
            'glossary'
          ],
          Concepts: [
            'concepts/profiles',
            'concepts/references',
            'concepts/registries'
          ],
          Dataset: [
            'dataset/index'
          ],
          Runtime: [
            'runtime/index'
          ],
          Subsystems: [
            'subsystems/index',
            'subsystems/dslist',
            'subsystems/dsync',
            'subsystems/fsi',
            'subsystems/logbook',
            'subsystems/p2p',
            'subsystems/qfs',
            'subsystems/remote'
          ]
        }
      }
    }
  ]
};