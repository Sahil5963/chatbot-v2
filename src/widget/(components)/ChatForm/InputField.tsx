import { FiChevronRight } from "react-icons/fi";
import { FieldD, LeadTypes } from "../../types/lead";
import { BsCheckCircleFill } from "react-icons/bs";

const InputField = ({ field, onNext }: { field: FieldD; onNext: (val: any) => any }) => {
  let nativeType = "text";
  switch (field.type) {
    case LeadTypes.email:
      nativeType = "email";
      break;
    case LeadTypes.name:
    case LeadTypes.text:
      nativeType = "text";
      break;
    case LeadTypes.textarea:
      nativeType = "textarea";
      break;
    case LeadTypes.date_picker:
      nativeType = "date";
      break;
    default:
  }

  return (
    <form
      className={`field__outer ${field.show ? "show" : ""}`}
      onSubmit={(e: any) => {
        e.preventDefault();
        onNext(e.target.elements[0].value);
      }}
      key={field.id}
      id={field.id.toString()}
    >
      <div className="field">
        <div className="field__label">{field.name}</div>
        {nativeType !== "textarea" ? (
          <input id={`lead-field-${field.id}`} name={field.name} type={nativeType} required={field.required === 1} />
        ) : (
          <textarea id={`lead-field-${field.id}`} name={field.name} required={field.required === 1} rows={3} />
        )}
      </div>
      <button key={field.id} type="submit" className={`field__btn ${field.value ? "check" : ""}`}>
        {field.value ? <BsCheckCircleFill /> : <FiChevronRight />}
      </button>
    </form>
  );
};

export default InputField;
