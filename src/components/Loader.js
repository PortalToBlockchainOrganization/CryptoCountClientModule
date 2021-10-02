import React from 'react';
import Loader from 'react-loader-spinner';

export const LoaderLarge = () => (
  <div className="loader">
    <Loader type="ThreeDots" color="#FFFFFF" height={50} width={50} />
  </div>
);

export const LoaderSmall = () => (
  <div className="loader">
    <Loader type="ThreeDots" color="#DDDDDD" height={28} width={28} />
  </div>
);