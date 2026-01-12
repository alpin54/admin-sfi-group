const Currency = (() => {
  const idrFormat = (number, prefix = 'Rp') => {
    const numberString = number.toString().replace(/[^,\d]/g, '');
    const split = numberString.split(',');
    const mod = split[0].length % 3;
    const thousands = split[0].substr(mod).match(/\d{3}/gi);
    let idr = split[0].substr(0, mod);
    let separator = '';

    if (thousands) {
      separator = mod ? '.' : '';
      idr += separator + thousands.join('.');
    }

    idr = split[1] !== undefined ? idr + ',' + split[1] : idr;
    return prefix + idr;
  };

  const removeIdrFormat = (idr) => {
    return Number(idr.replace(/\./g, '').replace(/\s/g, '').replace(/Rp/g, ''));
  };

  return {
    formatRp: idrFormat,
    removeRp: removeIdrFormat
  };
})();

export default Currency;
