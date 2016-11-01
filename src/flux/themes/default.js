import { colors, LightRawTheme } from 'material-ui/styles';

const EXTRA_APP_STYLES = {
	PRIMARY_COLOR : 'teal500',
	SECONDARY_COLOR: 'pink500'
};

const MUI_COLORS = colors;
let modifiedLightTheme = LightRawTheme;

modifiedLightTheme.palette.primary1Color = MUI_COLORS[EXTRA_APP_STYLES.PRIMARY_COLOR];
modifiedLightTheme.palette.pickerHeaderColor = MUI_COLORS[EXTRA_APP_STYLES.PRIMARY_COLOR];
modifiedLightTheme.palette.accent1Color = MUI_COLORS[EXTRA_APP_STYLES.SECONDARY_COLOR];

export default modifiedLightTheme;
