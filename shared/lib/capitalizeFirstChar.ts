interface Capitalizer {
    (chars: string | string[], locale?: string): string
}

export const capitalizeFirstChar: Capitalizer = ([first, ...rest], locale = 'en-US') =>
    first.toLocaleUpperCase(locale) + rest.join('')
