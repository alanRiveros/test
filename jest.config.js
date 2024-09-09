export default {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Asegúrate de que la ruta es correcta
    testEnvironment: 'jest-environment-jsdom', // Debes haber instalado 'jest-environment-jsdom'
    transform: {
      '^.+\\.jsx?$': 'babel-jest',  // Transforma archivos .js y .jsx con Babel
    },
    moduleNameMapper: {
      '^@testing-library/jest-dom$': '<rootDir>/node_modules/@testing-library/jest-dom/dist/index.js',
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/index.js'],
    coverageDirectory: 'coverage',
    transformIgnorePatterns: [
      '/node_modules/'
    ]
  };