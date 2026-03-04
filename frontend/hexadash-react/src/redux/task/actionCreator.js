import actions from './actions';

const {
  taskReadBegin,
  taskReadSuccess,
  taskReadErr,
  starUpdateBegin,
  starUpdateSuccess,
  starUpdateErr,
  completeUpdateBegin,
  completeUpdateSuccess,
  completeUpdateErr,
} = actions;

const taskAddData = (data) => {
  return async (dispatch) => {
    try {
      dispatch(taskReadBegin());
      dispatch(taskReadSuccess(data));
    } catch (err) {
      dispatch(taskReadErr(err));
    }
  };
};

const onStarUpdate = (data, id) => {
  return async (dispatch) => {
    try {
      dispatch(starUpdateBegin());
      const updatedData = data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            favourite: !item.favourite,
          };
        }
        return item;
      });
      dispatch(starUpdateSuccess(updatedData));
    } catch (err) {
      dispatch(starUpdateErr(err));
    }
  };
};

const onCompleteUpdate = (data, id) => {
  return async (dispatch) => {
    try {
      dispatch(completeUpdateBegin());
      const updatedData = data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      });
      dispatch(completeUpdateSuccess(updatedData));
    } catch (err) {
      dispatch(completeUpdateErr(err));
    }
  };
};

const ontaskDelete = (data) => {
  return async (dispatch) => {
    try {
      dispatch(taskReadBegin());
      dispatch(taskReadSuccess(data));
    } catch (err) {
      dispatch(taskReadErr(err));
    }
  };
};

const ontaskEdit = (data) => {
  return async (dispatch) => {
    try {
      dispatch(taskReadBegin());
      dispatch(taskReadSuccess(data));
    } catch (err) {
      dispatch(taskReadErr(err));
    }
  };
};

export { taskAddData, onStarUpdate, ontaskDelete, onCompleteUpdate, ontaskEdit };
