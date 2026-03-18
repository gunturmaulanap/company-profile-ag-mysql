export type GovernanceBrand = {
  name: string;
  slug: string;
};

export type GovernanceCompany = {
  name: string;
  slug: string;
  descriptor: string;
  brands: GovernanceBrand[];
};

export type GovernancePillar = {
  name: string;
  slug: string;
  companies: GovernanceCompany[];
};

export const governanceFilterChips = [
  "All",
  "Manufacturing",
  "Retail Herbal",
  "FMCG Aromatic",
  "Distribution",
  "Retail FMCG",
  "Digital Growth",
] as const;

export const governancePillars: GovernancePillar[] = [
  {
    name: "Manufacturing",
    slug: "manufacturing",
    companies: [
      {
        name: "Aksamala",
        slug: "aksamala",
        descriptor: "Operating Company",
        brands: [{ name: "Vitabumin", slug: "vitabumin" }],
      },
    ],
  },
  {
    name: "Retail Herbal",
    slug: "retail-herbal",
    companies: [
      {
        name: "Nakama",
        slug: "nakama",
        descriptor: "Operating Company",
        brands: [
          { name: "Nakama", slug: "nakama" },
          { name: "Habbie", slug: "habbie" },
        ],
      },
    ],
  },
  {
    name: "FMCG Aromatic",
    slug: "fmcg-aromatic",
    companies: [
      {
        name: "Habbie",
        slug: "habbie",
        descriptor: "Operating Company",
        brands: [
          { name: "Telon", slug: "telon" },
          { name: "Kayu Putih", slug: "kayu-putih" },
          { name: "Hair Oil", slug: "hair-oil" },
          { name: "Aromatherapy", slug: "aromatherapy" },
        ],
      },
    ],
  },
  {
    name: "Distribution",
    slug: "distribution",
    companies: [
      {
        name: "Achievement",
        slug: "achievement",
        descriptor: "Operating Company",
        brands: [
          { name: "Achievement", slug: "achievement" },
          { name: "Satyalaksana", slug: "satyalaksana" },
        ],
      },
    ],
  },
  {
    name: "Retail FMCG",
    slug: "retail-fmcg",
    companies: [
      {
        name: "Satyalaksana",
        slug: "satyalaksana",
        descriptor: "Operating Company",
        brands: [
          { name: "Yayle", slug: "yayle" },
          { name: "Richsweet", slug: "richsweet" },
          { name: "Telon Lega", slug: "telon-lega" },
        ],
      },
    ],
  },
  {
    name: "Digital Growth",
    slug: "digital-growth",
    companies: [
      {
        name: "Realhe",
        slug: "realhe",
        descriptor: "Operating Company",
        brands: [{ name: "Realhe", slug: "realhe" }],
      },
    ],
  },
];
