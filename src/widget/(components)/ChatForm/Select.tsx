import { useState } from "react";
import { FieldD } from "../../types/lead";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";

export default function Select({ field, onNext }: { field: FieldD; onNext: (val: any) => any }) {
  const [val, setVal] = useState("");

  let options: any[] = [];

  if (field.options) {
    options = JSON.parse(field.options);
  }

  return (
    <form
      className={`field__outer ${field.show ? "show" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        onNext(val);
      }}
    >
      <div className="field">
        <div className="field__label">{field.name}</div>

        <select
          id={`lead-field-${field.id}`}
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            if (e.target.value) {
              onNext(e.target.value);
            }
          }}
          required={field.required === 1 ? true : false}
        >
          <option value={""}>Select</option>
          {options.map((i) => {
            return (
              <option key={i.id} value={i.id}>
                {i.text}
              </option>
            );
          })}
        </select>
      </div>
      <button key={field.id} className={`field__btn ${field.value ? "check" : ""}`}>
        {field.value ? <BsCheckCircleFill /> : <FiChevronRight />}
      </button>
    </form>
  );
}
