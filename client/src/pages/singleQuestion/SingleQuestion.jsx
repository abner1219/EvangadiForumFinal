import axios from "../../utility/axios";
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './questionDetail.css'
import AnswerQuestion from '../../components/AnswerQuestion/AnswerQuestion';
import Answer from '../../components/answers/Answers';
import { useStateValue } from "../../utility/stateprovider";
import moment from 'moment';

const SingleQuestion = () => {
  let params = useParams();
   const [{ user }, dispatch] = useStateValue();
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
   const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // console.log(user);

  }, [user, navigate])
  
  const answersByQuestionId = async () => {
    try {
      const answersRes = await axios.get(
        `/api/answers/:${params.id}`
      );
      setAnswers(answersRes.data.data);
       console.log(answersRes.data.data)
    } catch (err) {
      console.error("Problem:", err);
    }
    };
  
  useEffect(() => {

    // async function fetchData() {
    //   try {
    //     const response = await axios.get(`/api/questions/:${params.id}`);
    //     setQuestion(response.data.data);
    //     console.log(response.data.data);
    //   } catch (err) {
    //     alert(err);
    //     console.log("problem", err);
    //   }
      
    //   answersByQuestionId();

    // }
    async function fetchData() {
  try {
    const response = await axios.get(`/api/questions/${params.id}`); // Remove the ":" before `${params.id}`
    setQuestion(response.data.data);
    console.log(response.data.data);

    
    // Call answersByQuestionId with the fetched data, assuming it takes a single argument
    answersByQuestionId(response.data.data);
  } catch (err) {
    alert(err.message); // Use err.message to display the error message
    console.error("Problem:", err);
  }
}

  //   fetchData();
  // }, [params.id]);
  
  
    fetchData();


  }, [params.id]);
 // console.log(answers);
  return (
    <div className="container">
      <h2>Question</h2>
      {/* <p>{question?.question_id}</p> */}
      <h4>{question?.question}</h4>
       <p>{question?.category}</p>
      <small>{question?.question_description}</small>
      <p>{moment(question?.inserted_datetime).format("HH:mm:ss MM/DD/YYYY")}</p>
      <hr />
      <hr />
      <div>{answers.length > 0 && <h3>Answer From The Community</h3>}</div>
          {answers && answers?.map((answer) => (
        
            <Answer key={answer?.answer_id} answer={answer?.answer} userName={answer.user_name} profile={answer.image_url} answered_date={ answer.answered_date} />
       
      ))}
      <AnswerQuestion questionId={question?.question_id}/>
      <hr />
    </div>

  )
}

export default SingleQuestion


 