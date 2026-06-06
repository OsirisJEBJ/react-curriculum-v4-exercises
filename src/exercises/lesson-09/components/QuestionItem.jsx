import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component - Students will add Edit/Delete functionality here
export function QuestionItem({ question }) {
  //HINT: use these with controlled form
  const [workingText, setWorkingText] = useState(question.question);
  const { dispatch, state } = useContext(SurveyContext);

  const isEditing = state.ui.editingQuestionId === question.id;

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  // TODO: Students will add edit functionality here
  const handleEdit = () => {
    console.log('TODO: Implement edit functionality');
    // Hint: Use SET_EDITING_QUESTION action
    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: { questionId: isEditing ? null : question.id },
    });
  };

  // TODO: Students will add save functionality here
  const handleSave = () => {
    console.log('TODO: Implement save functionality');
    // Hint: Use UPDATE_QUESTION_TEXT action with workingText
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: { id: question.id, newText: workingText },
    });

    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: { questionId: null },
    });
  };

  // TODO: Students will add delete functionality here
  const handleDelete = () => {
    console.log('TODO: Implement delete functionality');
    // Hint: Show confirmation dialog, then use DELETE_QUESTION action
    if (window.confirm('Confirm delete this question?')) {
      dispatch({
        type: 'DELETE_QUESTION',
        payload: { id: question.id },
      });
    }
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>
        <div className={styles['question-actions']}>
          {/* TODO: Students add Edit and Delete buttons here */}
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete (TODO)
          </button>
        </div>
      </div>

      {/* TODO: Students will add conditional controlled form to edit question here */}
      <div className={styles['question-content']}>
        {!isEditing ? (
          <h3>{question.question}</h3>
        ) : (
          <div className={styles['edit-section']}>
            <input
              className={styles['edit-input']}
              value={workingText}
              onChange={(e) => setWorkingText(e.target.value)}
            />

            <button className={styles['save-btn']} onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>
      {isEditing && question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Edit Options:</h4>

          {question.options.map((option, index) => (
            <div key={index} className={styles['option-item']}>
              <input
                className={styles['edit-input']}
                value={option}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_OPTION_TEXT',
                    payload: {
                      questionId: question.id,
                      optionIndex: index,
                      newText: e.target.value,
                    },
                  })
                }
              />

              <button
                className={styles['delete-btn']}
                disabled={question.options.length <= 2}
                onClick={() =>
                  dispatch({
                    type: 'DELETE_OPTION_FROM_QUESTION',
                    payload: {
                      questionId: question.id,
                      optionIndex: index,
                    },
                  })
                }
              >
                Delete
              </button>
            </div>
          ))}

          <button
            className={styles['edit-btn']}
            onClick={() => {
              const text = prompt('New option text:');
              if (text) {
                dispatch({
                  type: 'ADD_OPTION_TO_QUESTION',
                  payload: {
                    questionId: question.id,
                    optionText: text,
                  },
                });
              }
            }}
          >
            + Add Option
          </button>
        </div>
      )}
    </div>
  );
}
