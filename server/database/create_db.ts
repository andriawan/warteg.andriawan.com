'use strict';

import { createDatabase } from './knexfile'

createDatabase().finally(() => process.exit() );