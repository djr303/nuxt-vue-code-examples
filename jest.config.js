module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'vue',
    'json'
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/NEED TO SOLVE JSX IN FILE ISSUE/**/*.(ts|tsx|vue)'
  ]
}
