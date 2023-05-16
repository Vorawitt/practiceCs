import React, {useEffect} from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
 
function App() {
  const {activityStore} = useStore(); // ใช้ในการเรียกใช้ activityStore จาก store.ts

  useEffect(() => {
    activityStore.loadActivities();

  }, [activityStore]);

  if (activityStore.loadingIntial) return <LoadingComponent content='Loading app'/>

  return (

    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
      <ActivityDashboard/>
      </Container>
    </>
  );
}

export default observer(App);
