/** @type {import('jest').Config} */
module.exports = {
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': [
            '@swc/jest',
            {
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        tsx: true,
                    },
                },
            },
        ],
    },
}
