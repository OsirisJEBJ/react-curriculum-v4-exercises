import { useState, useEffect } from 'react';
import styles from './SnackForm.module.css';

export default function SnackForm({
  addSnack,
  editingSnack,
  cancelEdit,
  updateSnack,
  className,
}) {
  const isEditing = Boolean(editingSnack);

  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [touched, setTouched] = useState({ name: false, rating: false });

  useEffect(() => {
    if (isEditing) {
      setName(editingSnack.name);
      setRating(editingSnack.rating);
    } else {
      setName('');
      setRating('');
    }
    setTouched({ name: false, rating: false });
  }, [isEditing, editingSnack]);

  function validateName() {
    return name.trim() !== '';
  }

  function validateRating() {
    return rating !== '';
  }

  function getNameError() {
    if (!validateName() && touched.name) {
      return 'Name is required';
    }
    return null;
  }

  function getRatingError() {
    if (!validateRating() && touched.rating) {
      return 'Please enter a valid rating between 1 and 5';
    }
    return null;
  }

  const nameError = getNameError();
  const ratingError = getRatingError();

  function handleSubmit(e) {
    e.preventDefault();

    const isValid = validateName() && validateRating();
    if (!isValid) {
      setTouched({ name: true, rating: true });
      return;
    }
    if (isEditing) {
      updateSnack(editingSnack.id, name.trim(), rating);
    } else {
      addSnack(name.trim(), rating);
      setName('');
      setRating('');
    }
    setTouched({ name: false, rating: false });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${className || ''}`}
    >
      <h3 className={styles['form-title']}>
        {isEditing ? '✏️ Edit Snack' : '➕ Add Snack'}
      </h3>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, name: true }))}
          className={styles['field-input']}
          placeholder="Enter snack name"
        />
        {nameError && (
          <div className={styles['error-message']}>{nameError}</div>
        )}
      </div>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Rating:</label>
        <input
          type="number"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, rating: true }))}
          className={styles['field-input']}
          placeholder="Rate 1-5"
        />
        {ratingError && (
          <div className={styles['error-message']}>{ratingError}</div>
        )}
      </div>

      <div className={styles['button-container']}>
        <button
          type="submit"
          className={`${styles.button} ${styles['submit-button']}`}
        >
          {isEditing ? 'Save' : 'Add'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className={`${styles.button} ${styles['cancel-button']}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
