import AccountMenu from '../../components/AccountMenu/AccountMenu';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import Header from '../../components/Header/Header';
import TasksList from '../../components/TasksList/TasksList';

const Home = () => {
  return (
    <>
      <Header />
      <ControlPanel />
      <AccountMenu />
      <TasksList />
    </>
  );
};

export default Home;
