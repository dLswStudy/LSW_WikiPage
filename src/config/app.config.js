const appConfig = {
    apiHost: process.env.REACT_APP_RESTAPI,
    apiPrefix: '/api',
}

appConfig.apiPreUrl = appConfig.apiHost + appConfig.apiPrefix

export default appConfig