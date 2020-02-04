export interface configModel {
    production: boolean, apiUrl: string, loginUrl: string, micrositeUrl: string,
    themeColor: string, loginRegistrationContent: { heading: string; body: string; subTexts: string[] }, partners: {
        name: string
        link: string
        image: string
    }[], banners: string[]
}
