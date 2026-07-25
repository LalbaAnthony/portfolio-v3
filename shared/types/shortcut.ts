export const SHORTCUT_QUERY_TOKEN = '%q' // Placeholder token used in `fromPath` (dynamic segment) and `toUrl` (injection point).

export interface Shortcut {
    label: string
    fromPath: string
    toUrl: string 
}

