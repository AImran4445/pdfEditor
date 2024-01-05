import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import './App.css';

const App = () => {
  const viewer = useRef(null);
  useEffect(() => {
   
    
    WebViewer(
      {
        path: '/webviewer/lib',
        licenseKey: 'your_license_key',
        enableMeasurement: true,
        enableAnnotations:true,
        enableFilePicker:true,
      
        
      },
      viewer.current,
    ).then((instance) => {
      console.log(instance);
      const { documentViewer, annotationManager, Annotations} = instance.Core;
      // document.getElementById('file-picker').onchange = e => {
      //   const file = e.target.files[0];
      //   if (file) {
      //     instance.UI.loadDocument(file);
      //     // document.getElementById('viewer').style.display='block';
      //   }
      // };   
      
      documentViewer.addEventListener('documentLoaded', () => {
        const rectangleAnnot = new Annotations.RectangleAnnotation({
          PageNumber: 1,
          X: 100,
          Y: 150,
          Width: 200,
          Height: 50,
          Author: annotationManager.getCurrentUser()
        });
        annotationManager.addAnnotation(rectangleAnnot);
        annotationManager.redrawAnnotation(rectangleAnnot);
      
      });
    });
  }, []);
  return (
    <div className="App">
      <div className="header">PdfEditor</div>
      {/* <div className='app-container'>
        <h1 className='home-h1'>Powerful online PDF tools to make your document workflows easy and secure</h1>
        <input id="file-picker" type="file" accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx,.pptx,.md" />
        <p>Upload documents of up to 25 MB in PDF, DOC, DOCX, RTF, PPT, PPTX, JPEG, PNG, or TXT</p>
      </div> */}
      <div id='viewer' className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;
