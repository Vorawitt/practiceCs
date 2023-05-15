import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
 
function App() {
  const {activityStore} = useStore(); // ใช้ในการเรียกใช้ activityStore จาก store.ts
  const [activities, setActivities] = useState<Activity[]>([]); //รู้ว่า array ของ Acitivity มีอะไรบ้างจาก json ที่ format มา
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined); // ใช้ในการเลือก Activity ที่จะแสดงรายละเอียด
  const [editMode, setEditMode] = useState(false); // ใช้ในการแก้ไข Activity
  const [loading, setLoading] = useState(true); // ใช้ในการโหลดข้อมูลจาก json มาแสดง  
  const [submitting, setSubmitting] = useState(false); // ใช้ในการสร้าง Activity ใหม่ หรือแก้ไข Activity

  useEffect(() => {
    activityStore.loadActivities();

  }, [activityStore]);

  function handleSelectActivity(id: string) { // ใช้ในการเลือก Activity ที่จะแสดงรายละเอียด
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() { //ใช้ในการยกเลิก Activity ที่เลือก
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity(); // ถ้ามี id ให้เลือก Activity ถ้าไม่มีให้ยกเลิก Activity
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){ // ใช้ในการสร้าง Activity ใหม่ หรือแก้ไข Activity
    setSubmitting(true);
    if (activity.id){
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]) // ถ้ามี id ให้แก้ไข Activity ถ้าไม่มีให้สร้าง Activity ใหม่
        setSelectedActivity(activity); 
        setEditMode(false);
        setSubmitting(false);

      })
    } else{
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, {...activity, id: uuid()}]);
        setSelectedActivity(activity); 
        setEditMode(false);
        setSubmitting(false);

      })
    }
  }

  function handleDeleteActivity(id: string){
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]); // ฟังก์ชัน filter จะสร้างอาร์เรย์ใหม่ที่ประกอบด้วยกิจกรรมที่มี id ไม่เหมือนกับ id ของกิจกรรมที่ต้องการลบ และใช้ในการลบกิจกรรมนั้นออกจากอาร์เรย์ activities
      setSubmitting(false);
    })
  }

  if (activityStore.loadingIntial) return <LoadingComponent content='Loading app'/>

  return (

    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
      <ActivityDashboard 
        activities={activityStore.activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        submitting={submitting}
      />
      </Container>
    </>
  );
}

export default observer(App);
