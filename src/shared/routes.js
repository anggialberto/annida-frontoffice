import HomePage from "~pages/HomePage";
import AboutPage from "~pages/AboutPage";
import GalleryPage from "~pages/GalleryPage";
import LoginPage from "~pages/LoginPage";
import RegisterPage from "~pages/RegisterPage";
import PPDBPage from "~pages/PPDBPage";
import PublicationPage from "~pages/PublicationPage";

import {
  LOGIN_PATH,
  REGISTER_PATH,
  HOME_PATH,
  ABOUT_PATH,
  GALLERY_PATH,
  PPDB_PATH,
  PUBLICATION_PATH
} from '~constants/routes-path';


const routes = [
  {
    path: LOGIN_PATH,
    component: LoginPage,
    exact: true,
    name: 'login',
  },
  {
    path: REGISTER_PATH,
    component: RegisterPage,
    exact: true,
    name: 'register',
  },
  {
    path: HOME_PATH,
    component: HomePage,
    exact: true,
    name: 'home',
  },
  {
    path: GALLERY_PATH,
    component: GalleryPage,
    exact: true,
    name: 'gallery',
  },
  {
    path: `${PUBLICATION_PATH}/:slug`,
    component: PublicationPage,
    exact: true,
    name: 'publication',
  },
  {
    path: PPDB_PATH,
    component: PPDBPage,
    exact: true,
    name: 'ppdb',
  },
  {
    path: ABOUT_PATH,
    component: AboutPage,
    exact: true,
    name: 'about',
  },
];

export default routes;