import WindowWrapper from '#/hoc/WindowWrapper'
import SafariPortfolio from '#/components/safari/SafariPortfolio'

const Safari = () => <SafariPortfolio />

const SafariWindow = WindowWrapper(Safari, 'safari')

export default SafariWindow
