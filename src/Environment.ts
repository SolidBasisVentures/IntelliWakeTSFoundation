export enum Environments {
	ENV_Local = 'ENV_Local',
	ENV_Dev = 'ENV_Dev',
	ENV_Test = 'ENV_Test',
	ENV_QA = 'ENV_QA',
	ENV_Demo = 'ENV_Demo',
	ENV_ProdSupport = 'ENV_ProdSupport',
	ENV_Prod = 'ENV_Prod'
}

export const IsENV = (environments: Environments | Environments[]): boolean => {
	console.log('******* Environments Deprecated... use Stages')
	console.trace()

	let envs: Environments[]

	if (typeof environments === 'string') {
		envs = [environments as Environments]
	} else {
		envs = environments as Environments[]
	}

	for (const env of envs) {
		if (process.env.REACT_APP_ENV === env) {
			return true
		}
	}

	return false
}

export const IsDevFocused = (): boolean => {
	return IsENV([Environments.ENV_Local, Environments.ENV_Dev, Environments.ENV_QA])
}
