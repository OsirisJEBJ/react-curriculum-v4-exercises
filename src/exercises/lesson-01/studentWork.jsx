//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  //add variables here
  const name = 'Osiris Estrada';
  const age = 27;
  const hobbies = ['running', 'studying', 'spending time with my family'];
  return (
    <div>
      <h1>About Me</h1>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>
        I'm a systems engineer building my path in front end development with a
        practical, hands-on approach.
      </p>
      <p>Hobbies: {hobbies.join(', ')}</p>
      <ul>
        {hobbies.map((hobby) => (
          <li>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
