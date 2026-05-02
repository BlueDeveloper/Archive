/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bdarchive.site',
  generateRobotsTxt: false,
  exclude: ['/dashboard', '/dashboard/*', '/api/*'],
  outDir: './public',
};
