export const isLoggedIn = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (accessToken && refreshToken) {
    return true;
  } else {
    return false;
  }
};

export const BACKEND_URL = "https://books.enspire2025.in/api";

export interface Listing {
  id: string;
  name: string;
  title: string;
  description: string;
  tags: string[];
  negotiable: boolean;
  is_negotiable: boolean;
  phone: string;
  year: string;
  email: string;
  status: string;
  price?: number; // Optional price field
}

export const predefinedTags = [
  "book",
  "notes",
  "slides",
  "pyqs",
  "all tables (thermo, pns)",
  "lab coat",
  "calculator",
];

export interface Club {
  name: string;
  description: string | null;
  recruitment: string | null;
  insight?: string;
}

export const clubsData: Array<{
  groupTitle: string;
  clubs: Club[];
}> = [
  {
    groupTitle: "Tech Teams & Clubs",
    clubs: [
      {
        name: "Coding Club",
        description:
          "A large tech community with verticals in CP, app dev, front-end web, UI/UX, game dev, blockchain, and AI/ML. Members collaborate on projects, competitions, and workshops.",
        recruitment: "First & Second Sem",
      },
      {
        name: "DVM (Department of Visual Media)",
        description:
          "The tech team behind major campus events, known for developing apps, designing websites, editing videos. (technically a dept, but still mentioned here for visibility)",
        recruitment: "First & Second Sem",
        insight: "Recruitment is competitive.",
      },
      {
        name: "SUTT (Student Union Technical Team)",
        description:
          "Manages critical student platforms such as the SU App, StudyDeck, and BOSM App. Operates through verticals in UI/UX, front-end, back-end, and app dev.",
        recruitment: "First & Second Sem",
        insight: "Recruitment is competitive.",
      },
      {
        name: "Team Anant",
        description:
          "A student-led satellite team designing and building a 3U CubeSat with a multispectral imaging payload. One of the only fully undergrad-run space tech teams in India.",
        recruitment: "Second Sem",
      },
      {
        name: "IKRG (Infinity Kart Racing Group)",
        description:
          "BITS Pilani’s motorsports team building a high-performance electric go-kart. Operates verticals in mechanical, electronics, marketing, sponsorship, and publicity.",
        recruitment: "Second Sem",
      },
      {
        name: "CRISS Robotics",
        description:
          "Space engineering and robotics research group designing planetary rovers for competitions like ERC, IRDC, ISDC, IRC, and Robofest. Divided into mechanical, payload, electrical, and software subsystems.",
        recruitment: "Second Sem",
      },
      {
        name: "Robocon",
        description:
          "Robotics team participating in national and international contests. Members work on end-to-end robot design and implementation.",
        recruitment: "Second Sem",
      },
      {
        name: "Postman Innovation Lab",
        description:
          "A Postman-backed tech team focused on scalable product building. Vertical options include app development, game development, blockchain, UI/UX, web development, and video editing.",
        recruitment: "Second Sem",
        insight:
          "Members receive RKIC lab access.",
      },
      {
        name: "KXR Labs (Kalipatnapu XR Lab)",
        description:
          "Dedicated to pushing boundaries in AR/VR development. Members explore real-world applications and immersive experiences.",
        recruitment: "Second Sem",
        insight: "Members receive RKIC lab access.",
      },
    ],
  },
  {
    groupTitle: "Finance & Entrepreneurship",
    clubs: [
      {
        name: "Wall Street Club",
        description:
          "Operates two student-managed funds — Questus (Value Investing) and Flowus (Quant Trading). Members research, invest, and present ideas in equity markets.",
        recruitment: "Both Sems",
        insight:
          "Recruitment is extremely competitive; selects around 11–12 members.",
      },
      {
        name: "EFA (Economics & Finance Association)",
        description:
          "A forum to explore finance, economics, and their intersection with tech and policy. Encourages discussions, research, and events.",
        recruitment: "Both Sems",
      },
      {
        name: "Quant Club",
        description:
          "Focused on data-driven decision-making and quantitative finance. Operates in two verticals: Research and Development.",
        recruitment: "First Sem",
      },
      {
        name: "PIEDS",
        description:
          "A key player in BITS startup culture, supporting student-led innovation and entrepreneurship through mentorship and events.",
        recruitment: "Second Sem",
        insight:
          "Recruitment is competitive; Members also receive RKIC lab access.",
      },
      {
        name: "CEL (Center for Entrepreneurial Leadership)",
        description:
          "Flagbearers of BITS’ entrepreneurial ecosystem, nurturing innovation at the campus and national level. Runs events, mentorship, and startup support.",
        recruitment: "Both Sems",
        insight: "Recruitment is competitive",
      },
    ],
  },
  {
    groupTitle: "Volunteer Groups",
    clubs: [
      {
        name: "Anchor",
        description:
          "A BITSians-only support group for queer, questioning, and allied students. Focuses on building a safe and inclusive environment while promoting awareness on gender and sexuality.",
        recruitment: "First Sem",
        insight: "Students are also drawn to the PORs these groups offer.",
      },
      {
        name: "Nirmaan",
        description:
          "A student-run NGO focused on social change and community engagement through education, awareness, and development initiatives.",
        recruitment: "Both Sems",
        insight: "Students are also drawn to the PORs these groups offer.",
      },
      {
        name: "NSS",
        description:
          "Works across five pillars: education for underprivileged children, sustainability, healthcare camps, inclusion of differently-abled children, and leadership development.",
        recruitment: "First Sem",
        insight: "Students are also drawn to the PORs these groups offer.",
      },
      {
        name: "PARC",
        description:
          "Student division of the Pilani AtmaNirbhar Resource Center (PARC), driven by BITSAA, focusing on rural empowerment around Pilani.",
        recruitment: "Second Sem",
        insight: "Students are also drawn to the PORs these groups offer.",
      },
    ],
  },
  {
    groupTitle: "Music",
    clubs: [
      {
        name: "Gurukul",
        description:
          "Known for organizing high-energy musical nights with massive turnout, fostering a diverse music community.",
        recruitment: "Both Sems",
      },
      {
        name: "Music Club",
        description:
          "The oldest performing arts club at BITS. Performs at inaugurations, Music Nite, Psenti Nite, and other major campus events.",
        recruitment: "Both Sems",
      },
      {
        name: "Ragamālika",
        description:
          "The Indian classical music and dance club showcasing cultural performances and training.",
        recruitment: "Second Sem",
      },
      {
        name: "Karaoke Club",
        description: null,
        recruitment: null,
      },
    ],
  },
  {
    groupTitle: "Consulting",
    clubs: [
      {
        name: "BITS Pilani Consulting Club (BPCC)",
        description:
          "Offers live consulting projects in domains like AI, healthtech, and retail. Hosts case prep sessions, workshops, and its own case book. Open to freshers.",
        recruitment: "Both Sems",
      },
      {
        name: "180 Degrees Consulting (180DC)",
        description:
          "Global consulting org with a high-performing BITS branch. Has worked with UNICEF-backed NGOs and runs international market-entry projects.",
        recruitment: "Second Year Only",
      },
    ],
  },
  {
    groupTitle: "Skill Development Clubs",
    clubs: [
      {
        name: "Communo",
        description: "Public speaking and communication development",
        recruitment: null,
      },
      {
        name: "FMAC (Film Making Club)",
        description: "Filmmaking and storytelling",
        recruitment: null,
      },
      {
        name: "Photog",
        description: "Photography and visual content",
        recruitment: null,
      },
      {
        name: "Hindi Press Club",
        description: "Hindi journalism and campus coverage",
        recruitment: null,
      },
      {
        name: "English Press Club",
        description: "English journalism and reporting",
        recruitment: null,
      },
      {
        name: "REC (Renewable Energy Club)",
        description: "Clean tech and energy innovation",
        recruitment: null,
      },
      {
        name: "SARC",
        description: "Students Alumni Relations Cell",
        recruitment: null,
      },
      {
        name: "Embryo",
        description: "Brings in external speakers and alumni for lectures",
        recruitment: null,
      },
      {
        name: "DebSoc",
        description: "Competitive debating and discussion",
        recruitment: null,
      },
      {
        name: "GDSC",
        description: "Google-supported coding community",
        recruitment: null,
      },
      {
        name: "Product Management Club",
        description: "PM fundamentals, case studies, and mock sprints",
        recruitment: null,
      },
      {
        name: "BITSMUN",
        description: "UN simulations, diplomacy, and policy debates",
        recruitment: null,
      },
    ],
  },
  {
    groupTitle: "Hobby Clubs",
    clubs: [
      {
        name: "Astro Club",
        description: null,
        recruitment: null,
      },
      {
        name: "CrAC (Creative Activities Club)",
        description: null,
        recruitment: null,
      },
      {
        name: "Cubing Club",
        description: null,
        recruitment: null,
      },
      {
        name: "Dance Club",
        description: null,
        recruitment: null,
      },
      {
        name: "Eastern Outlook",
        description: null,
        recruitment: null,
      },
      {
        name: "English Language Activities Society",
        description: null,
        recruitment: null,
      },
      {
        name: "Fashion Club",
        description: null,
        recruitment: null,
      },
      {
        name: "FitBits (Fitness Club)",
        description: null,
        recruitment: null,
      },
      {
        name: "KalamVansh (Literary Society)",
        description: null,
        recruitment: null,
      },
      {
        name: "Gaming Club",
        description: null,
        recruitment: null,
      },
      {
        name: "MAC (Mountaineering and Adventure Club)",
        description: null,
        recruitment: null,
      },
      {
        name: "Comedy Hub",
        description: null,
        recruitment: null,
      },
      {
        name: "Mime Club",
        description: null,
        recruitment: null,
      },
      {
        name: "Poetry Club",
        description: null,
        recruitment: null,
      },
      {
        name: "Matrix (Math Club)",
        description: null,
        recruitment: null,
      },
      {
        name: "Hindi Drama Club (HDC)",
        description: null,
        recruitment: null,
      },
      {
        name: "Public Policy Club",
        description: null,
        recruitment: null,
      },
      {
        name: "Radioaktiv",
        description: null,
        recruitment: null,
      },
      {
        name: "Sovesa (Social Ventures Club)",
        description: null,
        recruitment: null,
      },
    ],
  },
  {
    groupTitle: "Cultural Associations",
    clubs: [
      {
        name: "Andhra Samithi",
        description: "Telangana and Andhra Pradesh",
        recruitment: null,
      },
      {
        name: "Arunodoi",
        description: "North-East India",
        recruitment: null,
      },
      {
        name: "Delhi Capitol",
        description: "Delhi and Delhi NCR",
        recruitment: null,
      },
      {
        name: "Gurjari",
        description: "Gujarat",
        recruitment: null,
      },
      {
        name: "Haryana Cultural Association",
        description: "Haryana",
        recruitment: null,
      },
      {
        name: "Kairali",
        description: "Kerala",
        recruitment: null,
      },
      {
        name: "Kannada Vedike",
        description: "Karnataka",
        recruitment: null,
      },
      {
        name: "Madhyansh",
        description: "Madhya Pradesh",
        recruitment: null,
      },
      {
        name: "Maharashtra Mandal",
        description: "Maharashtra",
        recruitment: null,
      },
      {
        name: "Marudhara",
        description: "Rajasthan",
        recruitment: null,
      },
      {
        name: "Maurya Vihar",
        description: "Bihar, Jharkhand",
        recruitment: null,
      },
      {
        name: "Moruchhaya",
        description: "West Bengal",
        recruitment: null,
      },
      {
        name: "Pilani Tamizh Mandalam",
        description: "Tamil Nadu",
        recruitment: null,
      },
      {
        name: "Punjab Cultural Association",
        description: "Punjab",
        recruitment: null,
      },
      {
        name: "Sangam",
        description: "Uttar Pradesh",
        recruitment: null,
      },
      {
        name: "Udgam",
        description: "J&K, Himachal Pradesh, Uttarakhand, Ladakh",
        recruitment: null,
      },
      {
        name: "Utkal Samaj",
        description: "Odisha",
        recruitment: null,
      },
    ],
  },
];

export const hostelOptions = [
  { label: "Shankar Bhawan", value: "shankar" },
  { label: "Gandhi Bhawan", value: "gandhi" },
  { label: "Krishna Bhawan", value: "krishna" },
  { label: "Meera Bhawan", value: "meera" },
  { label: "SR Bhawan", value: "sr" },
  { label: "Budh Bhawan", value: "budh" },
  { label: "VK Bhawan", value: "vk" },
  { label: "Vyas Bhawan", value: "vyas" },
  { label: "Ram Bhawan", value: "ram" },
  { label: "RP Bhawan", value: "rp" },
  { label: "Bhagirath Bhawan", value: "bhagirath" },
  { label: "Ashok Bhawan", value: "ashok" },
  { label: "CVR Bhawan", value: "cvr" },
  { label: "Malviya Bhawan", value: "malviya" },
];

export const contactsByHostel: Record<string, Array<{ label: string; phone: string }>> = {
  shankar: [
    { label: "Chief Warden (Prof. RP Mishra)", phone: "+91 96940 96457" },
    { label: "Assoc. Dean SWD (Prof. Navin Singh)", phone: "+91 98873 21072" },
    { label: "Chief Security Officer", phone: "+91 94140 82758" },
    { label: "SWD Office", phone: "01596242282" },
    { label: "Sk warden (Prof. Sharad)", phone: "+91 93511 50986" },
    { label: "Sk supri: (Harbansh Lal)", phone: "+91 97856 44053" },
    { label: "Sk chowki (Vikram Singh)", phone: "+91 87696 40715" },
    { label: "Cleaner Supervisor number", phone: "+91 81043 34764" },
    { label: "Dhobi (Ground floor)", phone: "+91 90019 55100" },
    { label: "Dhobi (First floor)", phone: "+91 78780 29706" },
    { label: "Laundromat (Malviya side)", phone: "+91 90242 42548" },
    { label: "Hostel Admission Office", phone: "Sk 2101" },
  ],
  gandhi: [
    { label: "Warden: Prof. Nitin", phone: "9694096452" },
    { label: "Supri: Ranveer Rathore", phone: "9694098474" },
  ],
  krishna: [
    { label: "Warden: Dr. Srinivas", phone: "8854065246" },
    { label: "Supri: Samundar Singh", phone: "9694096473" },
  ],
  meera: [
    { label: "Warden: Prof. Rakhee", phone: "9983480689" },
    { label: "Supri: Ms. Ritu", phone: "9694096468" },
  ],
  sr: [
    { label: "Warden: Dr. Rajesh", phone: "9547826092" },
    { label: "Supri: Ranveer Singh", phone: "9588099929" },
  ],
  budh: [
    { label: "Warden: Trilok Mathur", phone: "9694096460" },
    { label: "Supri: Rohitashwa R.", phone: "9694096465" },
  ],
  vk: [
    { label: "Warden: Suvanjan B.", phone: "9330654120" },
    { label: "Supri: Randhir Singh", phone: "9001811615" },
  ],
  vyas: [
    { label: "Warden: Dr. Praveen", phone: "8239818326" },
    { label: "Supri: KP Gurjar", phone: "7023476745" },
  ],
  ram: [
    { label: "Warden: Dr. Pandey", phone: "9950952634" },
    { label: "Supri: Mahavir Singh", phone: "9694096464" },
  ],
  rp: [
    { label: "Warden: Prof. Rajeev", phone: "6378364745" },
    { label: "Supri: Randhir Singh", phone: "9001811615" },
  ],
  bhagirath: [
    { label: "Warden: Prof. RR Mishra", phone: "9411280207" },
    { label: "Supri: Ranveer Singh", phone: "9588099929" },
  ],
  ashok: [
    { label: "Warden: Prof. Nirankush", phone: "9560519781" },
    { label: "Supri: Rajendra B.", phone: "7568998155" },
  ],
  cvr: [
    { label: "Warden: Prof. Prashant", phone: "9571552353" },
    { label: "Supri: Rajendra B.", phone: "7568998155" },
  ],
  malviya: [
    { label: "Warden: Prof. Trilok", phone: "9468675801" },
    { label: "Supri: Rohitashwa R.", phone: "9694096465" },
  ],
};
