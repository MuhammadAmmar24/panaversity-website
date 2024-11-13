export default async function sitemap() {
    const baseUrl = "https://panaversity.org/sitemap.xml";
    return [
      { url: baseUrl, lastModified: new Date() },
    //   { url: `${baseUrl}/about-us, lastModified: new Date()`},
      { url: `${baseUrl}/contact-us, lastModified: new Date()`},
      { url: `${baseUrl}/privacy-policy, lastModified: new Date()` },
    //   { url: `${baseUrl}/terms-conditions, lastModified: new Date()` },
    //   { url: `${baseUrl}/disclaimer, lastModified: new Date()` },
      // { url: ${baseUrl}/cookie-policy, lastModified: new Date() },
      { url: `${baseUrl}/sitemap, lastModified: new Date()` },
    ];
  }