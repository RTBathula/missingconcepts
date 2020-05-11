import * as moment from 'moment';

export const toStoryDate = (value) => {
  return moment(value).format('MMM D, YYYY'); 
};
