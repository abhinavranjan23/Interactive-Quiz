import React, { useState } from "react";
import Swal from "sweetalert2";

const InsertQuizes = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    titleImage: "",
    isTrending: false,
    topic: "",
    type: "multiple-choice",
    maxDuration: "",
    totalScore: 0,
    questions: [],
  });

  const [question, setQuestion] = useState({
    questionText: "",
    options: [],
    correctAnswer: "",
    score: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: name === "score" ? Number(value) : value,
    }));
  };

  const addOption = () => {
    if (question.options.length < 4) {
      setQuestion((prev) => ({
        ...prev,
        options: [...prev.options, ""],
      }));
    } else {
      Swal.fire("Warning", "You can add a maximum of 4 options", "warning");
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const addQuestion = () => {
    if (!question.questionText || !question.correctAnswer || !question.score) {
      Swal.fire("Error", "Please fill all question fields", "error");
      return;
    }
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [
        ...prevQuiz.questions,
        { ...question, score: Number(question.score) },
      ],
      totalScore: prevQuiz.totalScore + Number(question.score),
    }));
    setQuestion({
      questionText: "",
      options: [],
      correctAnswer: "",
      score: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quiz.questions.length) {
      Swal.fire("Error", "Please add at least one question", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/admin/add/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Success", "Quiz added successfully!", "success");
        setQuiz({
          title: "",
          titleImage: "",
          isTrending: false,
          topic: "",
          type: "multiple-choice",
          maxDuration: "",
          totalScore: 0,
          questions: [],
        });
      } else {
        Swal.fire("Error", data.error || "Failed to add quiz", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className='p-6 my-10 max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-colors duration-300'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800 dark:text-white'>
        Add New Quiz
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          name='title'
          placeholder='Quiz Title'
          value={quiz.title}
          onChange={handleChange}
          className='w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
          required
        />
        <input
          type='text'
          name='titleImage'
          placeholder='Title Image URL (Optional)'
          value={quiz.titleImage}
          onChange={handleChange}
          className='w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
        />
        <input
          type='text'
          name='topic'
          placeholder='Quiz Topic'
          value={quiz.topic}
          onChange={handleChange}
          className='w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
          required
        />
        <select
          name='type'
          value={quiz.type}
          onChange={handleChange}
          className='w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
        >
          <option value='multiple-choice'>Multiple Choice</option>
          <option value='true-false'>True/False</option>
          <option value='short-answer'>Short Answer</option>
        </select>
        <input
          type='number'
          name='maxDuration'
          placeholder='Max Duration (minutes)'
          value={quiz.maxDuration}
          onChange={handleChange}
          className='w-full p-2 border mb-2 rounded dark:bg-gray-800 dark:text-white'
          required
        />
        <label className='flex items-center space-x-2 mb-2'>
          <input
            type='checkbox'
            name='isTrending'
            checked={quiz.isTrending}
            onChange={handleChange}
          />
          <span className='text-gray-900 dark:text-gray-100'>Trending</span>
        </label>
        <h3 className='text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100'>
          Add Questions
        </h3>
        <input
          type='text'
          name='questionText'
          placeholder='Question'
          value={question.questionText}
          onChange={handleQuestionChange}
          className='w-full p-2 border mb-2 rounded dark:bg-gray-800 dark:text-white'
          required
        />
        {quiz.type !== "short-answer" &&
          question.options.map((option, index) => (
            <input
              key={index}
              type='text'
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              className='w-full p-2 border mb-2 rounded dark:bg-gray-800 dark:text-white'
              required
            />
          ))}
        {quiz.type !== "short-answer" && (
          <button
            type='button'
            onClick={addOption}
            className='bg-emerald-600 text-white px-4 py-1 rounded mb-2 active:scale-x-95'
          >
            Add Option
          </button>
        )}
        <input
          type='text'
          name='correctAnswer'
          placeholder='Correct Answer'
          value={question.correctAnswer}
          onChange={handleQuestionChange}
          className='w-full p-2 border mb-2 rounded dark:bg-gray-800 dark:text-white'
          required
        />
        <input
          type='number'
          name='score'
          placeholder='Score'
          value={question.score}
          onChange={handleQuestionChange}
          className='w-full p-2 border mb-2 rounded dark:bg-gray-800 dark:text-white'
          required
        />
        <button
          type='button'
          onClick={addQuestion}
          className='bg-purple-900 text-white px-4 py-2 rounded-lg w-full active:scale-95 hover:cursor-pointer'
        >
          Add Question
        </button>
        <button
          type='submit'
          className='bg-teal-800 text-white px-4 py-2 rounded-lg w-full mt-4 hover:cursor-pointer active:scale-95'
        >
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default InsertQuizes;
