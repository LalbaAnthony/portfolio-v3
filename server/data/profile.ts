const profileData: Profile = {
    firstName: "Anthony",
    lastName: "Lalba",
    location: "Toulouse, France",
    birthday: "2003-03-19",
    email: "anthony.lalba@proton.me",
    jobTitle: {
        en: "Full Stack Developer",
        fr: "Développeur Full Stack"
    },
    socials: [
        {
            label: "GitHub",
            slug: "github",
            url: "https://github.com/LalbaAnthony/"
        },
        {
            label: "LinkedIn",
            slug: "linkedin",
            url: "https://www.linkedin.com/in/anthony-lalba-abb686230/"
        }
    ],
    certifications: [
        {
            label: {
                en: "CISCO: Introduction to Cybersecurity (2021)",
                fr: "CISCO: Introduction à la cybersécurité (2021)"
            },
        }
    ],
    languages: [
        {
            label: {
                en: "French",
                fr: "Français"
            },
            proficiency: "C2"
        },
        {
            label: {
                en: "English",
                fr: "Anglais"
            },
            proficiency: "B2"
        }
    ],
    interests: [
        {
            label: {
                en: "Chess",
                fr: "Les Échecs"
            }
        },
        {
            label: {
                en: "Music, Guitar",
                fr: "Musique, Guitare"
            }
        }
    ],
    workExperiences: [
        {
            company: "Agoravita",
            position: "Alternance Full Stack Developer",
            startDate: "2022-01-01",
            endDate: "2023-12-31",
            description: {
                en: "Front-end: VueJS, Quasar, Nuxt.js, Tailwind. Back-end: PHP, Laravel, WordPress Headless, SQL, REST API. Project-based work, incident response and feature requests.",
                fr: "Outils front end: VueJS, Quasar, Nuxt.js, Tailwind. Outils back end: PHP, Laravel, WordPress Headless, SQL, API REST. Travail en projets, réponses aux incidents et aux demandes d'assistance et d'évolution."
            }
        },
        {
            company: "Agoravita",
            position: "Stagiaire Web",
            startDate: "2022-05-01",
            endDate: "2022-07-31",
            description: {
                en: "Internship in the Web department: discovery of Quasar, VueJS and Tailwind, project-based work.",
                fr: "Stage dans le pôle Web d'Agoravita, découverte de Quasar, VueJS et Tailwind, travail en projets."
            }
        },
        {
            company: "ATS Ticketing",
            position: "Stagiaire d'observation",
            startDate: "2017-01-01",
            endDate: "2017-12-31",
            description: {
                en: "Observation internship at a managed services and software development company — sparked my interest in development.",
                fr: "Stage d'observation dans une société d'infogérance et de programmation, qui m'a donné goût au développement."
            }
        }
    ],
    diplomas: [
        {
            label: {
                en: "Master's Expert in Web Development",
                fr: "Mastère Expert en développement web"
            },
            place: "Ynov",
            startYear: 2024,
            endYear: 2026,
        },
        {
            label: {
                en: "Bachelor Information Systems (DSN specialization)",
                fr: "Bachelor systèmes d'information — spécialité DSN"
            },
            place: "Limayrac",
            startYear: 2023,
            endYear: 2024,
        },
        {
            label: {
                en: "BTS SIO — Software Solutions & Business Applications",
                fr: "BTS SIO — Solutions logicielles et applications métier"
            },
            place: "Limayrac",
            startYear: 2021,
            endYear: 2023,
        },
        {
            label: {
                en: "Baccalauréat — Mathematics, Computer Science & Engineering",
                fr: "Baccalauréat — Mathématiques, numérique & sciences informatiques et sciences de l'ingénieur"
            },
            place: "Pré de Cordy",
            startYear: 2018,
            endYear: 2021,
        }
    ]
}
export default profileData
