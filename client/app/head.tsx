import React from 'react';
import DocumentMeta from 'react-document-meta';
import {isMobile} from 'react-device-detect';

const Heads: React.FC = () => {
  const meta = {
    meta: {
    },
  };
  return (
    <DocumentMeta {...meta}>
    </DocumentMeta>
  );
};

export default Heads;
