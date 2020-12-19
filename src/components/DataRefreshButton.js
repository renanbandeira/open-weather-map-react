import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';

function DataRefreshButton({ onRefresh, isRefreshing }) {
  const target = useRef(null);
  return (
    <>
      <Button ref={target} onClick={isRefreshing ? null : onRefresh}>
        Atualizar Dados
      </Button>
      <Overlay target={target.current} show={isRefreshing} placement="right">
        {({
          placement, arrowProps, show: _show, popper, ...props
        }) => (
          <div
            {...props}
            style={{
              backgroundColor: 'rgba(100, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            Atualizando, por favor, aguarde...
          </div>
        )}
      </Overlay>
    </>
  );
}

export default DataRefreshButton;
