import React from 'react';
import { Card } from 'antd';

function Comment({ actions, author, avatar, content, children, datetime, ...props }) {
  // Convert datetime prop to dateTime for proper DOM attribute
  const cardProps = { ...props };
  if (datetime) {
    cardProps.dateTime = datetime;
  }
  
  return (
    <Card size="small" style={{ marginBottom: 16 }} {...cardProps}>
      <div style={{ display: 'flex', gap: 12 }}>
        {avatar && (
          <div>
            {typeof avatar === 'string' && (avatar.startsWith('http') || avatar.startsWith('data:')) ? (
              <img 
                src={avatar} 
                alt="Avatar" 
                style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  objectFit: 'cover' 
                }} 
              />
            ) : (
              avatar
            )}
          </div>
        )}
        <div style={{ flex: 1 }}>
          {author && <div style={{ fontWeight: 500, marginBottom: 4 }}>{author}</div>}
          {content && <div style={{ marginBottom: 8 }}>{content}</div>}
          {actions && <div style={{ display: 'flex', gap: 16, color: '#1890ff' }}>{actions}</div>}
        </div>
      </div>
      {children && <div style={{ marginTop: 16, marginLeft: 40 }}>{children}</div>}
    </Card>
  );
}


export default Comment;
