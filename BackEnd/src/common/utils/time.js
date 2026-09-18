export const toMS = (quantity, unit) => {
    switch (unit) {
        case 'second': return quantity * 1000;
        case 'minute': return quantity * 60 * 1000;
        case 'hour':   return quantity * 60 * 60 * 1000;
        case 'day':    return quantity * 24 * 60 * 60 * 1000;
        case 'week':   return quantity * 7 * 24 * 60 * 60 * 1000;
        case 'month':  return quantity * 30 * 24 * 60 * 60 * 1000;
        case 'year':   return quantity * 365 * 24 * 60 * 60 * 1000;
    }
}