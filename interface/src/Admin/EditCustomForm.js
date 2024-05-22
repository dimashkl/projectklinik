import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import NavigationBar from './NavigationBar';
import { Button } from 'react-bootstrap';
import Layout from './Layout';
import { confirmAlert } from 'react-confirm-alert';

const EditCustomForm = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
      const { isError } = useSelector((state) => state.auth);
  
      useEffect(() => {
          dispatch(getMe());
        }, [dispatch]);
      
        useEffect(() => {
          if (isError) {
            navigate("/loginAdmin");
          }
        }, [isError, navigate]);

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

const showAlertSubmit = () => {
    confirmAlert({
    title: 'Konfirmasi',
    message: 'Anda yakin dengan data yang sudah diisi ? jika sudah yakin silakan tekan "Ya".',
    buttons: [
        {
        label: 'Ya',
        onClick: async() => {
            try {
                await axios.patch(`http://localhost:5000/dynamics/${contentForm[0].uuid}`,{
                    pertanyaan: formContent
                }).then(res=>{
                    alert('Form berhasil diupdate ^^');
                });
                navigate("/customformadmin");
                
            } catch (error) {
                alert("gagal mengupdate data, mohon pastikan semua pertanyaan sudah terisi");
                navigate("/editcustomform");
            }
        }
        },
        {
        label: 'Tidak',
            onClick: () => {
                navigate("/editcustomform");
            }
        } 
    ]
    });
};

const showAlertCancel = () => {
        confirmAlert({
        title: 'Konfirmasi',
        message: 'Semua perubahan belum disimpan, apakah anda yakin ingin membatalkannya ?',
        buttons: [
            {
            label: 'Ya',
            onClick: () => {
                    navigate("/customformadmin");
            }
            },
            {
            label: 'Tidak',
            onClick: () => {
                    navigate("/editcustomform");
                
            }
            }
        ]
        });
    };

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
    <Layout>
    <div style={{height:"auto", marginBottom:"200px"}}>
            <div className="container mx-auto px-4">
                <div className="headersign my-4" style={{textAlign:"center"}}>
                    <h1>Edit Form Pasien</h1>
                </div>
                    {
                        formContent.map((field, index) =>{
                            return(
                                <div className="bg-white shadow-lg p-3 my-10 rounded" style={{width:"980px",marginTop:"20px"}}>
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
                                                field.question_type === 'short_answer' && <input  style={{width:"850px"}} type="text" className="inputform" placeholder={field.label} />
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
                                                    <div className="d-flex my-4 flex-column mt-2 ">
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
                            <footer className="border shadow-lg rounded" style={{position:"fixed", padding:"40px 450px", bottom:"30px", background:"white"}}>
                                <button className="button is-danger" onClick={showAlertCancel} style={{position:"absolute", top:"20px", left:"525px"}}>CANCEL</button>
                                <button onClick={showAlertSubmit} className="button is-success" style={{position:"absolute", top:"20px", left:"290px"}}>SUBMIT</button>
                                <button className="button bg-black text-white rounded" style={{position:"absolute", top:"20px", left:"388px"}} onClick={() => addQuestion()}>Add Question</button>
                            </footer>
                            </div>
                        </div>
            </div>
        </div>
        </Layout>
  )
}

export default EditCustomForm