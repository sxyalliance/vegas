import convict from 'convict';

import schema from './schema';

const config = convict(schema);

config.validate({ allowed: 'strict' });

export default config;
