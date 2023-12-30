import React from "react";
import { Helmet } from "react-helmet";

/*
 * SEOHeader Component:
 * This component generates the SEO metadata for the page, including the title,
 * description, and JSON-LD structured data.
 */

export default function SEOHeaderComponent({ title, description }) {
  /*
   * JSON-LD Schema for Structured Data:
   * This schema follows the schema.org vocabulary and provides structured data
   * for a person, I put this here for improved search engine indexing
   *
   * - `@context`: Sets the context to the schema.org vocabulary.
   * - `@type`: Specifies type, if its organization etc, in this case its me.
   * - `name`: My name as I am the person
   * - `sameAs`: Links what are relevent to me such as linked in and github
   */

  const scheme = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jovan M",
    sameAs: [
      "https://www.linkedin.com/in/jovan-marinkovic-090842272/",
      "https://github.com/74e",
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <script type="application/ld+json">{JSON.stringify(scheme)}</script>
    </Helmet>
  );
}
