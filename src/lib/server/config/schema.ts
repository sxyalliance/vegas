export default {
	app: {
		url: {
			doc: 'The domain of the application.',
			format: String,
			default: 'http://localhost:5173',
			env: 'APP_URL'
		}
	},

	auth: {
		provider: {
			doc: 'The authentication provider to use.',
			format: ['supertokens'],
			default: 'supertokens',
			env: 'AUTH_PROVIDER'
		},
		supertokens: {
			url: {
				doc: 'The URL of the SuperTokens server.',
				format: String,
				default: 'https://try.supertokens.com',
				env: 'SUPERTOKENS_URL'
			},
			apiKey: {
				doc: 'The API key for the SuperTokens server.',
				format: String,
				default: '',
				env: 'SUPERTOKENS_API_KEY'
			}
		}
	}
};
