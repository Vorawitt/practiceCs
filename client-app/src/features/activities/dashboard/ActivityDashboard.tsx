import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void; // ใช้ในการเลือก Activity ที่จะแสดงรายละเอียด ไม่ได้่ส่งอะไรกลับกำหนดเป็น void
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashboard({activities, selectActivity, deleteActivity,
    selectedActivity, cancelSelectActivity , editMode, openForm, closeForm, createOrEdit , submitting}: Props) { // ใช้ destructuring แทนการใช้ props.activities
    return (
        <Grid>
            <Grid.Column width='10'> 
                <ActivityList activities={activities} 
                selectActivity={selectActivity}
                deleteActivity={deleteActivity}
                submitting={submitting}
                />
            </Grid.Column>    
            <Grid.Column width='6'>
                {selectedActivity &&  !editMode && // ถ้ามี selectedActivity และไม่ได้เปิด editMode ให้แสดง ActivityDetails
                <ActivityDetails 
                activity={selectedActivity} 
                cancelSelectActivity={cancelSelectActivity} 
                openForm={openForm} 
                />}
                {editMode && 
                <ActivityForm 
                    closeForm={closeForm} 
                    activity={selectedActivity} 
                    createOrEdit={createOrEdit}
                    submitting={submitting}
                />}
            </Grid.Column>
        </Grid>
    )
}