const GlobalJsonLd = () => {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Aqsa Khan",
        jobTitle: "Certified NLP Coach, Time Line Therapy Practitioner, Clinical Hypnotherapist",
        knowsAbout: ["ABNLP", "TLTA", "Clinical Hypnotherapy"],
        sameAs: [
          "https://www.instagram.com/ataraxiabyaqsa",
          "https://wa.me/923338566992",
        ],
      },
      {
        "@type": "ProfessionalService",
        name: "Ataraxia by Aqsa",
        areaServed: "Online",
        serviceType: "Subconscious Reprogramming and Emotional Transformation",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "/services" },
        ],
      },
    ],
  };

  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
};

export default GlobalJsonLd;
