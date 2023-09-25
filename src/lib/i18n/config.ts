interface I18nConfig {
	defaultLocale: string;
	enabledLocales: string[];
}

export const i18nConfig: I18nConfig = {
	defaultLocale: 'en',
	enabledLocales: ['en', 'zh-HK']
};
