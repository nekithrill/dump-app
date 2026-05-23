module.exports = {
	extends: ['stylelint-config-standard-scss'],
	plugins: ['stylelint-scss', 'stylelint-order'],
	rules: {
		// Overrides
		'at-rule-empty-line-before': null,
		'custom-property-empty-line-before': null,
		'declaration-empty-line-before': null,
		'selector-class-pattern': null,

		// Colors & alpha
		'color-hex-length': 'long',
		'color-function-notation': 'modern',
		'alpha-value-notation': 'percentage',

		// Fonts & Strings
		'font-family-name-quotes': 'always-where-recommended',
		'length-zero-no-unit': true,

		// Declarations
		'declaration-block-no-duplicate-properties': true,
		'declaration-block-no-redundant-longhand-properties': true,
		'declaration-block-no-shorthand-property-overrides': true,

		// Selectors (null = may cause errors in SCSS)
		'no-duplicate-selectors': null,
		'no-descending-specificity': null,
		'selector-no-qualifying-type': null,
		'selector-max-class': 3,
		'max-nesting-depth': 3,

		// Vendor Prefixes
		'property-no-vendor-prefix': true,
		'value-no-vendor-prefix': true,

		// SCSS
		'scss/at-rule-no-unknown': true,
		'scss/at-mixin-pattern': '^[-a-z]+$',
		'scss/at-function-pattern': '^[-a-z]+$',
		'scss/dollar-variable-pattern': '^[-a-z]+$',
		'scss/dollar-variable-empty-line-before': null,
		// 'scss/no-duplicate-dollar-variables': true,
		'scss/no-global-function-names': true,
		'scss/selector-no-redundant-nesting-selector': true,
		'scss/double-slash-comment-empty-line-before': null,

		// Order
		'order/properties-order': [
			[
				{
					groupName: 'positioning',
					emptyLineBefore: 'never',
					properties: ['position', 'top', 'right', 'bottom', 'left', 'z-index']
				},
				{
					groupName: 'box-model',
					emptyLineBefore: 'always',
					properties: [
						'box-sizing',
						'width',
						'min-width',
						'max-width',
						'height',
						'min-height',
						'max-height',
						'margin',
						'margin-top',
						'margin-right',
						'margin-bottom',
						'margin-left',
						'padding',
						'padding-top',
						'padding-right',
						'padding-bottom',
						'padding-left',
						'overflow',
						'overflow-x',
						'overflow-y'
					]
				},
				{
					groupName: 'layout',
					emptyLineBefore: 'always',
					properties: [
						'display',
						'flex',
						'flex-grow',
						'flex-shrink',
						'flex-basis',
						'flex-direction',
						'flex-wrap',
						'flex-flow',
						'justify-content',
						'justify-items',
						'justify-self',
						'align-content',
						'align-items',
						'align-self',
						'grid',
						'grid-template',
						'grid-template-columns',
						'grid-template-rows',
						'grid-template-areas',
						'grid-area',
						'grid-column',
						'grid-row',
						'gap',
						'column-gap',
						'row-gap',
						'order'
					]
				},
				{
					groupName: 'visual',
					emptyLineBefore: 'always',
					properties: [
						'border',
						'border-top',
						'border-right',
						'border-bottom',
						'border-left',
						'border-width',
						'border-style',
						'border-color',
						'border-radius',
						'background',
						'background-color',
						'background-image',
						'background-position',
						'background-size',
						'background-repeat',
						'color',
						'box-shadow',
						'outline',
						'opacity',
						'visibility'
					]
				},
				{
					groupName: 'typography',
					emptyLineBefore: 'always',
					properties: [
						'font',
						'font-family',
						'font-size',
						'font-weight',
						'font-style',
						'font-display',
						'line-height',
						'letter-spacing',
						'text-align',
						'text-decoration',
						'text-transform',
						'text-overflow',
						'white-space',
						'word-break'
					]
				},
				{
					groupName: 'misc',
					emptyLineBefore: 'always',
					properties: [
						'cursor',
						'pointer-events',
						'user-select',
						'content',
						'list-style',
						'transform',
						'transition',
						'animation'
					]
				}
			],
			{ unspecified: 'bottom' }
		]
	}
}
