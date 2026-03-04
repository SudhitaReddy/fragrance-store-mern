 
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilExpandArrows from '@iconscout/react-unicons/icons/uil-expand-arrows';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';
import { TableWrapper, DragDropStyle } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';

function DragAndDropTable() {
  const users = useSelector((state) => state.users);

  const usersTableData = [];
  users.map((user, index) => {
    const { name, designation, img } = user;

    return usersTableData.push({
      key: index + 1,
      index,
      user: (
        <div className="user-info">
          <figure>
            <img style={{ width: '40px' }} src={require(`../../${img}`)} alt="" />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {name}
            </Heading>
          </figcaption>
        </div>
      ),
      email: <span className="drag_email">john@gmail.com</span>,
      company: <span className="drag_company">Business Development</span>,
      position: <span className="drag_designation">{designation}</span>,
      joinDate: <span className="drag_join-date">January 20, 2020</span>,
      action: (
        <div className="table-actions">
          <Button className="btn-icon" type="info" to="#" shape="circle">
            <UilEdit />
          </Button>
          <Button className="btn-icon" type="danger" to="#" shape="circle">
            <UilTrashAlt />
          </Button>
        </div>
      ),
    });
  });

  const [state, setState] = useState({
    dataSource: usersTableData,
  });

  const { dataSource } = state;

  function SortableItem(value) {
    const item = value.value;
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.key });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <tr className="ant-table-row" ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <td className="ant-table-cell drag-visible" style={{ cursor: 'grab', padding: '12px 16px' }}>
          <UilExpandArrows style={{ fontSize: '16px', color: '#666' }} />
        </td>
        <td className="ant-table-cell" style={{ padding: '12px 16px' }}>{item.user}</td>
        <td className="ant-table-cell" style={{ padding: '12px 16px' }}>{item.email}</td>
        <td className="ant-table-cell" style={{ padding: '12px 16px' }}>{item.company}</td>
        <td className="ant-table-cell" style={{ padding: '12px 16px' }}>{item.position}</td>
        <td className="ant-table-cell" style={{ padding: '12px 16px' }}>{item.joinDate}</td>
        <td className="ant-table-cell" style={{ padding: '12px 16px' }}>{item.action}</td>
      </tr>
    );
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const activeIndex = dataSource.findIndex((item) => item.key === active.id.key);
      const overIndex = dataSource.findIndex((item) => item.key === over.id.key);
      const newData = arrayMove(dataSource, activeIndex, overIndex);

      setState({ ...state, dataSource: newData });
    }
  }

  return (
    <div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <DragDropStyle>
          <Cards title="Drag & Drop Table" caption="Drag rows to reorder user data">
            <TableWrapper className="table-responsive">
              <div className="ant-table-wrapper">
                <div className="ant-table">
                  <div className="ant-table-container">
                    <div className="ant-table-content">
                      <table>
                        <thead className="ant-table-thead">
                          <tr>
                            <th className="ant-table-cell" style={{ padding: '12px 16px', fontWeight: 600, backgroundColor: '#fafafa' }}>Drag</th>
                            <th className="ant-table-cell" style={{ padding: '12px 16px', fontWeight: 600, backgroundColor: '#fafafa' }}>User</th>
                            <th className="ant-table-cell" style={{ padding: '12px 16px', fontWeight: 600, backgroundColor: '#fafafa' }}>Email</th>
                            <th className="ant-table-cell" style={{ padding: '12px 16px', fontWeight: 600, backgroundColor: '#fafafa' }}>Company</th>
                            <th className="ant-table-cell" style={{ padding: '12px 16px', fontWeight: 600, backgroundColor: '#fafafa' }}>Position</th>
                            <th className="ant-table-cell" style={{ padding: '12px 16px', fontWeight: 600, backgroundColor: '#fafafa' }}>Join Date</th>
                            <th className="ant-table-cell" style={{ padding: '12px 16px', fontWeight: 600, backgroundColor: '#fafafa' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody className="ant-table-tbody">
                          <SortableContext items={dataSource.map(item => item.key)} strategy={rectSortingStrategy}>
                            {dataSource.map((value, index) => (
                              <SortableItem key={value.key} index={index} value={value} />
                            ))}
                          </SortableContext>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </TableWrapper>
          </Cards>
        </DragDropStyle>
      </DndContext>
    </div>
  );
}

export default DragAndDropTable;
