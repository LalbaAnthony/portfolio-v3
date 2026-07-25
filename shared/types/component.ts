
export const COMPONENT_VARIANTS = ['glass', 'ghost', 'white', 'transparent'] as const
export type ComponentVariant = typeof COMPONENT_VARIANTS[number]

export const COMPONENT_SIZES = ['xs', 'sm', 'md', 'lg', '2xl'] as const
export type ComponentSize = typeof COMPONENT_SIZES[number]

export const COMPONENT_POSITIONS = ['left', 'center', 'right'] as const
export type ComponentPosition = typeof COMPONENT_POSITIONS[number]

export const COMPONENT_ROUNDNESS = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const
export type ComponentRoundness = typeof COMPONENT_ROUNDNESS[number]

export const COMPONENT_Z_INDEX_LEVELS = [1, 2, 3] as const
export type ComponentZIndexLevel = typeof COMPONENT_Z_INDEX_LEVELS[number]

export const COMPONENT_BREAKPOINTS = ['default', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const
export type ComponentBreakpoint = typeof COMPONENT_BREAKPOINTS[number]

export const COMPONENT_HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
export type ComponentHeading = typeof COMPONENT_HEADINGS[number]
