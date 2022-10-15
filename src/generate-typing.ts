import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import * as http from 'http';

const definitionFactory = new GraphQLDefinitionsFactory();
definitionFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
});
