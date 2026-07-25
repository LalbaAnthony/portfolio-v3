import type { Profile } from "~~/shared/types/profile"

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

}
export default profileData
