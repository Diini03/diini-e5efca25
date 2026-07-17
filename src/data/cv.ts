// Single source of truth for the CV page.
// Edit this file to update /cv. The page renders dynamically from this object.

export interface CVLink {
  label: string;
  href: string;
}

export interface CVExperience {
  role: string;
  company: string;
  location?: string;
  start: string; // "Jun 2025"
  end: string; // "Present" or "Feb 2025"
  bullets: string[];
}

export interface CVProject {
  name: string;
  stack: string;
  url?: string;
  bullets: string[];
}

export interface CVEducation {
  degree: string;
  school: string;
  start: string;
  end: string;
  notes?: string;
}

export interface CVCert {
  title: string;
  url?: string;
}

export interface CVSkillGroup {
  label: string;
  items: string[];
}

export interface CVReference {
  name: string;
  title: string;
  org: string;
  phone?: string;
  email?: string;
}

export interface CVLanguage {
  name: string;
  level: string;
}

export interface CVData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  links: CVLink[];
  summary: string;
  skills: CVSkillGroup[];
  experience: CVExperience[];
  projects: CVProject[];
  education: CVEducation[];
  certifications: CVCert[];
  professionalDevelopment: { title: string; body: string }[];
  languages: CVLanguage[];
  references: CVReference[];
}

export const cv: CVData = {
  name: "Diini Kahiye",
  title: "IT & Data Professional · Aspiring Data Scientist",
  location: "Mogadishu, Somalia",
  email: "diiniyare74@gmail.com",
  phone: "+252 612 039 107",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/diinikahiye/" },
    { label: "Portfolio", href: "https://diini.lovable.app" },
    { label: "GitHub", href: "https://github.com/diiniyare" },
  ],
  summary:
    "IT and Data professional with 4+ years of experience spanning systems administration, technical support, and data visualization across organizations in Somalia. Skilled in Power BI, Excel, SQL, and Python for building dashboards and reports, and experienced with Kobo Collect and ODK for field data collection support. Comfortable owning end-to-end IT operations while turning field and program data into dashboards that support monitoring and decision-making. Currently building toward a data science career through applied projects and continued study.",
  skills: [
    {
      label: "Data & BI",
      items: [
        "Excel (Pivot Tables, VLOOKUP/XLOOKUP, Power Query, VBA)",
        "Power BI (DAX, Power Query)",
        "Tableau",
        "SQL (MySQL, SQLite)",
      ],
    },
    {
      label: "Field Data & GIS",
      items: ["Kobo Collect", "ODK", "GIS Mapping"],
    },
    {
      label: "Programming",
      items: [
        "Python (Pandas, Matplotlib, Seaborn, Streamlit, OpenCV)",
        "JavaScript",
      ],
    },
    {
      label: "IT Support & Systems",
      items: [
        "Hardware/software troubleshooting",
        "Windows",
        "Linux (Ubuntu, WSL)",
        "Network support",
        "User & systems administration",
      ],
    },
    {
      label: "Web Development",
      items: ["React", "Next.js", "Node.js", "HTML/CSS"],
    },
    { label: "Tools", items: ["Git", "GitHub", "VS Code", "Cursor"] },
  ],
  experience: [
    {
      role: "System Officer",
      company: "HIMILO Organization for Development",
      start: "Jun 2025",
      end: "Present",
      bullets: [
        "Own IT operations across the organization as the sole System Officer — hardware, software, network connectivity, and user account/systems access — supporting every department.",
        "Provide technical support and troubleshooting for staff, resolving hardware, software, and connectivity issues to keep daily operations running smoothly.",
        "Build and maintain internal full-stack web applications (MongoDB, Express, React, Node.js) and support frontend/backend integrations for client-facing systems, working alongside an AI engineer.",
        "Support internal teams with Excel-based data compilation, cleaning, and basic reporting when data-related requests come in.",
      ],
    },
    {
      role: "Data Visualizer & IT Support",
      company: "NAPAD – Nomadic Assistance for Peace & Development",
      start: "Mar 2023",
      end: "Feb 2025",
      bullets: [
        "Built Power BI dashboards for NAPAD's program clients, visualizing Payment Verification (PVM) and Payment Distribution (PDM) data to support monitoring and decision-making.",
        "Used Kobo Collect and ODK to support field data collection tools for payment verification and distribution monitoring, working closely with the mobile field team.",
        "Analyzed field-collected data in Excel and Power BI, building reports that helped the team catch and flag discrepancies before they became larger issues.",
        "Provided IT support to the mobile field team, maintaining laptops, data collection devices, and connectivity for day-to-day field operations.",
      ],
    },
    {
      role: "IT & Data Support",
      company: "Fly Graphics",
      start: "Jan 2022",
      end: "Dec 2022",
      bullets: [
        "Delivered IT support across the office, setting up and maintaining computer systems and resolving day-to-day technical issues for staff.",
        "Cleaned and structured sales and operational data in Excel for internal reporting, supporting evidence-based decisions across departments.",
        "Designed and maintained data reporting workflows that reduced manual effort in monthly reconciliation.",
      ],
    },
  ],
  projects: [
    {
      name: "Somalia Displacement Forecast Dashboard",
      stack: "Power BI · DAX · Power Query",
      bullets: [
        "Built an interactive Power BI dashboard analyzing 8.03M displaced people across 20+ Somali districts, broken down by conflict, drought, and flood.",
        "Designed forecast vs. actual comparison visuals with district-level slicers, enabling month-by-month trend analysis for a real humanitarian dataset.",
      ],
    },
    {
      name: "SQL Business Data Analysis – Sample Superstore",
      stack: "SQL · MySQL · SQLite",
      bullets: [
        "Analyzed 9,994 transactional records across 4 regions and 3 product categories, identifying $2.3M in total sales and $286K profit.",
        "Found that discounts above 30% consistently produced losses and flagged 1,871 loss-making transactions, including top loss categories, for review.",
      ],
    },
    {
      name: "COVID-19 Data Analysis & Insights Dashboard",
      stack: "Python · Pandas · Matplotlib · Streamlit",
      bullets: [
        "Built an interactive multi-country dashboard in Python and Streamlit to monitor case, death, and recovery trends, replicating a Power BI-style reporting workflow.",
        "Processed and cleaned a global public health dataset covering 180+ countries, applying time-series analysis to surface regional outbreak patterns.",
      ],
    },
    {
      name: "Netflix Content & Viewership Data Analysis",
      stack: "Python · Pandas · Matplotlib",
      bullets: [
        "Performed EDA on the Netflix catalog dataset to uncover trends in genre distribution, release year patterns, and content mix across 8,000+ titles.",
        "Produced 10+ visualizations, including heatmaps and time-series plots, summarizing content strategy shifts from 2010 to 2021.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Computer Science",
      school: "Somali National University",
      start: "Aug 2021",
      end: "Jan 2026",
      notes:
        "Majors: Data Science, Machine Learning, AI. Relevant coursework: Data Analysis, Databases, Programming, Statistics.",
    },
  ],
  certifications: [
    { title: "Data Analysis with Python — freeCodeCamp" },
    { title: "Data Analyst Bootcamp — Alex The Analyst" },
  ],
  professionalDevelopment: [
    {
      title: "Data Science & Machine Learning",
      body: "Completed a Data Science & Machine Learning bootcamp covering data preprocessing, regression, classification, and clustering. Built and evaluated multiple models (Logistic Regression, Random Forest, XGBoost) through a capstone project predicting displacement event size using real Somalia IDP data (IDMC/HDX).",
    },
    {
      title: "Advanced Excel for Data & Humanitarian Reporting",
      body: "Strong, hands-on Excel background (Pivot Tables, VLOOKUP/XLOOKUP, Power Query, VBA) built across IT support and data visualization roles — used daily for program and field data reporting.",
    },
  ],
  languages: [
    { name: "Somali", level: "Native" },
    { name: "English", level: "Professional working proficiency" },
  ],
  references: [
    {
      name: "Abdirahim Aden Abdullahi",
      title: "Program Manager",
      org: "Nomadic Assistance for Peace and Development (NAPAD)",
      phone: "+252 617 819 393",
      email: "Abdirahim.abdullahi@napad-int.org",
    },
    {
      name: "Liban Dahir Bulhan",
      title: "Project Officer",
      org: "HIMILO Organization for Development",
      phone: "+252 616 200 158",
      email: "liban.bulhan@hodsom.org",
    },
    {
      name: "Dr. Adan Ibrahim Abdi",
      title: "Head, Department of Computer Science",
      org: "Somali National University",
      phone: "+252 610 370 373",
      email: "aadan55@live.com",
    },
  ],
};
