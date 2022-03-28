/**
 * @param {string} path
 * @returns {Boolean}
 * 是否为外部链接
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}