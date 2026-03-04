import moment from 'moment';
import actions from './actions';

const events = [
  {
    title: 'Project Update',
    start: moment().format('MM/DD/YYYY/LT'),
    end: moment().format('MM/DD/YYYY/LT'),
    id: 1,
    label: 'warning',
    type: 'event',
    haxColor: 'FF8C00',
    description: 'Lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam consetetur sadipscing elitr sed diam',
  },
  {
    title: 'UI/UX Tasks',
    start: moment().add(2, 'days').format('MM/DD/YYYY/LT'),
    end: moment().add(2, 'days').add(2, 'hours').format('MM/DD/YYYY/LT'),
    id: 2,
    label: 'info',
    type: 'meeting',
    haxColor: '2C99FF',
    description: 'Design and development tasks for the new user interface',
  },
  {
    title: 'Team Meeting',
    start: moment().add(3, 'days').format('MM/DD/YYYY/LT'),
    end: moment().add(3, 'days').add(1, 'hours').format('MM/DD/YYYY/LT'),
    id: 3,
    label: 'primary',
    type: 'meeting',
    haxColor: '5840FF',
    description: 'Weekly team meeting to discuss project progress and upcoming tasks',
  },
  {
    title: 'Product Launch',
    start: moment().add(5, 'days').format('MM/DD/YYYY/LT'),
    end: moment().add(5, 'days').add(2, 'hours').format('MM/DD/YYYY/LT'),
    id: 4,
    label: 'primary',
    type: 'reminder',
    haxColor: '5840FF',
    description: 'Launch of the new product features and updates',
  },
  {
    title: 'Family Events',
    start: moment().add(6, 'days').format('MM/DD/YYYY/LT'),
    end: moment().add(6, 'days').add(4, 'hours').format('MM/DD/YYYY/LT'),
    id: 5,
    label: 'success',
    type: 'event',
    haxColor: '52C41A',
    description: 'Family gathering and special events',
  },
];

const initialState = {
  events,
  loading: false,
  error: null,
  eventVisible: false,
};

const {
  CALENDAR_READ_BEGIN,
  CALENDAR_READ_SUCCESS,
  CALENDAR_READ_ERR,
  EVENT_VISIBLE_BEGIN,
  EVENT_VISIBLE_SUCCESS,
  EVENT_VISIBLE_ERR,
  CALENDAR_STAR_UPDATE_BEGIN,
  CALENDAR_STAR_UPDATE_SUCCESS,
  CALENDAR_STAR_UPDATE_ERR,
  CALENDAR_LABEL_UPDATE_BEGIN,
  CALENDAR_LABEL_UPDATE_SUCCESS,
  CALENDAR_LABEL_UPDATE_ERR,
} = actions;

const CalenderReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case CALENDAR_STAR_UPDATE_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case CALENDAR_STAR_UPDATE_SUCCESS:
      return {
        ...state,
        events: data,
        sLoading: false,
      };
    case CALENDAR_STAR_UPDATE_ERR:
      return {
        ...state,
        error: err,
        sLoading: false,
      };
    case CALENDAR_LABEL_UPDATE_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case CALENDAR_LABEL_UPDATE_SUCCESS:
      return {
        ...state,
        events: data,
        sLoading: false,
      };
    case CALENDAR_LABEL_UPDATE_ERR:
      return {
        ...state,
        error: err,
        sLoading: false,
      };
    case CALENDAR_READ_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CALENDAR_READ_SUCCESS:
      return {
        ...state,
        events: data,
        loading: false,
      };
    case CALENDAR_READ_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case EVENT_VISIBLE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case EVENT_VISIBLE_SUCCESS:
      return {
        ...state,
        eventVisible: data,
        loading: false,
      };
    case EVENT_VISIBLE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default CalenderReducer;
