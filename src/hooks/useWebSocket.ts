import { useEffect, useRef } from "react";

const useWebSocket = (url, onOpen, onMessage, onClose) => {
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      if (onOpen) onOpen(wsRef.current);
    };

    wsRef.current.onmessage = (event) => {
      if (onMessage) onMessage(event);
    };

    wsRef.current.onclose = () => {
      if (onClose) onClose();
    };

    return () => {
      wsRef.current.close();
    };
  }, [url, onOpen, onMessage, onClose]);

  return wsRef.current;
};

export default useWebSocket;
