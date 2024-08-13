import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: process.env.ROBOT_TXT_ALLOW,
      disallow: process.env.ROBOT_TXT_DISALLOW ,
    },
  }
}