export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  detail?: string;
  // PDF in /public/certificates or an external verification page
  src: string;
};

export const certificates: Certificate[] = [
  {
    title: "Software Developer – Frontend Web Applications",
    issuer: "Developer Akademie",
    date: "Aug 2025",
    detail: "Full-time qualification, Mar 2024 – Aug 2025",
    src: "https://developerakademie.com/certificate/76998341794532/",
  },
  {
    title: "CS50W: Web Programming with Python and JavaScript",
    issuer: "HarvardX",
    date: "2023",
    detail: "Including six projects",
    src: encodeURI("/certificates/HarvardX CS50W.pdf"),
  },
  {
    title: "CS50P: Introduction to Programming with Python",
    issuer: "HarvardX",
    date: "Jun 2023",
    detail: "Verified certificate",
    src: encodeURI("/certificates/HarvardX CS50P.pdf"),
  },
  {
    title: "Crash Course on Python",
    issuer: "Google",
    date: "May 2023",
    detail: "Offered through Coursera",
    src: encodeURI("/certificates/Coursera 7HZP6YEKP5GM.pdf"),
  },
  {
    title: "Python for Everybody Specialization",
    issuer: "University of Michigan",
    date: "May 2023",
    detail: "Five-course specialization on Coursera",
    src: encodeURI("/certificates/Coursera AJHNY8X6FGHW.pdf"),
  },
];
