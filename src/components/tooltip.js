import * as React from 'react';

const defaultFormatter = (ringInfo) => {
  return [{ key: '占比', value: ringInfo.percent }];
};

const getPosition = ({ width, height, x, y, length }) => {
  return { x, y };
};

export default class ToolTip extends React.Component {
  render() {
    const { x, y, ringInfo, tooltip, width, height } = this.props || {};
    if (!ringInfo) return null;
    const { name, backgroundColor } = ringInfo;
    const { formatter = defaultFormatter, show = true } = tooltip || {};
    const list = formatter(ringInfo);
    if (!(list instanceof Array)) {
      throw new Error('formatter must return array');
    }
    const postion = getPosition({ width, height, x, y, length: list.length });
    return (
      <div style={show ? { ...Rectstyle, top: postion.y, left: postion.x } : { display: 'none' }}>
        <div style={headerStyle}>{name}</div>
        <div>
          {list.map(({ key, value }) => {
            return (
              <div key={key} style={{ position: 'relative', whiteSpace: 'nowrap' }}>
                <span style={{ ...iconStyle, backgroundColor: backgroundColor || 'rgb(211,0,57)' }}></span>
                <div style={valueStyle}>{`${key}: ${value}`}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const Rectstyle = {
  position: 'absolute',
  zIndex: 2,
  width: 'auto',
  height: 'auto',
  display: 'inline-block',
  backgroundColor: 'rgba(0,0,0,0.65)',
  borderRadius: '6px',
  padding: '10px',
  pointerEvents: 'none',
};

const headerStyle = {
  color: '#fff',
};

const iconStyle = {
  position: 'absolute',
  width: '6px',
  height: '6px',
  borderRadius: '100%',
  top: '6px',
};

const valueStyle = {
  paddingLeft: '12px',
  color: '#fff',
};
