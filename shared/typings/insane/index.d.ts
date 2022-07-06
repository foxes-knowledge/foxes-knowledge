declare module 'insane' {
    /**
     * Sanitizes given HTML by dropping the whole tree of descendants for elements that aren't allowed tags.
     * @param html can be an arbitrary HTML string
     * @param options options for the sanitizer
     * @param strict means that options won't be based off of defaults if set to true
     * @description
     * The parser takes into account that some elements can be self-closing.
     * For safety reasons the sanitizer will only accept a valid URL for background, base, cite, href, longdesc, src, and usemap elements.
     * "Valid URL" means that it begins with either #, /, or any of options.allowedSchemes (followed by :).
     */
    function insane(html: string, options?: InsaneOptions, strict?: boolean): string

    interface InsaneOptions {
        /**
         * Array of schemes that are allowed in URLs.
         * @default ['http', 'https', 'mailto']
         */
        allowedSchemes: ['http', 'https', 'mailto'] | string[]

        /**
         * An array of tags that you'll allow in the resulting HTML.
         *
         * @example // Only allow spans, discarding the rest of elements.
         *      insane('<div>foo</div><span>bar</span>', {
         *      allowedTags: ['span']
         * });
         * // <- '<span>bar</span>'
         *
         * @default
         * [
         *   "a", "article", "b", "blockquote", "br", "caption", "code", "del", "details", "div", "em",
         *   "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "ins", "kbd", "li", "main", "ol",
         *   "p", "pre", "section", "span", "strike", "strong", "sub", "summary", "sup", "table",
         *   "tbody", "td", "th", "thead", "tr", "u", "ul"
         * ]
         */
        allowedTags: string[]

        /**
         * An object describing the attributes you'll allow for each individual tag name.
         *
         * @example // Only allow spans, and only allow those spans to have an id (discarding the rest of their attributes).
         * insane('<span id="bar" class="super">bar</span>', {
         *      allowedTags: ['span'],
         *      allowedAttributes: { span: ['id']
         * });
         * // <- '<span id="bar">bar</span>'
         *
         * @default
         * {
         *   "a": ["href", "name", "target"],
         *   "iframe": ["allowfullscreen", "frameborder", "src"],
         *   "img": ["src"]
         * }
         */
        allowedAttributes: { [tag: string]: string[] }

        /**
         * If 'class' is listed as an allowed attribute, every single class will be allowed.
         * If you don't list 'class' as an allowed attribute, you can provide a class whitelist per tag name.
         *
         * @example // Only allow spans to have super or bad class names, discarding the rest of them.
         * insane('<span class="super mean and bad">bar</span>', {
         *      allowedTags: ['span'],
         *      allowedClasses: { span: ['super', 'bad'] }
         * });
         * // <- '<span class="super bad">bar</span>'
         *
         * @default {}
         **/
        allowedClasses: { [x: string]: string }

        /**
         * Takes a function(token) that allows you to do additional validation beyond exact tag name and attribute matching.
         * The token object passed to your filter contains the following properties.
         *
         * • 'tag' is the lowercase tag name of the element
         *
         * • 'attrs' is an object containing every attribute in the element, including those that may not be in the whitelist
         *
         * If you return a falsy value the element and all of its descendants will not be included in the output.
         * Note that you are allowed to change the attrs, and even add new ones, transforming the output.
         *
         * @example // Require that <span> elements have an aria-label value.
         * function filter (token) {
         *      return token.tag !== 'span' || token.attrs['aria-label'];
         * }
         * insane('<span aria-label="a foo">foo</span><span>bar</span>', {
         *      allowedTags: ['span'],
         *      allowedAttributes: { span: ['aria-label'] },
         *      filter: filter
         * });
         * // <- '<span aria-label="a foo">foo</span>'
         */
        filter: (token: string) => boolean | null

        /**
         * Takes a function(text) that allows you to modify text content in HTML elements. Runs for every piece of text content.
         * The returned value is used instead of the original text contents.
         */
        transformText: (text: string) => string | null
    }

    export = insane
}
