import {
  ApprovalOutlined,
  BadgeOutlined,
  EmojiEventsOutlined,
  ImportContactsOutlined,
  LaptopChromebookOutlined,
  LibraryBooksOutlined,
} from "@mui/icons-material";

export const exam = {
  name: "Exam",
  link: `/exam-plugin`,
  description:
    "Plugin makes you conduct unlimited proctored exams, set preparatory exams and mocks, permits the selling of prep exams to your subscribers/students",

  plugin: "EXAM",
  price: 0,
  icon: <LaptopChromebookOutlined />,
};
export const league = {
  name: "Competition ",
  link: `/league-plugin`,
  description:
    "Host online competition among your students. The best online competition generator. Very competitive and interractive",

  plugin: "LEAGUE",
  price: 0,
  icon: <EmojiEventsOutlined />,
};
export const result = {
  name: "Result",
  link: `/session`,
  description:
    "Generate end-of-term results for your students. Students can view and download results in PDFs.",

  plugin: "RESULT",
  price: 15000,
  icon: <BadgeOutlined />,
};
export const certificate = {
  name: "Certificate",
  link: `/certificate-plugin`,
  description:
    "Generate Certification for your students who have completed a course.",

  plugin: "CERTIFICATE",
  price: 0,
  icon: <ApprovalOutlined />,
};
export const course = {
  name: "Online Course ",
  link: `/admin/course`,
  description:
    "Plugin makes you host unlimited Online courses with your students. These could be pre-recorded vidoes, audio or PDFs. Set courses in Modules and many more.",

  plugin: "COURSE",
  price: 0,
  icon: <LibraryBooksOutlined />,
};
export const publication = {
  name: "Publisher ",
  link: `/admin/publication`,
  description:
    "Use this plugins to sell and share Downloadable contents. Books, journals, notes, templates, woorsheets, projects etc. can be sold easily with this plugin",

  plugin: "PUBLICATION",
  price: 0,
  icon: <ImportContactsOutlined />,
};
