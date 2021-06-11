import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import category from './category'
import meal from './meal'
import menuOrder from './menuOrder'
import htmlToPortableTextTest from './htmlToPortableTextTest'
import currentInfo from './currentInfo'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    category,
    meal,
    menuOrder,
    htmlToPortableTextTest,
    currentInfo
  ]),
})
