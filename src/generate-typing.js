"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const definitionFactory = new graphql_1.GraphQLDefinitionsFactory();
definitionFactory.generate({
    typePaths: ['./src/**/*.graphql'],
    path: (0, path_1.join)(process.cwd(), 'src/graphql.ts'),
    outputAs: 'class'
});
//# sourceMappingURL=generate-typing.js.map