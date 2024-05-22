import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '../Admin/NavigationBar';

const DynamicForm = () => {
const [formFields, setFormFields] = useState([
    {question: '', input: ''}
])

const [question,setQuestion] = useState("");
const [input,setInput] = useState("");

const handleFormChange = (event, index) => {
    //console.log(index, event.target.name)
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setQuestion(event.target.value);
}

const handleInputChange = (event, index) => {
    //console.log(index, event.target.name)
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setInput(event.target.value);
}

useEffect (()=>{
    axios.get('http://localhost:3000/pertanyaan').then(res=>{
    console.log(res.data);
    })
}, [])

const submit = (e) => {
    e.preventDefault();
    console.log(formFields);
    axios.post('http://localhost:3000/pertanyaan',{
        question,
        input
    }).then(res=>{
        alert('Data berhasil disimpan ^^');
    });
}

const addField = () => {
    let object={
        question: '',
        input: ''
    }
    setFormFields([...formFields, object])
}

const removeField = (index) => {
    //console.log(index);
    let data = [...formFields];
    data.splice(index, 2)
    setFormFields(data)
}

  return (
    <div className='myBG'>
        <NavigationBar />
        <form onSubmit={submit}>
            <br />
            <br />
            {formFields.map((form, index)=> {
                return(
                    <div key={index} className='columns is-centered'>
                        <div className='column is-half'>
                            <input 
                            name='question' 
                            type="text"
                            className='input'
                            style={{width:'600px'}}
                            placeholder='Masukan Pertanyaan' 
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.question}
                            />
                            <button onClick={() => {removeField(index)}} className='button is-danger'>-</button>
                            <div className="field">
                                <div className="control">
                                    <div className="select">
                                        <select name='input' onChange={(event => handleInputChange(event, index))} value={form.input}>
                                            <option value="">Pilih Tipe Jawaban</option>
                                            <option value="text">Text</option>
                                            <option value="checkbox">Checkbox</option>
                                            <option value="radio">Radio</option>
                                            <option value="file">Upload File</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}    
        </form>
        <div className='columns is-centered'>
            <div className='column is-half'>
                <button className='button is-info' onClick={addField}>Add more</button>
                <br />
                <button className='button is-success' onClick={submit}>Submit</button>
            </div>
        </div>

    </div>
  )
}

export default DynamicForm