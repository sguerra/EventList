import { colors } from 'material-ui/styles';

import _ from 'lodash';
import { EXTRA_APP_STYLES } from '../../../config.json';


export const NEW_ITEM = {
	bottom : '2rem',
	position : 'absolute',
	right : '2rem',
	zIndex : '1'
}

export const SECTION_WRAPPER = {
	marginTop : '1rem',
	marginBottom : '2rem'
}

export const SECTION_SCROLLABLE = _.extend({
	height : '80vh',
	overflowY : 'scroll',
	overflowX : 'hidden'
}, SECTION_WRAPPER)

export const DATA_AVATAR_TITLE = {
	alignItems : 'center',
	display : 'flex'
}

export const AVATAR_ORANGE = {
	backgroundColor : colors.deepOrange500,
	marginLeft : '1rem'
}

export const AVATAR_CYAN = {
	backgroundColor : colors.cyan500,
	marginLeft : '1rem'
}

export const AVATAR_BLUE = {
	backgroundColor : colors.blue500,
	marginLeft : '1rem'
}

export const AVATAR_TEAL = {
	backgroundColor : colors.teal500,
	marginLeft : '1rem'
}

export const AVATAR_RED = {
	backgroundColor : colors.red500,
	marginLeft : '1rem'
}

export const AVATAR_PINK = {
	backgroundColor : colors.pink500,
	marginLeft : '1rem'
}

export const AVATAR_PURPLE = {
	backgroundColor : colors.purple500,
	marginLeft : '1rem'
}

export const FORM_TITLE_1 = {
	paddingLeft : '.5rem'
}

export const FORM_TITLE_2 = {
	margin : '1em 0',
	position : 'relative',
	top : '1rem',
	color : colors.grey600
}

export const CARD = {
	marginLeft : '2rem'
}

export const FORM_DATA_ITEMS = {
	alignItems : 'flex-start',
	display : 'flex',
	flexWrap : 'wrap',
	marginLeft : '2rem'
}

export const ITEM_SMALL = {
	marginRight : '16px',
	width : '100px'
}

export const ITEM_MEDIUM = {
	marginRight : '16px',
	width : '200px'
}

export const CHECKBOX_MEDIUM = {
	...ITEM_MEDIUM,
	height : '72px',
	paddingTop : '36px',
	boxSizing : 'border-box'
}

export const ITEM_LARGE = {
	marginRight : '16px',
	width : '300px'
}

export const CHECKBOX_LARGE = {
	...ITEM_LARGE,
	alignSelf : 'center'
}

export const ITEM_X_LARGE = {
	marginRight : '16px',
	width : '85%'
}

export const ITEM_PICKER = {
	marginRight : '16px',
	width : '300px'
}

export const ITEM_PICKER_LARGE = {
	marginRight : '16px',
	width : '500px'
}

export const ITEM_PICKER_INPUT = {
	width : '150px'
}

export const FIELD_REQUIRED = {
	color : colors.red200
}

export const LABEL = {
	color : 'rgba(0, 0, 0, 0.54)',
	fontSize : '14px',
	fontWeight : '500',
	lineHeight : '48px',
	paddingLeft : 0,
	width : '100%'
}

const EMPTY_TABLE = {
	paddingTop : '1em'
}
