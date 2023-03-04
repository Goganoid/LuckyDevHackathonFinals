import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { Footer, DarkHeader } from '../components';
import ProjectList from '../components/Lists/ProjectList';

const ProjectsPage: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <DarkHeader />
    <ProjectList />
    <Footer />
  </Fragment>
);

export default ProjectsPage;