export const workspacesMainBgColor = '#ea580c';

function getBgColorHexOnly(color: string) {
	return color.replace('#', '');
}

export function generateWorkspaceAvatar(name: string) {
	return `https://ui-avatars.com/api/?rounded=true&name=${name.replaceAll(
		' ',
		'+'
	)}&background=${getBgColorHexOnly(workspacesMainBgColor)}&color=ffffff`;
}
