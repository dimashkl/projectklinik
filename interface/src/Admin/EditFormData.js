import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import { Button } from 'react-bootstrap';

const EditFormData = () => {

    const navigate = useNavigate();

    const [contentForm, setContentForm] = useState([{
        id: 0,
        label: "Untitled Question",
        required: false,
        question_type: "short_answer",
        list: []
    }]);

const [formContent, setFormContent] = useState([{
    id: 0,
    label: "Untitled Question",
    required: false,
    question_type: "short_answer",
    list: []
}]);

const [onEdit, setOnEdit] = useState(false);
const [textField, setTextField] = useState("");
const [editedField, setEditedField] = useState("");
const {id} = useParams();

const addQuestion = async(e) =>{
    const field={
        "id": formContent.length+100,
        "name" : `question_${formContent.length+100}`,
        "label" : "untitled question",
        "question_type": "short_answer",
        "list":[]
    }
    setFormContent([...formContent, field]);
}

console.log(formContent.length)
console.log(formContent);

const editField = (fieldName, fieldLabel) =>{
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex(f => f.name === fieldName);
    if (fieldIndex> -1){
        formFields[fieldIndex].label = fieldLabel;
        setFormContent(formFields);
        //console.log(formFields);
    }
}

const editFieldType = (fieldName, fieldLabel) =>{
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex(f => f.name === fieldName);
    if (fieldIndex> -1){
        formFields[fieldIndex].question_type = fieldLabel;
        setFormContent(formFields);
        //console.log(fieldLabel);
    }
}

const addFieldOption = (fieldName, option) =>{
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex(f => f.name === fieldName);
    if (fieldIndex> -1){
        if(option && option !== ""){
        formFields[fieldIndex].list.push(option);
        setFormContent(formFields);
        setTextField("");
        //console.log(formFields);
        }
    }
}

    const updateDynamic = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/dynamics/${contentForm[0].id}`,{
            pertanyaan: formContent
        }).then(res=>{
            alert('Form berhasil diupdate ^^');
        });
        navigate("/editform");
        
        } catch (error) {
            alert('Form gagal diupdate xx');
        }
    }

    useEffect(()=>{
        const getDynamicById = async() =>{
            try {
                const response = await axios.get(`http://localhost:5000/dynamics`);
                const myarr = JSON.parse(response.data[0].pertanyaan);
                //console.log(myarr);
                setContentForm(response.data);
                setFormContent(myarr)
                //console.log(myarr)
            } catch (error) {

            }
        }
        getDynamicById();
    },[id]);

    const removeField = (index) => {
        //console.log(index);
        let data = [...formContent];
        data.splice(index, 1)
        setFormContent(data)
    }

  return (
    <div style={{height:"200vh"}}>
            <NavigationBar />
            <div className="container mx-auto px-4">
                <div className="headersign my-4" style={{textAlign:"center"}}>
                    <h1>Edit Form Pasien</h1>
                </div>
                    {
                        formContent.map((field, index) =>{
                            return(
                                <div className="bg-white shadow-lg p-5 my-10 rounded" style={{marginTop:"20px"}}>
                                <div key={field.id} className="d-flex rounded bg-white px-4">
                                    <div className="formbody">
                                        <div className="formlist">
                                            <div key={field.name} className="typeinput">
                                                {
                                                    onEdit && (editedField === field.name)?
                                                    <input type="text" value={field.label} onChange={(e) => editField(field.name, e.target.value )} onBlur={() => {setOnEdit(false); setEditedField("")}}/>
                                                    :
                                                    <label onClick={() => {setOnEdit(true); setEditedField(field.name)}}>{field.label}</label>
                                                }
                                            </div>
                                            <div>
                                                <select onChange={(e) => editFieldType(field.name, e.target.value)}>
                                                    <option value="short_answer">Short Answer</option>
                                                    <option value="paragraph">Paragraph</option>
                                                    <option value="multichoice">Multichoice</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='w-100'>
                                            {
                                                field.question_type === 'short_answer' && <input type="text" className="inputform" placeholder={field.label} />
                                            }
                                            {
                                                field.question_type === 'paragraph' && <textarea rows={4} className="inputform" placeholder={field.label} />
                                            }

                                            {  field.question_type === 'multichoice' && 
                                                <div className="d-flex my-4 flex-column mt-2 ">
                                                    <select
                                                        className="inputform">
                                                        {field.list.map((item) => <option key={item} value={item}>{item}</option>)}
                                                    </select>
                                                    <div className="d-flex">
                                                        <input type="text" onChange={(e) => setTextField(e.target.value)} value={textField} placeholder="Add an option" className="inputchoice"/>
                                                        <button className="addbutton" onClick={() => addFieldOption(field.name, textField)}>Add</button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>                                
                                </div>
                                <Button onClick={() => {removeField(index)}} className="button is-danger" style={{marginLeft:"20px", marginTop:"20px"}}>Delete This Question</Button>
                                </div>
                            )
                        })}
                        <div style={{paddingBottom:"100px"}}>
                            <div className= "position-relative w-100 p-5">
                                <div className="clickbutton">
                                <button onClick={updateDynamic} className="button is-info">UPDATE FORM</button>
                                </div>
                                <button className="button bg-black text-white rounded" style={{marginLeft:"43.5%", marginBottom:"10px"}} onClick={() => addQuestion()}>Add Question</button>
                            </div>
                        </div>
            </div>
        </div>
  )
}

export default EditFormData