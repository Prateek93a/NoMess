import React from 'react';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';


export default function Preloader() {
    return (
        <ContentLoader 
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <Rect x="-43" y="0" rx="0" ry="0" width="400" height="127" /> 
        <Rect x="-46" y="75" rx="0" ry="0" width="400" height="127" /> 
        <Rect x="-46" y="146" rx="0" ry="0" width="400" height="127" />
      </ContentLoader>
    )
}
