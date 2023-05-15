import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit, submitting}: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);


    function handleSubmit() {
        createOrEdit(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) { // ใช้ในการเปลี่ยนค่าใน input
        const {name, value} = event.target;
        setActivity({...activity, [name]: value}) // ใช้ spread operator ในการ copy ค่าเดิมของ activity แล้วเปลี่ยนค่าที่ต้องการ
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} onChange={handleInputChange} name='title'/>
                <Form.TextArea placeholder='Description' value={activity.description} onChange={handleInputChange} name='description'/>
                <Form.Input placeholder='Category' value={activity.category} onChange={handleInputChange} name='category'/>
                <Form.Input type ='date' placeholder='Date' value={activity.date} onChange={handleInputChange} name='date'/>
                <Form.Input placeholder='City' value={activity.city} onChange={handleInputChange} name='city'/>
                <Form.Input placeholder='Venue' value={activity.venue} onChange={handleInputChange} name='venue'/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' positive type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}