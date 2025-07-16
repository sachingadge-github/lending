import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

// project imports
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
    <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
      >

      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
      </SnackbarProvider>
    </ThemeCustomization>
  );
}
