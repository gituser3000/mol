namespace $ {

	export type $mol_style_properties = Partial< $mol_type_override< CSSStyleDeclaration , Overrides > >

	type Common = 'inherit' | 'initial' | 'unset'
	
	type Length = number | $mol_style_unit< $mol_style_unit_length > | $mol_style_func<'calc'>

	type Size =
	| 'auto' | 'max-content' | 'min-content' | $mol_style_func<'fit-content'>
	| 0 | Length | Common

	type Directions =
	| Size
	| [ Size , Size ]
	| {
		top? : Size ,
		right? : Size ,
		bottom? : Size ,
		left? : Size ,
	}

	type Overflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | 'overlay' | Common

	interface Overrides {

		/** Distribution of space between and around content items along a flexbox's cross-axis or a grid's block axis. */
		alignContent? :
		| 'baseline' | 'start' | 'end' | 'flex-start' | 'flex-end'
		| 'center' | 'normal' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch'
		| [ 'first' | 'last' , 'baseline' ]
		| [ 'safe' | 'unsafe' , 'start' | 'end' | 'flex-start' | 'flex-end' ]
		| Common

		/** Whether an element is treated as a block or inline element and the layout used for its children, such as flow layout, grid or flex. */
		display? :
		| 'block' | 'inline' | 'run-in' | 'list-item' | 'none'
		| 'flow' | 'flow-root' | 'table' | 'flex' | 'grid'
		| 'contents'
		| 'table-row-group' | 'table-header-group' | 'table-footer-group' | 'table-column-group'
		| 'table-row' | 'table-cell' | 'table-column' | 'table-caption'
		| 'inline-block' | 'inline-table' | 'inline-flex' | 'inline-grid'
		| 'ruby' | 'ruby-base' | 'ruby-text' | 'ruby-base-container' | 'ruby-text-container'
		| Common

		/** What to do when an element's content is too big to fit in its block formatting context. It is a shorthand for `overflowX` and `overflowY`. */
		overflow? : Overflow | {

			/** What shows when content overflows a block-level element's left and right edges. */
			x? :  Overflow
			
			/** What shows when content overflows a block-level element's top and bottom edges. */
			y? :  Overflow
			
		}

		webkitOverflowScrolling? : 'auto' | 'touch'
		
		/** Element's width. By default, it sets the width of the content area, but if `boxSizing` is set to `border-box`, it sets the width of the border area. */
		width? : Size
		/** Minimum width of an element. It prevents the used value of the `width` property from becoming smaller than the value specified for `minWidth`. */
		minWidth? : Size
		/** Maximum width of an element. It prevents the used value of the `width` property from becoming larger than the value specified for `maxWidth`. */
		maxWidth? : Size

		/** Height of an element. By default, the property defines the height of the content area. If box-sizing is set to border-box, however, it instead determines the height of the border area. */
		height? : Size
		/** Minimum height of an element. It prevents the used value of the `height` property from becoming smaller than the value specified for `minHeight`. */
		minHeight? : Size
		/** Maximum height of an element. It prevents the used value of the `height` property from becoming larger than the value specified for `maxHeight`. */
		maxHeight? : Size

		/** Margin area on all four sides of an element. */
		margin? : Directions

		/** Padding area on all four sides of an element. */
		padding? : Directions

		/** How a flex item will grow or shrink to fit the space available in its flex container. It is a shorthand for `flexGrow`, `flexShrink`, and `flexBasis`. */
		flex? :
		| 'none' | 'auto'
		| {

			/** Growing weight of the flex item. Negative values are considered invalid. Defaults to 1 when omitted. */
			grow? : number | Common
			
			/** Shrinking weight of the flex item. Negative values are considered invalid. Defaults to 1 when omitted. */
			shrink? : number | Common
			
			/** Preferred size of the flex item. A value of 0 must have a unit to avoid being interpreted as a flexibility. Defaults to 0 when omitted. */
			basis? : Size

			/** How flex items are placed in the flex container defining the main axis and the direction (normal or reversed). */
			direction? : 'row' | 'row-reverse' | 'column' | 'column-reverse'

		}
		
	}

}
