import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Tag } from 'antd';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import DragAndDropTable from '../table/DragTable';

const { Title, Paragraph } = Typography;

// Simple List Drag and Drop Component
function SimpleDragList() {
  const [items, setItems] = useState([
    { id: '1', content: 'Task 1: Complete project proposal', priority: 'high' },
    { id: '2', content: 'Task 2: Review code changes', priority: 'medium' },
    { id: '3', content: 'Task 3: Update documentation', priority: 'low' },
    { id: '4', content: 'Task 4: Schedule team meeting', priority: 'high' },
    { id: '5', content: 'Task 5: Test new features', priority: 'medium' },
  ]);

  function SortableItem({ id, content, priority }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'high': return 'red';
        case 'medium': return 'orange';
        case 'low': return 'green';
        default: return 'blue';
      }
    };

    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          padding: '12px 16px',
          margin: '8px 0',
          backgroundColor: '#fff',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          cursor: 'grab',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
        {...attributes}
        {...listeners}
      >
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <span style={{ flex: 1 }}>{content}</span>
          <Tag color={getPriorityColor(priority)}>{priority}</Tag>
        </Space>
      </div>
    );
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <Cards title="Simple Drag & Drop List" caption="Drag items to reorder them">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div style={{ minHeight: '200px' }}>
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} content={item.content} priority={item.priority} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </Cards>
  );
}

// Card-based Drag and Drop Component
function CardDragList() {
  const [cards, setCards] = useState([
    { id: 'card-1', title: 'Design System', description: 'Create a comprehensive design system', color: '#1890ff' },
    { id: 'card-2', title: 'User Research', description: 'Conduct user interviews and surveys', color: '#52c41a' },
    { id: 'card-3', title: 'Prototype', description: 'Build interactive prototypes', color: '#faad14' },
    { id: 'card-4', title: 'Testing', description: 'Perform usability testing', color: '#f5222d' },
  ]);

  function SortableCard({ id, title, description, color }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          padding: '16px',
          margin: '8px 0',
          backgroundColor: '#fff',
          border: `2px solid ${color}`,
          borderRadius: '8px',
          cursor: 'grab',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
        {...attributes}
        {...listeners}
      >
        <Title level={5} style={{ margin: '0 0 8px 0', color }}>
          {title}
        </Title>
        <Paragraph style={{ margin: 0, color: '#666' }}>
          {description}
        </Paragraph>
      </div>
    );
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setCards((cards) => {
        const oldIndex = cards.findIndex((card) => card.id === active.id);
        const newIndex = cards.findIndex((card) => card.id === over.id);
        return arrayMove(cards, oldIndex, newIndex);
      });
    }
  }

  return (
    <Cards title="Card Drag & Drop" caption="Drag cards to reorder project phases">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={cards.map(card => card.id)} strategy={verticalListSortingStrategy}>
          <div style={{ minHeight: '300px' }}>
            {cards.map((card) => (
              <SortableCard 
                key={card.id} 
                id={card.id} 
                title={card.title} 
                description={card.description} 
                color={card.color} 
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </Cards>
  );
}

function DragAndDropComponents() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '/admin/components',
      breadcrumbName: 'Components',
    },
    {
      path: '',
      breadcrumbName: 'Drag & Drop',
    },
  ];

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Drag & Drop Components" routes={PageRoutes} />
      
      <Main>
        <Row gutter={[25, 25]}>
          <Col xs={24} lg={12}>
            <SimpleDragList />
          </Col>
          <Col xs={24} lg={12}>
            <CardDragList />
          </Col>
          <Col xs={24}>
            <DragAndDropTable />
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default DragAndDropComponents;
