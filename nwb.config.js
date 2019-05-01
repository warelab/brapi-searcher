module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'brapi-searcher',
      externals: {
        react: 'React'
      }
    }
  }
}
