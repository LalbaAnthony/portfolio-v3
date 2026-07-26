import type { MilestoneAny } from "~~/shared/types/milestone"

const milestonesData: MilestoneAny[] = [
    {
        type: "experience",
        startDate: "2022-01-01",
        endDate: "2023-12-31",
        description: {
            en: "Front-end: VueJS, Quasar, Nuxt.js, Tailwind. Back-end: PHP, Laravel, WordPress Headless, SQL, REST API. Project-based work, incident response and feature requests.",
            fr: "Outils front end: VueJS, Quasar, Nuxt.js, Tailwind. Outils back end: PHP, Laravel, WordPress Headless, SQL, API REST. Travail en projets, réponses aux incidents et aux demandes d'assistance et d'évolution."
        },
        company: "Agoravita",
        position: {
            en: "Apprenticeship Full Stack Developer",
            fr: "Alternance Full Stack Developer",
        }
    },
    {
        type: "experience",
        startDate: "2022-05-01",
        endDate: "2022-07-31",
        description: {
            en: "Internship in the Web department: discovery of Quasar, VueJS and Tailwind, project-based work.",
            fr: "Stage dans le pôle Web d'Agoravita, découverte de Quasar, VueJS et Tailwind, travail en projets."
        },
        company: "Agoravita",
        position: {
            en: "Stagiaire",
            fr: "Intern",
        }
    },
    {
        type: "experience",
        startDate: "2017-01-01",
        endDate: "2017-12-31",
        description: {
            en: "Observation internship at a managed services and software development company — sparked my interest in development.",
            fr: "Stage d'observation dans une société d'infogérance et de programmation, qui m'a donné goût au développement."
        },
        company: "ATS Ticketing",
        position: {
            en: "Stagiaire",
            fr: "Intern",
        }
    },
    {
        type: "diploma",
        label: {
            en: "Master's Expert in Web Development",
            fr: "Mastère Expert en développement web"
        },
        place: "Ynov",
        startDate: "2024-09-01",
    },
    {
        type: "diploma",
        label: {
            en: "Bachelor Information Systems (DSN specialization)",
            fr: "Bachelor systèmes d'information — spécialité DSN"
        },
        place: "Limayrac",
        startDate: "2023-09-01",
        endDate: "2024-06-30",
    },
    {
        type: "diploma",
        label: {
            en: "BTS SIO — Software Solutions & Business Applications",
            fr: "BTS SIO — Solutions logicielles et applications métier"
        },
        place: "Limayrac",
        startDate: "2021-09-01",
        endDate: "2023-06-30",
    },
    {
        type: "diploma",
        label: {
            en: "Baccalauréat — Mathematics, Computer Science & Engineering",
            fr: "Baccalauréat — Mathématiques, numérique & sciences informatiques et sciences de l'ingénieur"
        },
        place: "Pré de Cordy",
        startDate: "2018-09-01",
        endDate: "2021-06-30",
    }
]

export default milestonesData







