import { useState } from "react";
import styled from "styled-components";
import { FieldD } from "../../types/lead";
import { FiChevronRight } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";

export default function Checkbox({ field, onNext }: { field: FieldD; onNext: (val: any) => any }) {
  const [selected, setSelected] = useState(field.value || []);

  let options: any[] = [];

  if (field.options) {
    options = JSON.parse(field.options);
  }

  return (
    <div
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={`field__outer ${field.show ? "show" : ""}`}
    >
      <div className="field">
        <div className="field__label">{field.name}</div>

        <CheckboxDiv>
          {options.map((i) => {
            return (
              // <input
              //   key={i.id}
              //   type="checkbox"
              //   // checked={false}
              //   onChange={(e) => {
              //     if (!e.target?.checked) {
              //       setSelected((s: any) => s.filter((i2: any) => i2 !== i.id));
              //     } else {
              //       setSelected((s: any) => [...s, i.id]);
              //     }
              //   }}
              // />

              <label htmlFor={i.id.toString()} key={i.id}>
                <div className="input-box">
                  <input
                    type="checkbox"
                    id={i.id.toString()}
                    className="input"
                    // value={selected}
                    // required={
                    //   i.required ? (selected.length > 0 ? true : false) : false
                    // }
                    onChange={(e) => {
                      if (!e.target?.checked) {
                        setSelected((s: any) => s.filter((i2: any) => i2 !== i.id));
                      } else {
                        setSelected((s: any) => [...s, i.id]);
                      }
                    }}
                  />
                  <span style={{ paddingLeft: "26px" }}>{i.text}</span>
                  <span className="checkmark"></span>
                </div>
              </label>
            );
          })}
        </CheckboxDiv>
      </div>

      <button
        key={field.id}
        className={`field__btn ${field.value ? "check" : ""}`}
        onClick={() => {
          if (selected.length < 1) {
            return;
          }
          onNext(selected);
        }}
      >
        {field.value ? <BsCheckCircleFill /> : <FiChevronRight />}
      </button>
    </div>
  );
}

const CheckboxDiv = styled.div<any>`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .input-box {
    position: relative;
  }

  /* hide default */
  .input-box .input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* customizing */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #f3f4f6;
    border-radius: 5px;
    border: 1px solid #e5e7eb;
  }

  .input-box .input:checked ~ .checkmark {
    background-color: ${(p) => p.primaryColor || "#000"};
    transition: all 0.3s;
  }

  .input-box .checkmark:after {
    content: "";
    position: absolute;
    left: 6px;
    top: 3px;
    width: 4px;
    height: 8px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) scale(0.6);
    opacity: 0;
  }

  .input-box .input:checked ~ .checkmark:after {
    opacity: 1;
    transform: rotate(45deg) scale(1);
    transition: all 0.3s;
  }
`;
