import moment from 'moment';

const formatDateTime = (dateString) => {
    if (!dateString) return '';
    return moment(dateString).format('YYYY-MM-DD HH:mm:ss');
};

export default formatDateTime;