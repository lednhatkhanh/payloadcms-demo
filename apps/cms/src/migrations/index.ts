import * as migration_20260829_103903_initial from './20260829_103903_initial'
import * as migration_20260829_141959_add_locations from './20260829_141959_add_locations'
import * as migration_20260829_144330_add_homepage_and_news_media from './20260829_144330_add_homepage_and_news_media'
import * as migration_20260829_153100_add_pages from './20260829_153100_add_pages'

export const migrations = [
  {
    up: migration_20260829_103903_initial.up,
    down: migration_20260829_103903_initial.down,
    name: '20260829_103903_initial',
  },
  {
    up: migration_20260829_141959_add_locations.up,
    down: migration_20260829_141959_add_locations.down,
    name: '20260829_141959_add_locations',
  },
  {
    up: migration_20260829_144330_add_homepage_and_news_media.up,
    down: migration_20260829_144330_add_homepage_and_news_media.down,
    name: '20260829_144330_add_homepage_and_news_media',
  },
  {
    up: migration_20260829_153100_add_pages.up,
    down: migration_20260829_153100_add_pages.down,
    name: '20260829_153100_add_pages',
  },
]
