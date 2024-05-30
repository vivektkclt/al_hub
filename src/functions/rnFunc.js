export function toStyleArray(style) {
    let st = style ?? []
    if (!Array.isArray(st) && typeof (st) === 'object')
        st = [st];
    return st;
}