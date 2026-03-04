 
 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Input } from 'antd';
import { Button } from '../../../components/buttons/buttons';

function KanbanBoardItem({ data, showModal, onBackShadow, taskId, onTaskTitleUpdate, onTaskTitleDelete }) {
  const { title, id } = data;
  const [value, setValue] = useState(title);
  const onTaskTitleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={taskId === id ? 'ninjadash-kanvan-task__editable' : ''}>
      <h4 className="ninjadash-kanvan-task__title">
        <Link onClick={() => showModal(data)} to="#">
          {title}
        </Link>
        <Link to="#" className="btn-edit" onClick={() => onBackShadow(id)}>
          <FeatherIcon icon="edit-2" size={12} />
        </Link>
      </h4>
      <div className="ninjadash-kanvan-task__edit" draggable="false">
        <div className="ninjadash-kanvan-task__edit--left">
          <Input onPressEnter={() => onTaskTitleUpdate(value, id)} onChange={onTaskTitleChange} value={value} />
          <Button
            onClick={() => onTaskTitleUpdate(value, id)}
            className="edit-kanban-task"
            htmlType="submit"
            size="small"
            type="primary"
          >
            Save
          </Button>
        </div>
        <div className="ninjadash-kanvan-task__edit--right">
          <Link to="#" className="btn-delete" onClick={(e) => onTaskTitleDelete(e, id)}>
            <FeatherIcon icon="trash-2" size={12} />
            <span>Delete Task</span>
          </Link>
        </div>
      </div>
    </div>
  );
}


export default KanbanBoardItem;
