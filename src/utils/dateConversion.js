import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatRelativeTime = (isoDate) => {
    return dayjs(isoDate).fromNow(); 
};
