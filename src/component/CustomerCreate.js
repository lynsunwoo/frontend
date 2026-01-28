import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { AlertContext } from '../AlertContext';

function CustomerCreate() {

    const [form, setForm] = useState({
        c_name:'',
        c_address:'',
        c_tel:''
    });

    //카운트 상태변수 관리
    // const { setCustomerCount } = useContext(AlertContext);
    //등록 완료 후 customer 페이지로 이동
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setForm(prev => ({
            ...prev, [name]:value
        }))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        axios.post('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/customer', form)
        .then(()=>{
            alert('상품이 등록 되었습니다.');
            // setCustomerCount( count => count + 1 );
            navigate('/customer');
        })
        .catch(err => console.log(err));
    };

    return (
        <main>
            <section className='create'>
                <h2>Customer Create</h2>

                <form className='form_box' onSubmit={handleSubmit}>
                    <p className='form_p'>
                        <label htmlFor="">고객명</label>
                        <input
                            type="text"
                            name='c_name'
                            value={form.c_name}
                            onChange={handleChange}
                            required
                        />
                    </p>

                    <p className='form_p'>
                        <label htmlFor="c_address">주소</label>
                        <input
                            type="text"
                            name='c_address'
                            value={form.c_address}
                            onChange={handleChange}
                            required
                        />
                    </p>

                    <p className='form_p'>
                        <label htmlFor="c_tel">번호</label>
                        <input
                            type="text"
                            name='c_tel'
                            value={form.c_tel}
                            onChange={handleChange}
                            required
                        />
                    </p>
                    
                    <button type='submit'>등록하기</button>
                </form>
            </section>
        </main>
    );
}

export default CustomerCreate;
