import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
 
function App() {
  const [activities, setActivities] = useState<Activity[]>([]); //รู้ว่า array ของ Acitivity มีอะไรบ้างจาก json ที่ format มา
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined); // ใช้ในการเลือก Activity ที่จะแสดงรายละเอียด
  const [editMode, setEditMode] = useState(false); // ใช้ในการแก้ไข Activity

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {  //ใส่ไว้เพื่อเป็น Type Safety
      setActivities(response.data);
    })
  }, []);

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
    activity.id 
    ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) // ถ้ามี id ให้แก้ไข Activity ถ้าไม่มีให้สร้าง Activity ใหม่
    : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity); 
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x => x.id !== id)]); // ฟังก์ชัน filter จะสร้างอาร์เรย์ใหม่ที่ประกอบด้วยกิจกรรมที่มี id ไม่เหมือนกับ id ของกิจกรรมที่ต้องการลบ และใช้ในการลบกิจกรรมนั้นออกจากอาร์เรย์ activities
  }

  return (

    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
      <ActivityDashboard 
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
      />
      </Container>
    </>
  );
}

export default App;
