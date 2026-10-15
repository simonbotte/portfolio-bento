export const additionalProjects = [
    {
        id: "boardo",
        slug: "boardo",
        name: "Boardo",
        baseline: "Le compteur de scores pour vos jeux de société",
        description:
            "Une application iPhone pour compter les points de vos jeux de société, retrouver vos joueurs et garder l’historique de vos parties.",
        link: "https://boardo.app/fr",
        archive: false,
        close: false,
        content: null,
        technologies: [],
    },
];

const hiddenWebsiteSlugs = ["wuuple", "yesterday-at-apple"];

export const getProjectWebsite = (project) =>
    hiddenWebsiteSlugs.includes(project.slug) ? "" : project.link;
