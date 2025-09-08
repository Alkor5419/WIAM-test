export const routes = {
    personalData: "/",
    placeOfWork: "/place-of-work",
    loanParameters: "/loan-parameters",
    notFound: "*",
} as const;

export type AppRoutes = keyof typeof routes;
