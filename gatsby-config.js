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
        youtubeURL: 'https://www.youtube.com/channel/UC7E3_hURgFO2mVCLDwPSyOQ',

        sidebarCategories: {
          null: [
            'index',
            'glossary'
          ],
          Concepts: [
            'concepts/collaboration'
            // 'concepts/keys',
            // 'concepts/profiles',
            // 'concepts/registries'
          ],
          Datasets: [
            'dataset/index',
            'dataset/data-types',
            'dataset/components',
            'dataset/references'
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