import { v4 as uuid } from "uuid";

/**
 * takes in errorMessages as either a string or array
 * either creates one message or multiple messages
 * displays all received messages
 *
 * props:
 * errorMessages: either a string or array of error messages
 */
function ErrorMessage({ errorMessages }) {
  let errors;

  if (typeof errorMessages === "string") {
    errors = <p>{errorMessages}</p>;
  } else {

    errors = <>{errorMessages.map(message =>
      <p key={uuid()}>{message}</p>)}</>;
  }


  return (
    <div>
      {errors}
    </div>);
}

export default ErrorMessage;