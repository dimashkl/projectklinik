import React, {useState, useEffect} from "react";
import axios from "axios";
import "../style/customform.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import LangkahEmpat from "../assets/images/LangkahEmpat.png"


const CustomForm = () => {

const navigate = useNavigate();

const [formContent, setFormContent] = useState([{
    id: 0,
    label: "Nama",
    name: "state",
    required: false,
    question_type: "short_answer",
    list: [],
},
{
    id: 0,
    label: "NIK",
    name: "state2",
    required: false,
    question_type: "short_answer",
    list: [],  
}]);

const [onEdit, setOnEdit] = useState(false);
const [textField, setTextField] = useState("");
const [editedField, setEditedField] = useState("");

const addQuestion = async(e) =>{
    const field={
        "id": formContent.length,
        "name" : `question_${formContent.length+5}`,
        "label" : "untitled question",
        "question_type": "short_answer",
        "list":[]
    }
    setFormContent([...formContent, field]);
}

const [formdata, setFormData] = useState([]);

  useEffect(()=>{
    getDynamic();
  },[]);

  const getDynamic = async()=>{
    const response = await axios.get("http://localhost:5000/dynamics");
    setFormData(response.data);
  };

const showAlertSubmit = () => {
    confirmAlert({
    title: 'Konfirmasi',
    message: 'Anda yakin dengan data yang sudah diisi ? jika sudah yakin silakan tekan "Ya".',
    buttons: [
        {
        label: 'Ya',
        onClick: async() => {
            if (formdata.length === 0) {
                await axios.post('http://localhost:5000/dynamics',{
                    pertanyaan: formContent
                }).then(res=>{
                    alert('Form berhasil disimpan ^^');
                });
                navigate("/admin");
            } else {
                alert("Anda sudah melakukan submit formulir sebelumnya, silakan tekan OK untuk melihat formulir anda");
                navigate("/editcustomform");
            }
        }
        },
        {
        label: 'Tidak',
            onClick: () => {
                navigate("/inputcustomform");
            }
        } 
    ]
    });
};

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

const removeField = (index) => {
    let data = [...formContent];
    data.splice(index, 1)
    setFormContent(data)
}



    return(
        <div style={{height:"auto"}}>
             <img
            style={{position:"relative", left:"420px", width:"450px", marginTop:"25px"}}
            src={LangkahEmpat}
            />
            <div className="container mx-auto px-4" style={{marginTop:"-30px"}}>
                <div className="headersign my-4" style={{textAlign:"center"}}>
                    <h1 className="title" style={{fontSize:"22px"}} >Custom Form Pasien</h1>
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
                                                    field.name === "state" || field.name === "state2" ?
                                                        field.name === "state2" ?
                                                        <label onClick={() => {setOnEdit(true); setEditedField(field.name)}}>NIK (KTP / KK / PASSPORT )</label>
                                                        :
                                                        <label onClick={() => {setEditedField(field.name)}}>{field.label}</label>
                                                    :
                                                    <input type="text" value={field.label} onChange={(e) => editField(field.name, e.target.value )} onBlur={() => {setOnEdit(false); setEditedField("")}}/>
                                                }
                                            </div>
                                            <div>
                                                {
                                                    field.name === "state" || field.name === "state2" ?
                                                    <select onChange={(e) => editFieldType(field.name, e.target.value)} disabled>
                                                        <option value="short_answer">Short Answer</option>
                                                        <option value="paragraph">Paragraph</option>
                                                        <option value="multichoice">Multichoice</option>
                                                    </select>
                                                    :
                                                    <select onChange={(e) => editFieldType(field.name, e.target.value)}>
                                                        <option value="short_answer">Short Answer</option>
                                                        <option value="paragraph">Paragraph</option>
                                                        <option value="multichoice">Multichoice</option>
                                                    </select>
                                                }
                                            </div>
                                        </div>
                                        <div className='w-100'>
                                            {
                                                field.question_type === 'short_answer' && <input type="text" className="inputform" placeholder={field.label} disabled/>
                                            }
                                            {
                                                field.question_type === 'paragraph' && <textarea rows={4} className="inputform" placeholder={field.label} disabled/>
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
                                {
                                    field.name === "state" || field.name === "state2" ?
                                    <></>
                                    :
                                    <Button onClick={() => {removeField(index)}} className="button is-danger" style={{marginLeft:"20px", marginTop:"20px"}}>Delete This Question</Button>
                                }
                                
                                </div>
                            )
                        })}

                        <div style={{paddingBottom:"70px"}}>
                            <div className= "position-relative w-100 p-5">
                            <footer className="border shadow-lg rounded" style={{position:"fixed", padding:"40px 520px", bottom:"30px", background:"white", marginLeft:"-30px"}}>
                                <button onClick={showAlertSubmit} className="button is-success" style={{position:"absolute", top:"20px", left:"450px"}}>SUBMIT</button>
                                <button className="button bg-black text-white rounded" style={{position:"absolute", top:"20px", left:"550px"}} onClick={() => addQuestion()}>Add Question</button>
                            </footer>
                            </div>
                        </div>
            </div>
        </div>

    )
}

export default CustomForm


/*<div style={{marginLeft:"87.5%", marginTop:"2%"}}>
                                            <text>wajib diisi </text>
                                            <Switch onClick={}/>
                                        </div>*/