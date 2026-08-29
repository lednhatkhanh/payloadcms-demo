import * as migration_20260829_103903_initial from './20260829_103903_initial'

export const migrations = [
  {
    up: migration_20260829_103903_initial.up,
    down: migration_20260829_103903_initial.down,
    name: '20260829_103903_initial',
  },
]
