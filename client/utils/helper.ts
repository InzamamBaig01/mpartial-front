import { isNil, isEmpty } from 'ramda';
import moment from 'moment';
// import moment from 'moment';

export function compareSortValues(key, datatype, isAsc = true) {
  const type = datatype || 'string';
  return (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    const varA = a[key] ? (type === 'date') ?
      new Date(a[key]) :
      ((type === 'number') ?
        Number(a[key]) : a[key].replace(/[^\w\s]/gi, '').toUpperCase()) : a[key];

    const varB = b[key] ? (type === 'date') ?
      new Date(b[key]) :
      ((type === 'number') ?
        Number(b[key]) : b[key].replace(/[^\w\s]/gi, '').toUpperCase()) : b[key];
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (!isAsc) ? (comparison * -1) : comparison
    );
  };
}

export function isDict(v) {
  return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
}

export const isDefined = (thing: any): boolean => !isNil(thing) && !isEmpty(thing);

// FROM SP API, it should not contain any timezones. It CAN be already converted time,
// BUT the UI is plainly showing whatever time the API is giving
export function timeString2Millis(timeString: string): number {
  // this enforces format from the API should be consistent everywhere-- if not it will break
  // const apiTimeFormat = 'y-MM-dd HH:mm:ss';
  // return DateTime.fromFormat(timeString, apiTimeFormat, { zone: 'utc' }).toMillis();
  return moment.utc(timeString).valueOf();
}

// Warning: check outputs on luxon localized date formats
export function millis2FormattedTimeString(millis: number, dateFormat: string) {
  // return DateTime.fromMillis(millis, { zone: 'utc' }).toFormat(dateFormat);
  return moment.utc(millis).format(dateFormat);
}
