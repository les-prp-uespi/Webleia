import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from './routes';
import { SuspenseLoader } from './app/shared/components';
import { Provider } from 'react-redux';
import ConfirmModalProvider from 'app/shared/contexts/ConfirmModalContext';
import store from 'app/redux/store';
import 'toastr/build/toastr.min.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Suspense fallback={<SuspenseLoader />}>
      <DndProvider backend={HTML5Backend}>
        <ConfirmModalProvider>
          <RouterProvider />
        </ConfirmModalProvider>
      </DndProvider>
    </Suspense>
  </Provider>,
);
